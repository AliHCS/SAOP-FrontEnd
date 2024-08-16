<template>
  <div>
    <h4 class="view-name">{{ viewName }}</h4>
    <hr class="red" />
    <div class="pb-5 pt-3">
      <ButtonBarComponent
        @onCustom="router.push({ name: 'listar-registro-participantes' })"
        showCustomButton
        customLabel="Regresar"
        :show-subactions="false"
        :showCreate="idControlCargaPo !== null"
        custom-label-create="Guardar"
        @on-create="handleCreate"
      />
    </div>
    <ul class="nav nav-tabs" id="myTab">
      <li class="nav-item">
        <button
          class="nav-link active"
          id="po-tab"
          data-bs-toggle="tab"
          data-bs-target="#po"
          type="button"
          role="tab"
          aria-controls="po"
          aria-selected="true"
          @click="activeTab = ActiveTab.PropuestaObra"
        >
          Propuesta obra
        </button>
      </li>
      <li class="nav-item">
        <button
          class="nav-link"
          id="pp-tab"
          data-bs-toggle="tab"
          data-bs-target="#pp"
          type="button"
          role="tab"
          aria-controls="pp"
          aria-selected="true"
          @click="activeTab = ActiveTab.PropuestaPrograma"
        >
          Propuesta programa
        </button>
      </li>
      <li class="nav-item">
        <button
          class="nav-link"
          id="pe-tab"
          data-bs-toggle="tab"
          data-bs-target="#pe"
          type="button"
          role="tab"
          aria-controls="pe"
          aria-selected="true"
          @click="activeTab = ActiveTab.PropuestaEquipo"
        >
          Propuesta equipo
        </button>
      </li>
      <li class="nav-item">
        <button
          class="nav-link"
          id="ppnal-tab"
          data-bs-toggle="tab"
          data-bs-target="#ppnal"
          type="button"
          role="tab"
          aria-controls="ppnal"
          aria-selected="true"
          @click="activeTab = ActiveTab.PropuestaPersonal"
        >
          Propuesta personal
        </button>
      </li>
    </ul>
    <div
      class="row app-options-bar"
      v-if="!loadingData && !errorTypeDocument && !globalError && !wrongData"
    >
      <div class="col-md-8">
        <div class="row py-2 d-flex align-items-center">
          <div class="col-md-4 text-right">Clave folio</div>
          <div class="col-md-4">
            <input
              v-model="procedimiento.id"
              readonly
              type="text"
              class="form-control"
            />
          </div>
        </div>
        <div class="row py-2 d-flex align-items-center">
          <div class="col-md-4 text-right">Folio procedimiento</div>
          <div class="col-md-5">
            <input
              v-model="procedimiento.folio"
              readonly
              type="text"
              class="form-control"
            />
          </div>
        </div>
        <div class="row py-2 d-flex align-items-center">
          <div class="col-md-4 text-right">Contratista</div>
          <div class="col-md-3">
            <input
              v-model="proveedor.id"
              readonly
              type="text"
              class="form-control"
            />
          </div>
          <div class="col-md-5 px-0">
            <input
              v-model="proveedor.nombre"
              readonly
              type="text"
              class="form-control"
            />
          </div>
        </div>
      </div>
      <div class="col-md-2">
        <div class="d-felx flex-column">
          <div class="text-center py-3">Tipo de carga</div>
          <label class="form-check-label px-5 py-2">
            <input
              type="radio"
              name="tipo-carga"
              value="Masiva"
              class="form-check-input"
              v-model="tipoCarga"
              @change="handleTipoCargaChange"
            />
            <span class="pl-4">Masiva</span>
          </label>
          <label class="form-check-label px-5 py-2">
            <input
              type="radio"
              name="tipo-carga"
              value="Manual"
              class="form-check-input"
            />
            <span class="pl-4">Manual</span>
          </label>

          <input
            type="file"
            ref="fileInput"
            accept=".xlsx"
            @change="handleFileUpload"
            class="d-none"
          />
        </div>
      </div>
      <div class="col-md-2">
        <div class="d-felx flex-column">
          <div class="text-center pt-3">Exportación</div>
          <div class="h1 text-center clickable" @click="handleDownload()">
            <i class="bi bi-folder-symlink"></i>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="
        showView &&
        !loadingData &&
        !errorTypeDocument &&
        !globalError &&
        !wrongData
      "
      class="tab-content"
      id="myTabContent"
    >
      <div
        class="tab-pane fade show active"
        id="po"
        role="tabpanel"
        aria-labelledby="po-tab"
      >
        <div>
          <!-- <DataTableComponent
            :key="dataResponseMasivaPO"
            v-if="dataResponseMasivaPO.length > 0"
            rowId="partida"
            hideActions
            :columns="columns"
            :data="dataResponseMasivaPO"
            :pagination="[]"
            @onPaginate=""
          /> -->
          <div class="table-responsive" v-if="dataResponseMasivaPO.length > 0">
            <table class="table table-responsive">
              <thead class="table-gob">
                <tr>
                  <th v-for="col in columns" class="text-center header-cell">
                    {{ col.title }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <template v-for="(DataCartera, index) in dataResponseMasivaPO">
                  <tr>
                    <template v-for="col in columns">
                      <td class="table-important">
                        <!-- showInput(value.clasificacion, col.data) -->
                        <input
                          class="form-control"
                          type="text"
                          maxlength="15"
                          v-model="DataCartera[col.data]"
                          @copy="$event.preventDefault()"
                          @paste="$event.preventDefault()"
                          @cut="$event.preventDefault()"
                          @input="
                            handleInputChange(col.data, DataCartera, index)
                          "
                          :disabled="col.data !== 'precio'"
                        />
                      </td>
                    </template>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div
        class="tab-pane fade"
        id="pp"
        role="tabpanel"
        aria-labelledby="pp-tab"
      >
        <div>
          <PropuestaProgramaTabla v-if="dataResponseMasivaPO.length > 0" :data="dataResponseMasivaPO" :procedimiento="procedimiento" @inputChange="({data, dataCartera, index}) => handleInputChange(data, dataCartera, index)"/>
        </div>
      </div>
      <div
        class="tab-pane fade"
        id="pe"
        role="tabpanel"
        aria-labelledby="pe-tab"
      >
        <div>
          <h4 class="view-name">Propuesta equipo</h4>
        </div>
      </div>
      <div
        class="tab-pane fade"
        id="ppnal"
        role="tabpanel"
        aria-labelledby="ppnal-tab"
      >
        <div>
          <h4 class="view-name">Propuesta personal</h4>
        </div>
      </div>
    </div>
    <div class="text-right mt-3">
      <strong>Total Importe: {{ totalImporte }}</strong>
    </div>
    <!-- ALERTAS DE ERRORES -->
    <AlertSection
      :errorTypeDocument="errorTypeDocument"
      :finishedProcess="finishedProcess"
      :loadingData="loadingData"
      :globalError="globalError"
      :wrongData="wrongData"
      :reset="reset"
      :getErroresOthers="getErroresOthers"
      :errorShowCabeceras="errorShowCabeceras"
    ></AlertSection>
  </div>
</template>
<script setup lang="ts">
import { onBeforeMount, ref, computed } from "vue";
import usePetition from "@/composables/usePetition";
// import DataTableComponent from "@/components/DataTableComponent.vue";
import PropuestaProgramaTabla from "@/components/PropuestasObra/PropuestaProgramaTabla.vue";
import AlertSection from "@/components/AlertBulkData.vue";
import { useRoute } from "vue-router";
import router from "@/router";
import useAlert from "@/composables/useAlert";
import ButtonBarComponent from "@/components/ButtonBarComponent.vue";
import { TipoDocumento } from "@/utils/constants/formasProcedimiento";

const route = useRoute();

const viewName = "Proposiciones de obra";
const { showAlertSuccess } = useAlert();

const { getData } = usePetition("registro_participante/");
const { getDatas: getDatasProveedor, arrayData: arrayProveedores } =
  usePetition("cat_proveedor/");
const { getData: getDataPC } = usePetition("procedimiento_contratacion/");
const { getDatas: getDatasConceptos, arrayData: arrayConceptos } = usePetition(
  "conceptos_trabajos/"
);
const { exportDoc } = usePetition("registro_participante");
const { importFromExcel } = usePetition("carga_archivo/");
const { createData } = usePetition("control_carga/");
const { searchData: searchDataPropustaObra,  } = usePetition("propuesta_obra/"); //arrayData: arrayPropuestaObra

const errorTypeDocument = ref<boolean>(false);
const finishedProcess = ref(false);
const loadingData = ref(false);
const globalError = ref(false);
const wrongData = ref(false);
const getErroresOthers = ref();
const errorShowCabeceras = ref(false);

enum ActiveTab {
  PropuestaObra = "po",
  PropuestaPrograma = "pp",
  PropuestaEquipo = "pe",
  PropuestaPersonal = "ppnal",
}

const procedimiento: any = ref({});
const participante: any = ref({});
const proveedor: any = ref({});
const idParticipante = ref<string>("");
const conceptos: any = ref([]);
//PO
const dataResponseMasivaPO: any = ref([]);
const savedDataMasivaPO: any = ref([]);
const idControlCargaPo = ref<number | null>(null);
const showView = ref(false);
const activeTab = ref<ActiveTab>(ActiveTab.PropuestaObra);

// Estado para el tipo de carga
const tipoCarga = ref<string>("");
// Referencia al input de archivo
const fileInput = ref<HTMLInputElement | null>(null);

const columns = [
  { title: "Partida", data: "partida", align: "center" },
  { title: "Descripción", data: "descripcion", align: "left" },
  { title: "Cantidad ", data: "cantidad", align: "left" },
  { title: "Precio", data: "precio", align: "left" },
  { title: "Importe", data: "importe", align: "left" },
];

const getConceptos = async () => {
  let trabajo_id = procedimiento.value.trabajo.id;
  let conceptosAux: any = [];
  await getDatasConceptos({ page: 1, size: 100, trabajo_id })
    .then(() => {
      arrayConceptos.value.data.map((c: any) => {
        if (c.datos && c.datos.length) {
          if (
            c.datos[0].consecutivo ==
            procedimiento.value.consecutivo_e7.consecutivo
          ) {
            conceptosAux.push(...c.datos);
          }
        }
      });
    })
    .finally(() => {
      conceptos.value = conceptosAux;
      showView.value = true;
    });
};

const reset = () => {
  errorTypeDocument.value = false;
  wrongData.value = false;
  finishedProcess.value = false;
  loadingData.value = false;
  globalError.value = false;
};

// Mapeo de activeTab a rutas específicas
const tabToRoute = {
  po: "propuesta_obra",
  pp: "propuesta_periodos",
  pe: "propuesta_equipo",
  ppnal: "propuesta_personal",
};

const handleDownload = async () => {
  // Construir URL dinámicamente
  const baseRoute = tabToRoute[activeTab.value];
  const urlDoc = `${idParticipante.value}/${baseRoute}/`;
  // Tipo de documento basado en la pestaña activa
  const tipoDocumento =
    activeTab.value === "po"
      ? "PropuestaObra_E7_"
      : activeTab.value === "pp"
      ? "PropuestaPeriodos_E7_"
      : TipoDocumento.PropuestaObra;

  await exportDoc(urlDoc, `${tipoDocumento}${idParticipante.value}.xlsx`);
};

// Manejador para el cambio de tipo de carga
const handleTipoCargaChange = () => {
  if (tipoCarga.value === "Masiva" && fileInput.value) {
    // Disparar el clic en el input de archivo
    fileInput.value.click();
  }
};

// Función para obtener el tipo de archivo basado en la pestaña activa
const getFileType = (tab: ActiveTab): string => {
  switch (tab) {
    case ActiveTab.PropuestaObra:
      return "propuesta_obra";
    case ActiveTab.PropuestaPrograma:
      return "propuesta_periodos";
    case ActiveTab.PropuestaEquipo:
      return "propuesta_equipo";
    case ActiveTab.PropuestaPersonal:
      return "propuesta_personal";
    default:
      throw new Error("Tipo de archivo no reconocido.");
  }
};
const handleInputChange = (field: string, item: any, index: number) => {
  if (field === "precio") {
    const newImporte = calcularImporte(item.precio, item.cantidad);
    dataResponseMasivaPO.value[index].precio = item.precio;
    dataResponseMasivaPO.value[index].importe = newImporte;
    decorateData(dataResponseMasivaPO.value)
  }
};
// Función para calcular el importe
const calcularImporte = (precio: number, cantidad: number): number => {
  return (precio * cantidad) || 0;
};

// Función para calcular el total de los importes
const totalImporte = computed(() => {
  return dataResponseMasivaPO.value.reduce((total: number, item: any) => {
    return total + item.importe;
  }, 0);
});

// Manejador de la carga de archivos
const handleFileUpload = async (event: Event) => {
  finishedProcess.value = false;
  const fileInputElement = event.target as HTMLInputElement;
  const file = fileInputElement.files?.[0];

  if (!file) {
    return;
  }
  // Determinar el tipo de archivo basado en la pestaña activa
  const fileType = getFileType(activeTab.value);

  // Peticion para subir el archivo
  const formData = new FormData();
  formData.append("archivo", file);
  formData.append("tipo_archivo", fileType);
  try {
    const response = await importFromExcel(formData);
    await handleResponse(response);
  } catch (error) {
    handleError();
  } finally {
    finishedProcess.value = true;
    loadingData.value = false;
  }
  fileInputElement.value = "";
  tipoCarga.value = ""
};

const handleError = () => {
  globalError.value = true;
};

const handleSuccessResponse = (data: number, documento_cargado: any) => {
  console.log("documento_cargado: ", documento_cargado);
  console.log(data);
  // Procesar cada elemento de documento_cargado para calcular el importe
  let acumulado = 0
  const oldData:any = [...dataResponseMasivaPO.value]
  dataResponseMasivaPO.value = documento_cargado.map((item: any) => {
    const precio = item.precio ? item.precio : oldData.find((el:any) => el.partida == item.partida) ? oldData.find((el:any) => el.partida == item.partida).precio : 0
    acumulado += calcularImporte(precio, item.cantidad)
    return {
      ...item,
      precio: precio,
      importe: calcularImporte(precio, item.cantidad),
      acumulado
    }
  });
  savedDataMasivaPO.value = documento_cargado;
  idControlCargaPo.value = data;
  showAlertSuccess("La carga se ha realizado correctamente", 3000);
};

const handleErrorResponse = (errors: any) => {
  errorShowCabeceras.value = false;
  if (errors.length > 0) {
    const error_validacion_datos = errors[0].error_validacion_datos || [];
    const error_cabeceras = errors[0].error_validacion_cabeceras || [];
    if(error_cabeceras.length > 0)
      errorShowCabeceras.value = true;
    const errores = [...error_validacion_datos, ...error_cabeceras ];
    getErroresOthers.value = errores;
  } else {
    handleError();
  }
};

const handleResponse = async (response: any) => {
  if (response.status === 201) {
    const json = await response.json();
    const { carga_archivo, json_contenido, errors } = json;
    if (errors.length === 0 && carga_archivo > 0) {
      handleSuccessResponse(carga_archivo, json_contenido);
    } else if (errors.length > 0) {
      wrongData.value = true;
      handleErrorResponse(errors);
    } else {
      handleError();
    }
  } else {
    handleError();
  }
};

const handleCreate = async () => {
  console.log("se crea el objeto ");
  savedDataMasivaPO.value = dataResponseMasivaPO.value.map((item: any) => ({
    partida: item.partida,
    descripcion: item.descripcion,
    cantidad: item.cantidad,
    precio: item.precio,
    importe: calcularImporte(item.precio, item.cantidad),
  }));
  createData({
    json_contenido: savedDataMasivaPO.value,
    json_contenido_valido: savedDataMasivaPO.value,
    carga_archivo: idControlCargaPo.value,
  }).then(() => {
    reset();
  });
};

const decorateData = (data:any) => {
  let dataResponseMasivaPOAUX:any = [];
  if (data.length > 0) {
    let acumulado = 0
    const conceptosMapped = data.map((item: any) => {
      acumulado += calcularImporte(item.precio, item.cantidad)
      return {
        partida: item.partida,
        descripcion: item.descripcion,
        cantidad: item.cantidad,
        precio: item.precio,
        importe: calcularImporte(item.precio, item.cantidad),
        acumulado
      }
    });

    dataResponseMasivaPO.value = [
      ...dataResponseMasivaPOAUX,
      ...conceptosMapped,
    ];
  }
}

onBeforeMount(async () => {
  idParticipante.value = route.params.idParticipante.toString();
  await Promise.all([
    getDataPC(route.params.idProceso.toString()).then((res) => {
      procedimiento.value = res;
    }),
    getDatasProveedor({ page: 1, size: 100 }),
    getData(route.params.idParticipante.toString()).then((res) => {
      participante.value = res;
    }),
  ]);

  // Realiza la búsqueda de propuestas de obra
  await searchDataPropustaObra({
    folio__iexact: procedimiento.value.folio,
    proveedor: participante.value.proveedor,
    page: 1,
    page_size: 100,
  });
  let dataResponseMasivaPOAUX:any = [];
  // Obtiene los conceptos
  await getConceptos();

  //TODO: Revisar si al cargar los datos se deben mostrar los almacenados en conceptos_trabajos o en propuestas_obra/*
  // Si hay datos en searchDataPropustaObra, úsalos
  // if (arrayPropuestaObra.value.data.length > 0) {
  //   dataResponseMasivaPOAUX = arrayPropuestaObra.value.data.map(
  //     (item: any) => ({
  //       ...item,
  //       importe: calcularImporte(item.precio, item.cantidad),
  //     })
  //   );
  //   console.log(dataResponseMasivaPOAUX);
  // }

  // Si hay datos en conceptos, añádelos a dataResponseMasivaPO
  if (conceptos.value.length > 0) {
    let acumulado = 0
    const conceptosMapped = conceptos.value.map((item: any) => {
      acumulado += calcularImporte(item.precio, item.cantidad)
      return {
        partida: item.partida,
        descripcion: item.descripcion,
        cantidad: item.cantidad,
        precio: item.precio,
        importe: calcularImporte(item.precio, item.cantidad),
        acumulado
      }
    });

    dataResponseMasivaPO.value = [
      ...dataResponseMasivaPOAUX,
      ...conceptosMapped,
    ];
  }

  proveedor.value = arrayProveedores.value.data.find(
    (p: any) => p.id === participante.value.proveedor
  );
});
</script>
<style lang="scss" scoped></style>
