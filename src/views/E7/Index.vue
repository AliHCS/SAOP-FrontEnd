<template>
  <div class="margin-head">
    <h4 class="view-name">{{ viewName }}</h4>
    <hr class="red" />
    <div class="row app-options-bar"></div>
  </div>
  <div class="row app-options-bar">
    <div class="d-flex align-items-center buttons-component align-items-center">
      <div class="col-md-6">
        <ButtonBarComponent
          :show-subactions="true"
          :showCreate="false"
          customLabel="Carga masiva"
          showCustomButton
          :showExcel="false"
          :showPrint="true"
          printText="Imprimir E7"
          :showCopy="false"
          @onCustom="router.push({ name: 'carga-masiva-E7' })"
          @onPdf="openDownloadConceptosModal = true"
          @onPrint="imprimirE7()"
        />
      </div>
      <div class="col-md-6 text-right">
        <button
          class="btn btn-primary active mr-2"
          type="button"
          data-toggle="tooltip"
          data-placement="top"
          title="Importa E7 de otros trabajos"
          @click="openModalImport = true"
        >
          <i class="bi bi-box-arrow-down"></i>
        </button>
        <button
          class="btn btn-primary active mr-2"
          type="button"
          data-toggle="tooltip"
          data-placement="top"
          title="Desasociar Trabajos Temporales"
          @click="handleDesasociarTemporal"
        >
          <i class="bi bi-file-earmark-minus"></i>
        </button>
        <button
          :disabled="validateForm"
          class="btn btn-primary active mr-2"
          type="button"
          data-toggle="tooltip"
          data-placement="top"
          title="Asociar Trabajos Temporales"
          @click="handleTemporal"
        >
          <i class="bi bi-file-earmark-plus"></i>
        </button>
        <button
          :disabled="validateForm"
          class="dt-button btn btn-primary active btn-crear"
          type="button"
          data-toggle="tooltip"
          data-placement="top"
          title="Asignar a trabajo"
          @click="openModalTrabajos = true"
        >
          <span class="px-3"><i class="bi bi-bag-plus-fill"></i></span>
        </button>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-md-3">
      <Conceptos
        v-if="!bandera"
        :optionsRefProp="optionsRef"
        @onAction="showConceptoModal"
        class=""
      />
    </div>
    <div class="col-md-9">
      <div>
        <div class="form-group">
          <div class="d-flex align-items-center justify-content-end">
            <div>
              <span class="font-weight-bold pr-2">Total: </span>
            </div>
            <div>
              <input
                class="form-control w-auto total-input"
                placeholder="Total..."
                type="text"
                readonly
                v-model="sumaTotal"
              />
              <!--                 v-model="inputSolicitud"
                @keyup.enter="handleFilter()" -->
            </div>
          </div>
        </div>
        <table v-if="showTable" class="table table-responsive">
          <thead class="table-gob">
            <tr>
              <th v-for="col in columnsTablaE7" class="text-center header-cell">
                {{ col.title }}
              </th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <template
              v-for="(DataE7, i) in pagination.data"
              :key="DataE7.partida"
            >
              <tr
                class="concepto-row"
                :class="{ selected: rowSelected == DataE7 }"
                @click="rowSelected = DataE7"
              >
                <template v-for="col in columnsTablaE7">
                  <td class="table-important">
                    <template v-if="!bandera">
                      <input
                        v-if="!excludedSelectData.includes(col.data)"
                        class="form-control"
                        type="text"
                        maxlength="15"
                        v-model="DataE7[col.data]"
                        @copy="$event.preventDefault()"
                        @paste="$event.preventDefault()"
                        @cut="$event.preventDefault()"
                        :readonly="
                          col.data !== 'precio' && col.data !== 'cantidad_obra'
                        "
                      />
                      <textarea
                        v-if="
                          col.data === 'clasificacion' ||
                          col.data === 'descripcion'
                        "
                        v-model="DataE7[col.data]"
                        class="form-control input-like"
                        maxlength="15"
                        @copy="$event.preventDefault()"
                        @paste="$event.preventDefault()"
                        @cut="$event.preventDefault()"
                        readonly
                        style="white-space: pre-wrap !important"
                      >
                      </textarea>
                    </template>
                  </td>
                </template>
                <td class="table-important text-center">
                  <button
                    class="btn btn-primary btn-sm active mr-2 mt-2 mb-2"
                    data-placement="top"
                    title="Partidas Adicionales"
                    @click="handleModalPartidasAdicionales(DataE7)"
                  >
                    <i class="bi bi-arrow-down-up"></i>
                  </button>
                  <button
                    class="btn btn-primary btn-sm active mr-2 mt-2 mb-2"
                    data-placement="top"
                    title="Eliminar"
                    @click="openConfirmModal(i)"
                  >
                    <i class="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
        <div class="d-flex flex-row">
          <PaginationTable
            :pagination="pagination"
            @onPaginate="handlePaginate"
            style="margin-top: auto; margin-bottom: auto"
            class="mr-auto ml-auto"
          />
          <div v-if="pagination.data.length" class="form-group mr-5">
            <label class="control-label" for="select-itemes">
              Elementos por página
            </label>
            <select
              v-model="itemsPerPage"
              style="
                width: 100px;
                margin-left: auto;
                margin-right: auto;
                margin-top: auto;
                margin-bottom: auto;
              "
              class="form-select form-control"
              id="select-itemes"
              name="select-itemes"
            >
              <option :value="10">10</option>
              <option :value="15">15</option>
              <option :value="20">20</option>
              <option :value="25">25</option>
              <option :value="50">50</option>
              <option :value="100">100</option>
              <option :value="1000">Todos</option>
            </select>
          </div>
          <div v-else class="col-12 text-center">
            <label class="control-label"> No se han añadido conceptos </label>
          </div>
        </div>
        <div v-if="pagination.data.length">
          <!--  <button class="btn btn-primary pull-right">Aprobar</button> -->
          <button class="btn btn-primary pull-right mr-2">Guardar</button>
        </div>
      </div>
    </div>
    <Modal
      v-if="openModal"
      :concepto="conceptoActual"
      @onCloseModal="openModal = false"
      @onSave="addConcepto"
    />
    <ConfirmModal
      v-if="removeModal"
      :title="`Eliminar concepto`"
      saveButtonTitle="Eliminar"
      :large-modal="true"
      @onCloseModal="removeModal = false"
      @onSave="removeConcepto()"
    >
      Se quitará de la plantilla el concepto seleccionado
    </ConfirmModal>
    <AsociarTrabajoModal
      v-if="openModalTrabajos"
      :conceptos="DataSelectConceptosRef"
      @onCloseModal="openModalTrabajos = false"
      @onSave="clearTable"
    />
    <ImportarModal
      v-if="openModalImport"
      @onCloseModal="openModalImport = false"
      @onSave="addConceptos"
    />
    <ConfirmModal
      v-if="openModalPartidasAdicionales"
      :title="`Mover Partida`"
      saveButtonTitle="Confirmar"
      :large-modal="true"
      @onCloseModal="openModalPartidasAdicionales = false"
      @onSave="renumPartidas"
    >
      <div class="d-flex flex-column justify-content-between h-100">
        <div>
          Requiere Mover a la Partida Seleccionada <br />
          <br />
          <strong>Indique en qué lugar desea la partida Seleccionada</strong>
          <br />
          <input
            class="form-control w-100"
            placeholder="No. Partida"
            type="text"
            v-model="newPartida"
          />
        </div>
      </div>
    </ConfirmModal>
    <ConfirmModal
      v-if="openDownloadConceptosModal"
      :title="`Generar Reporte`"
      saveButtonTitle="Confirmar"
      :large-modal="true"
      :keepOpenOnSave="true"
      @onCloseModal="openDownloadConceptosModal = false"
      @onSave="handleReportePublicacion"
    >
      <div
        v-if="!LoadingReporteConceptos"
        class="d-flex flex-column justify-content-between h-100"
      >
        <div>
          Seleccione el tipo de publicacion que desea <br />
          <br />
          <div v-for="option in optionReporteConceptos" :key="option.value">
            <input
              type="radio"
              :id="option.value"
              :name="option.title"
              class="mr-2"
              v-model="selectedOptionReportePublicacion"
              :value="option.value"
            />
            <label :for="option.value" class="font-weight-normal">{{
              option.title
            }}</label>
          </div>
        </div>
      </div>
      <div v-else class="text-center">
        <div
          class="spinner-border spinner"
          style="width: 3rem; height: 3rem"
          role="status"
        >
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </ConfirmModal>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import router from "@/router";
import ButtonBarComponent from "@/components/ButtonBarComponent.vue";
import usePetition from "@/composables/usePetition";
import PaginationTable from "@/components/TableInputs/Pagination.vue";
import { useApplicationStore } from "@/store/applicationStore";
import { IOption, ISuboption } from "@/utils/models/optionsConceptosE7";
import Conceptos from "@/components/E7/Conceptos.vue";
import Modal from "@/components/E7/ConceptoModal.vue";
import AsociarTrabajoModal from "@/components/E7/AsociarTrabajoModal.vue";
import ConfirmModal from "@/components/ModalWithoutButton.vue";
import ImportarModal from "@/components/E7/ImportarE7Modal.vue";
import useAlert from "@/composables/useAlert";
import { useConceptosTemporalStore } from "@/store/conceptoTemporalStore";
import { Concepto } from "@/utils/models/conceptos";
import {
  ConceptoTemporal,
  defaultValues,
} from "@/utils/models/conceptosTemporal";
import { HTTP_METHODS } from "@/utils/constants/methodsPetitions";

const { arrayData: unidadesMedida, getDatas: getUnidadesMedida } =
  usePetition("cat_unidad_medida/");
const {
  createData: createDataConceptos,
  customPetition: customPetitionConceptos,
} = usePetition("conceptos_trabajos/");
const { customPetition } = usePetition("cat_conceptos/");
const { showAlertSuccess, showAlertError } = useAlert();

const conceptosStore = useConceptosTemporalStore();
const appStore = useApplicationStore();

const viewName = "E7";
const bandera = ref<boolean>(true);
const LoadingReporteConceptos = ref<boolean>(false);
const optionsRef = ref<IOption[]>([]); // Referencia a los datos de opciones
const itemsPerPage = ref(10);
const inicio = ref(0);
const newPartida = ref("");
const selectedOptionReportePublicacion = ref("all");
const DataSelectConceptosRef = ref<{ [key: string]: any }[]>([]);
const DataE7Row = ref<ConceptoTemporal>(defaultValues);
const excludedSelectData = ["clasificacion", "descripcion"];
const rowSelected: any = ref({});

const columnsTablaE7 = [
  { data: "partida", title: "Partida" },
  { data: "clasificacion", title: "Clasificación" },
  { data: "descripcion", title: "Descripción" },
  { data: "unidad_medida", title: "U. Medida" },
  { data: "grupo", title: "Grupo" },
  { data: "cantidad_obra", title: "Cantidad de Obra" },
  { data: "precio", title: "Precio" },
];
const optionReporteConceptos = [
  { value: "all", title: "TODAS" },
  { value: "N", title: "NORMAS" },
  { value: "CS", title: "CATALOGOS SERVICIO" },
  { value: "EP", title: "ESP. PARTICULAR" },
  { value: "CNP", title: "EXTRAORDINARIO" },
];

const openModal = ref(false);
const openModalTrabajos = ref(false);
const openModalPartidasAdicionales = ref(false);
const openDownloadConceptosModal = ref(false);
const openModalImport = ref(false);
const removeModal = ref(false);
const conceptoActual: any = ref({});
const showTable = ref(true);
const handlePaginate = (page: number) => {
  inicio.value = (page - 1) * Number(itemsPerPage.value);
};
const conceptoSeleccionado = ref();

const getPaginatedData = (data: any[]) => {
  const fin = Number(inicio.value) + Number(itemsPerPage.value);
  return data.slice(inicio.value, fin);
};

const pagination = computed(() => {
  const data = DataSelectConceptosRef.value;
  const paginatedData = getPaginatedData(data);
  const totalPages = Math.ceil(data.length / itemsPerPage.value);
  const currentPage = Math.floor(inicio.value / itemsPerPage.value) + 1;
  return {
    page_size: itemsPerPage.value,
    page: Math.floor(inicio.value / itemsPerPage.value) + 1,
    total: data.length,
    total_pages: totalPages,
    previous_page: Math.max(currentPage - 1, 1),
    next_page: Math.min(currentPage + 1, totalPages),
    data: paginatedData,
  };
});

const validateForm = computed(() => {
  return (
    pagination.value.data.some((r) => !r.precio || !r.cantidad_obra) ||
    !DataSelectConceptosRef.value.length
  );
});

const clearTable = () => {
  DataSelectConceptosRef.value = [];
};

const buildSuboptions = (
  items: any[],
  clasificacion?: string
): ISuboption[] => {
  let suboptions: ISuboption[] = [];
  items.forEach((item) => {
    const suboption: ISuboption = {
      id: item.id,
      label: item.descripcion,
      open: false,
      etiquetas: [],
      libro: item.libro ? item.id : null,
      clasificacion: clasificacion,
    };
    if (item.libro) suboption.clasificacion = clasificacion + item.libro + "-";
    if (item.libros) {
      suboption.suboptions = buildSuboptions(item.libros);
    } else if (item.temas) {
      suboption.suboptions = buildSuboptions(
        item.temas,
        clasificacion + item.libro + "-"
      );
    } else if (item.partes) {
      suboption.suboptions = buildSuboptions(
        item.partes,
        clasificacion + item.tema + "-"
      );
    } else if (item.titulos) {
      suboption.suboptions = buildSuboptions(
        item.titulos,
        clasificacion + item.id + "-"
      );
    } else if (item.capitulos) {
      suboption.suboptions = buildSuboptions(
        item.capitulos,
        clasificacion + item.id
      );
    } else if (item.etiquetas) {
      suboption.etiquetas = item.etiquetas;
      suboption.clasificacion = clasificacion + "-" + item.id;
      // suboption.clasificacion = clasificacion;
    }

    suboptions.push(suboption);
  });

  return suboptions;
};

const extraerDatos = (json: any[]): void => {
  var datosFiltrados: IOption[] = json.map((publicacion) => {
    return {
      id: publicacion.id,
      label: publicacion.descripcion,
      open: false,
      clasificacion: publicacion.tipo + "-",
      suboptions: buildSuboptions(publicacion.libros, publicacion.tipo + "-"),
    };
  });
  optionsRef.value = datosFiltrados; // Asignar los datos extraídos a la referencia
};

const showConceptoModal = (option: any) => {
  conceptoActual.value = { ...conceptoActual.value, ...option };
  openModal.value = true;
};

const addConcepto = (option: any) => {
  const um = unidadesMedida.value.data.find(
    (u: any) =>
      u.clave == option.unidad_medida ||
      u.unidad.toLowerCase() == option.unidad_medida.toLowerCase()
  );
  const nuevoConcepto = {
    partida: DataSelectConceptosRef.value.length + 1,
    clasificacion: option.clasificacion || conceptoActual.value.clasificacion,
    descripcion: option.descripcion,
    unidad_medida: um ? um.unidad : option.unidad_medida,
    grupo: option.grupo,
    cantidad_obra: option.cantidad_obra || null,
    precio: option.precio || null,
  };

  DataSelectConceptosRef.value.push(nuevoConcepto);
};
const addConceptos = (conceptos: any) => {
  conceptos.value.forEach((c: any) => {
    let data = {
      unidad_medida: c.unidad_de_medida,
      clasificacion: c.norma,
      descripcion: c.descripcion,
      grupo: c.grupo,
      cantidad_obra: c.cantidad,
      precio: c.precio,
    };
    addConcepto(data);
  });
};

const openConfirmModal = (index: any) => {
  conceptoSeleccionado.value = index;
  removeModal.value = true;
};
const handleModalPartidasAdicionales = (dataE7: any) => {
  DataE7Row.value = dataE7;
  openModalPartidasAdicionales.value = true;
};
const renumPartidas = () => {
  const newPartidaNumber = parseInt(newPartida.value);
  if (
    isNaN(newPartidaNumber) ||
    newPartidaNumber <= 0 ||
    newPartidaNumber > DataSelectConceptosRef.value.length
  ) {
    showAlertError("Número de partida no válido", 3000);
    newPartida.value = "";
    return;
  }

  // Encontrar el índice de la partida a mover
  const indexToMove = DataSelectConceptosRef.value.findIndex(
    (item) => item.partida === DataE7Row.value.partida
  );

  if (indexToMove === -1) {
    showAlertError("Partida no encontrada", 3000);
    newPartida.value = "";
    return;
  }

  // Eliminar el elemento de su posición actual
  const elementoMovido = DataSelectConceptosRef.value.splice(indexToMove, 1)[0];

  // Insertar el elemento en la nueva posición
  DataSelectConceptosRef.value.splice(newPartidaNumber - 1, 0, elementoMovido);

  // Renumerar las partidas para mantener la secuencia correcta
  DataSelectConceptosRef.value.forEach((item, index) => {
    item.partida = index + 1;
  });
  newPartida.value = "";
  showAlertSuccess("Partida actualizada y renumerada con éxito", 3000);
};

const removeConcepto = () => {
  // showTable.value = false
  // pagination.value.data = [...pagination.value.data.splice(index,1)]
  // showTable.value = true
  DataSelectConceptosRef.value.splice(conceptoSeleccionado.value, 1);
  // Renumber the remaining items
  DataSelectConceptosRef.value.forEach((item, index) => {
    item.partida = index + 1;
  });
};

const calcularProducto = (fila: any) => {
  return fila.cantidad_obra * fila.precio;
};

const sumaTotal = computed(() => {
  let suma = 0;
  DataSelectConceptosRef.value.forEach((fila) => {
    suma += calcularProducto(fila);
  });
  return suma;
});

const handleDesasociarTemporal = async () => {
  conceptosStore.setConcepto(DataSelectConceptosRef.value as Concepto[]);
  router.push({ name: "temporal-E7" });
};
const mapToBackendFormat = (item: any) => {
  return {
    norma: item.clasificacion || "", // Ajusta según corresponda
    partida: item.partida || "",
    unidad_de_medida: item.unidad_medida || "",
    descripcion: item.descripcion || "",
    grupo: item.grupo || "",
    cantidad: item.cantidad_obra || 0,
    precio: item.precio || 0,
    importe: item.importe || item.precio * item.cantidad_obra, // Asegúrate de incluir todos los campos necesarios
  };
};

const handleTemporal = async () => {
  const token = localStorage.getItem("token");
  //TODO: HACER QUE EN CLASIFICACION AGREGE LA ETIQUETA
  try {
    // Convertir los datos al formato esperado por el backend
    const formattedData = {
      datos: pagination.value.data.map(mapToBackendFormat),
    };
    const response = await fetch(
      `${import.meta.env.VITE_API}conceptos_trabajos/`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      }
    );

    if (!response) return;

    const json = await response.json();

    if (response.status !== 201) {
      showAlertError(`${json}`, 3000);
    } else {
      showAlertSuccess(`¡Éxito! ${json.id} es el numero asociado `, 5000);
      DataSelectConceptosRef.value = [];
    }
  } catch (error) {
    showAlertError(`${error}`, 3000);
  }
};
const handleReportePublicacion = async () => {
  /* appStore.initTransaction(); */
  LoadingReporteConceptos.value = true;
  try {
    const response = await customPetition(
      HTTP_METHODS.GET,
      {},
      "descargar_archivo/",
      `tipo_publicacion=${selectedOptionReportePublicacion.value}`,
      "blob" // Especificar que esperamos un blob como respuesta
    );

    // Buscar el título correspondiente al valor seleccionado
    const selectedOption = optionReporteConceptos.find(
      (option) => option.value === selectedOptionReportePublicacion.value
    );
    let fileName = "Reporte_Conceptos.xlsx";
    if (selectedOption) {
      fileName = `Reporte_Conceptos_ ${selectedOption.title}.xlsx`;
    }
    const url = window.URL.createObjectURL(new Blob([response]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error en la descarga del archivo:", error);
    showAlertError(`Error Al Generar el Reporte ${error}`, 3000);
  } finally {
    /* appStore.endTransaction(); */
    LoadingReporteConceptos.value = false;
    showAlertSuccess("Reporte Generado con Exito", 3000);
  }
};

const imprimirE7 = () => {
  let decoratedData = pagination.value.data.map((el: any) => {
    return {
      cantidad: el.cantidad_obra,
      norma: el.clasificacion,
      descripcion: el.descripcion,
      grupo: el.grupo,
      partida: el.partida,
      precio: el.precio,
      unidad_de_medida: el.unidad_medida,
      importe: el.precio * el.cantidad_obra,
    };
  });
  let data = [...decoratedData];
  createDataConceptos({ datos: data }).then(async (response: any) => {
    let blob = await customPetitionConceptos(
      HTTP_METHODS.GET,
      undefined,
      `${response.id}/descargar`,
      "",
      "blob"
    );
    let fileName = `E7_${response.id}`;
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  });
};

onMounted(async () => {
  appStore.initTransaction();
  const token = localStorage.getItem("token");
  conceptosStore.extraerDatos();
  if (
    conceptosStore.getConceptos.length > 0 ||
    conceptosStore.getArrayConcepto.length > 0
  ) {
    const dataTransformada = conceptosStore.getConceptos
      .filter((concepto) => concepto !== null) // Filtrar elementos con norma no nula
      .map((concepto, index) => ({
        partida: index + 1,
        clasificacion: concepto.norma,
        descripcion: concepto.descripcion,
        unidad_medida: concepto.unidad_de_medida,
        grupo: concepto.grupo, //TODO: recuperar bien el grupo
        cantidad_obra: concepto.cantidad,
        precio: concepto.precio,
        temporal: concepto.temporal,
      }));
    const nuevoConcepto = conceptosStore.getArrayConcepto.map(
      (concepto, index) => ({
        partida: dataTransformada.length + index + 1,
        clasificacion: concepto.clasificacion,
        descripcion: concepto.descripcion,
        unidad_medida: concepto.unidad_medida,
        grupo: concepto.grupo,
        cantidad_obra: concepto.cantidad_obra,
        precio: concepto.precio,
      })
    );

    if (conceptosStore.getArrayConcepto.length > 0) {
      DataSelectConceptosRef.value = [...dataTransformada, ...nuevoConcepto];
    } else {
      DataSelectConceptosRef.value = dataTransformada;
    }
  }
  try {
    const response = await fetch(`${import.meta.env.VITE_API}cat_conceptos/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response) return;

    const json = await response.json();
    /*     console.log(json); */
    extraerDatos(json);
    bandera.value = false;
    appStore.endTransaction();
  } catch (error) {
    console.log(error);
  }
  getUnidadesMedida({ page: 1 });
});
</script>
<style lang="scss" scoped>
@media (max-width: 768px) {
  .margin-head {
    margin-top: 19rem;
  }
}

.table-gob {
  background-color: #691c32;
  color: #fff;
}

.table-important {
  background-color: #c0c0c0;
  color: #000;
  font-weight: bold;
  padding: 5px;
  align-items: center;
}

.table-semi-important {
  background-color: #f2f2f2;
  color: #000;
}

.form-control {
  width: 200px;
  text-align: center;
  white-space: wrap !important;
  /* Evitar que el texto se divida en varias líneas */
  overflow: hidden;
}

.input-like {
  resize: vertical;
  /* Usuario pueda cambiar el tamaño del textarea */
  border: 1px solid #ced4da;
  /* Establece un borde similar al de un input */
  border-radius: 4px;
  /* Aplica esquinas redondeadas */
  padding: 6px 12px;
  /* Espacio interno similar al de un input */
  line-height: 1.5;
  /* Alinea el texto verticalmente */
  font-size: 14px;
  /* Tamaño de fuente similar al de un input */
  height: 40px;
  /* Establece la altura deseada */
}

.header-cell {
  max-width: 200px;
  white-space: nowrap !important;
  /* Evitar que el texto se divida en varias líneas */
  overflow: hidden;
  /* Ocultar cualquier exceso de texto que no quepa */
  text-overflow: ellipsis;
  /* Mostrar puntos suspensivos (...) si el texto no cabe */
}

//Clase para el texto al inicio
.total-input {
  text-align: start !important;
  width: 150px !important;
}

.concepto-row:hover {
  .table-important {
    background-color: rgb(173, 173, 173);
  }
  input:read-only,
  textarea:read-only {
    cursor: pointer !important;
    pointer-events: all;
  }
}
.concepto-row {
  cursor: pointer;
}
.concepto-row.selected {
  .table-important {
    background-color: rgb(160, 160, 160);
  }
}
</style>
