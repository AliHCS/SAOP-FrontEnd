<template>
  <div class="margin-head">
    <div class="row">
      <div class="col-12 col-sm-6">
        <h4 style="margin-left: 15px">Carga masiva de datos</h4>
      </div>
    </div>
    <div class="col-sm-12 col-md-12 col-xs-12 col-lg-12 col-xl-12">
      <hr class="red" />
    </div>
    <!-- BOTONES -->
    <Modal
      title="Información de carga de archivo"
      saveButtonTitle="Aceptar"
      openButtonTittle="Info"
      :large-modal="true"
    >
      <label>Reglas</label>
      <small class="text-muted">
        <div class="overflow-auto" style="max-height: 250px">
          <ul
            class="list-group list-group-item list-group-flush lh-sm overflow-auto"
          >
            <li class="lh-sm">
              <b
                >Las celdas del archivo Excel deben contener exclusivamente
                valores alfanuméricos y no se permiten celdas vacías.</b
              >
            </li>
          </ul>
          <div class="d-flex align-items-center">
            <b class="flex-grow-1">Plantilla de archivo para carga masiva</b>
            <i
              class="bi bi-file-earmark-arrow-down-fill custom-icon active ml-2"
              @click="downloadTemplateDoc(docName)"
            ></i>
          </div>
        </div>
      </small>
    </Modal>
    <br />
    <!-- DATOS CORRECTOS -->
    <div
      class="table-responsive"
      v-if="
        finishedProcess &&
        !loadingData &&
        !errorTypeDocument &&
        !globalError &&
        !wrongData
      "
    >
      <table class="table table-responsive">
        <thead class="table-gob">
          <tr>
            <th
              v-for="col in columnsCarteraDeInversion"
              class="text-center header-cell"
            >
              {{ col.title }}
            </th>
          </tr>
        </thead>
        <tbody>
          <template v-for="DataCartera in DataResponseRef">
            <tr>
              <template v-for="col in columnsCarteraDeInversion">
                <td class="table-important">
                  <!-- showInput(value.clasificacion, col.data) -->
                  <template
                    v-if="
                      true &&
                      col.data !== 'total' &&
                      col.data !== 'clasificacion'
                    "
                  >
                    <SelectInputTable
                      v-if="col.data === 'prioridad'"
                      v-model="DataCartera[col.data]"
                      name="prioridad"
                      id="prioridad"
                      class="SelectComponent"
                      :class="{ 'input-error': DataCartera[col.data] === '' }"
                      :options="arrayDataPrioridad.data"
                      :optionText="'tipo_prioridad'"
                      optionValue="clave"
                      disabled
                    />
                    <SelectInputTable
                      v-if="col.data === 'factibilidad_obra'"
                      v-model="DataCartera[col.data]"
                      name="factibilidad_obra"
                      id="factibilidad_obra"
                      class="SelectComponent"
                      :class="{ 'input-error': DataCartera[col.data] === '' }"
                      :options="arrayDataFactibilidad.data"
                      optionText="descripcion"
                      optionValue="clave"
                      disabled
                    />
                    <SelectInputTable
                      v-if="col.data === 'area'"
                      v-model="DataCartera[col.data]"
                      name="area"
                      id="area"
                      class="SelectComponent"
                      :class="{ 'input-error': DataCartera[col.data] === '' }"
                      :options="arrayDataArea.data"
                      optionText="nombre"
                      optionValue="clave"
                      disabled
                    />
                    <SelectInputTable
                      v-if="col.data === 'tipo_proyecto'"
                      v-model="DataCartera[col.data]"
                      name="tipo_proyecto"
                      id="tipo_proyecto"
                      class="SelectComponent"
                      :class="{ 'input-error': DataCartera[col.data] === '' }"
                      :options="arrayDataProyecto.data"
                      optionText="descripcion"
                      optionValue="clave"
                      disabled
                    />
                    <SelectInputTable
                      v-if="col.data === 'estatus_proyecto'"
                      v-model="DataCartera[col.data]"
                      name="estatus_proyecto"
                      id="estatus_proyecto"
                      class="SelectComponent"
                      :class="{ 'input-error': DataCartera[col.data] === '' }"
                      :options="arrayDataEstatus.data"
                      optionText="descripcion"
                      optionValue="clave"
                      disabled
                    />
                    <SelectInputTable
                      v-if="col.data === 'cartera_estatus'"
                      v-model="DataCartera[col.data]"
                      name="cartera_estatus"
                      id="cartera_estatus"
                      class="SelectComponent"
                      :class="{ 'input-error': DataCartera[col.data] === '' }"
                      :options="arrayDataEstatus.data"
                      optionText="descripcion"
                      optionValue="clave"
                      disabled
                    />
                    <SelectInputTable
                      v-if="col.data === 'entidad_federativa'"
                      v-model="DataCartera[col.data]"
                      name="entidad_federativa"
                      id="entidad_federativa"
                      class="SelectComponent"
                      :class="{ 'input-error': DataCartera[col.data] === '' }"
                      :options="arrayDataEntidadFederativa.data"
                      optionText="descripcion"
                      optionValue="clave"
                      disabled
                    />
                    <SelectInputTable
                      v-if="col.data === 'unidad_responsable'"
                      v-model="DataCartera[col.data]"
                      name="unidad_responsable"
                      id="unidad_responsable"
                      class="SelectComponent"
                      :class="{ 'input-error': DataCartera[col.data] === '' }"
                      :options="arrayDataUnidadResponsable.data"
                      optionText="descripcion"
                      optionValue="clave"
                      disabled
                    />
                    <SelectInputTable
                      v-if="col.data === 'fase'"
                      v-model="DataCartera[col.data]"
                      name="fase"
                      id="fase"
                      class="SelectComponent"
                      :class="{ 'input-error': DataCartera[col.data] === '' }"
                      :options="arrayDataFase.data"
                      optionText="descripcion"
                      optionValue="clave"
                      disabled
                    />
                    <SelectInputTable
                      v-if="col.data === 'tipo_obra'"
                      v-model="DataCartera[col.data]"
                      name="tipo_obra"
                      id="tipo_obra"
                      class="SelectComponent px-auto"
                      :class="{ 'input-error': DataCartera[col.data] === '' }"
                      :options="arrayDataTipoObra.data"
                      optionText="descripcion"
                      optionValue="clave"
                      disabled
                    />
                    <input
                      v-if="!excludedSelectData.includes(col.data)"
                      class="form-control"
                      type="text"
                      maxlength="15"
                      v-model="DataCartera[col.data]"
                      @copy="$event.preventDefault()"
                      @paste="$event.preventDefault()"
                      @cut="$event.preventDefault()"
                      disabled
                    />
                  </template>
                  <template v-else>
                    {{ transformData(DataCartera, col.data) }}
                  </template>
                </td>
              </template>
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
        <div class="form-group mr-5">
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
            <option :value="7">7</option>
            <option :value="10">10</option>
            <option :value="15">15</option>
            <option :value="20">20</option>
            <option :value="25">25</option>
            <option :value="50">50</option>
            <option :value="100">100</option>
            <option :value="1000">Todos</option>
          </select>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-center">
      <!-- DROPZONE -->
      <DropZone
        v-if="!finishedProcess && !loadingData && !errorTypeDocument"
        class="disabled"
        @drop.prevent="drop($event, 'drop')"
        @change="drop($event, 'selected')"
        :style="dropZoneStyle"
      />
    </div>
    <!--BOTONES-->
    <div
      v-if="
        finishedProcess &&
        !loadingData &&
        !errorTypeDocument &&
        !globalError &&
        !wrongData
      "
    >
      <button class="btn btn-primary pull-right" @click="sendData">
        Aprobar
      </button>
      <button class="btn btn-danger pull-right mr-2" @click="reset">
        Restablecer
      </button>
    </div>
    <!-- ALERTAS DE ERRORES -->
    <AlertSection
      :errorTypeDocument="errorTypeDocument"
      :finishedProcess="finishedProcess"
      :loadingData="loadingData"
      :globalError="globalError"
      :wrongData="wrongData"
      :reset="reset"
      :getErrosByState="getErrosByState"
      :headerErrors="headerErrors"
    ></AlertSection>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import DropZone from "@/components/DropZone.vue";
import Modal from "@/components/Modals.vue";
import AlertSection from "@/components/AlertBulkData.vue";
import PaginationTable from "@/components/TableInputs/Pagination.vue";
import SelectInputTable from "@/components/TableInputs/SelectInput.vue";
import { scrollTop } from "@/utils/helpers/scrollHelper";
import usePetition from "@/composables/usePetition";
import router from "@/router";
import { downloadTemplateDoc } from "@/utils/helpers/exportFileHelper";

/* PETICIONES */
const { arrayData: arrayDataPrioridad, getDatas: getDatasPrioridad } =
  usePetition("cat_prioridad/");
const { arrayData: arrayDataFactibilidad, getDatas: getDatasFactibilidad } =
  usePetition("cat_factibilidad/");
const { arrayData: arrayDataArea, getDatas: getDatasArea } =
  usePetition("cat_nivel_area/");
const { arrayData: arrayDataProyecto, getDatas: getDatasProyecto } =
  usePetition("cat_tipo_proyecto/");
const { arrayData: arrayDataEstatus, getDatas: getDatasEstatus } =
  usePetition("cat_estatus/");
const {
  arrayData: arrayDataEntidadFederativa,
  getDatas: getDatasEntidadFederativa,
} = usePetition("cat_entidad_federativa/");
const {
  arrayData: arrayDataUnidadResponsable,
  getDatas: getDatasUnidadResponsable,
} = usePetition("cat_unidad_responsable/");
const { arrayData: arrayDataFase, getDatas: getDatasFase } =
  usePetition("cat_fase/");
const { arrayData: arrayDataTipoObra, getDatas: getDatasTipoObra } =
  usePetition("cat_tipo_obra/");
const { createData } = usePetition("control_carga/");
const excludedSelectData = [
  "prioridad",
  "factibilidad_obra",
  "area",
  "tipo_proyecto",
  "estatus_proyecto",
  "cartera_estatus",
  "entidad_federativa",
  "unidad_responsable",
  "fase",
  "tipo_obra",
];

const docName = "Cartera_Proyectos_Inversion.xlsx";
const dropzoneFile = ref<any>("");
const errorTypeDocument = ref<boolean>(false);
const finishedProcess = ref(false);
const loadingData = ref(false);
const globalError = ref(false);
const wrongData = ref(false);
const jsonData = ref<any>(null);
const getErrosByState = ref();
const headerErrors = ref();

const columnsCarteraDeInversion = [
  { data: "no_solicitud", title: "Número de Solicitud" },
  { data: "nombre", title: "Nombre" },
  { data: "descripcion", title: "Descripción" },
  { data: "factibilidad_obra", title: "Factibilidad de la Obra" },
  { data: "prioridad", title: "Prioridad" },
  { data: "tipo_proyecto", title: "Tipo de Proyecto" },
  { data: "estatus_proyecto", title: "Estatus del Proyecto" },
  { data: "cartera_estatus", title: "Estatus de Cartera" },
  { data: "pais", title: "País" },
  { data: "entidad_federativa", title: "Entidad Federativa" },
  { data: "municipio", title: "Municipio" },
  { data: "beneficios", title: "Beneficios" },
  { data: "fecha_inicial", title: "Fecha Inicial" },
  { data: "fecha_final", title: "Fecha Final" },
  { data: "ejercicio_presupuestal", title: "Ejercicio Presupuestal" },
  { data: "fase", title: "Fase" },
  { data: "comentarios", title: "Comentarios" },
  { data: "clave_compromiso", title: "Clave Compromiso" },
  { data: "tipo_obra", title: "Tipo de Obra" },
  { data: "tipo_documento", title: "Tipo de Documento" },
  { data: "unidad_responsable", title: "Unidad Responsable" },
  { data: "area", title: "Área" },
  { data: "inversion_total", title: "Inversión Total" },
];

const DataResponseRef = ref<{ [key: string]: any }[]>([]);

const itemsPerPage = ref(7);
const inicio = ref(0);

watch(
  () => itemsPerPage.value,
  () => {
    inicio.value = 0;
  }
);

const handlePaginate = (page: number) => {
  inicio.value = (page - 1) * Number(itemsPerPage.value);
};

const getPaginatedData = (data: any[]) => {
  const fin = Number(inicio.value) + Number(itemsPerPage.value);
  return data.slice(inicio.value, fin);
};

const pagination = computed(() => {
  const data = DataResponseRef.value;
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

const transformData = (data: any, col: string) => {
  const keysToNotChange = ["revestidas", "terraceria"];
  if (
    data.clasificacion === "RED FEDERAL DE CARRETERAS" ||
    data.clasificacion === "CARRETERAS DE CUOTA CONCESIONADAS A:"
  ) {
    return !keysToNotChange.includes(col)
      ? data[col].toLocaleString("es-MX", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      : "-";
  } else {
    return data[col].toLocaleString("es-MX", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
};

const reset = () => {
  dropzoneFile.value = "";
  errorTypeDocument.value = false;
  finishedProcess.value = false;
  loadingData.value = false;
  globalError.value = false;
  wrongData.value = false;
  scrollTop();
};

/* Grouped errors */
/* const groupedErrorsRef = ref<
  {
    estado: string;
    errors: {
      red: any;
      errors: { red: any; campo: string }[];
    }[];
  }[]
>([]); */
const dropZoneStyle = computed(() => {
  return {
    pointerEvents:
      finishedProcess.value || loadingData.value || errorTypeDocument.value
        ? "none"
        : "auto",
    opacity:
      finishedProcess.value || loadingData.value || errorTypeDocument.value
        ? "0.5"
        : "1",
  };
});

const drop = async (e: any, type: string) => {
  dropzoneFile.value =
    type === "drop" ? e.dataTransfer.files[0] : e.target.files[0];

  const isSpreadsheet =
    dropzoneFile.value.type ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
    dropzoneFile.value.type === "application/vnd.ms-excel" || // xls
    dropzoneFile.value.type === "text/csv" || // csv
    dropzoneFile.value.type ===
      "application/vnd.oasis.opendocument.spreadsheet"; // ods

  if (!isSpreadsheet) {
    errorTypeDocument.value = true;
    finishedProcess.value = false;
    return;
  }

  errorTypeDocument.value = false;
  loadingData.value = true;

  const formData = new FormData();
  formData.append("archivo", dropzoneFile.value);
  formData.append("tipo_archivo", "cartera_proyectos_de_inversion");

  const token = localStorage.getItem("token");

  try {
    const response = await fetch(`${import.meta.env.VITE_API}carga_archivo/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response) return;

    console.log("Responso: ", response);

    const json = await response.json();

    console.log("Json: ", json);
    if (response.status === 201 && json.errors.length > 0) {
      /* groupedErrorsRef.value = getErrors(json.errores_celdas);
      selectedEstadoError.value = groupedErrorsRef.value[0]?.estado || ""; */
      wrongData.value = true;
      getErrosByState.value = json.errors[0].error_validacion_datos;
      headerErrors.value = json.errors[0].error_validacion_cabeceras;

      return;
    } else if (
      response.status === 201 &&
      json.errors.length === 0 &&
      json.json_contenido
    ) {
      console.log("Json.json_contenido: ", json.json_contenido);
      DataResponseRef.value = json.json_contenido;
      jsonData.value = json;
      /*groupedDataRef.value = getData(json.data);
      selectedEstadoData.value = groupedDataRef.value[0]?.estado || "";
      typeDocument.value = json.documento_cargado; */
      return;
    } else {
      globalError.value = true;
    }
  } catch (error) {
    globalError.value = true;
  } finally {
    finishedProcess.value = true;
    loadingData.value = false;
  }
};

const sendData = async () => {
  createData({
    json_contenido: jsonData.value.json_contenido,
    json_contenido_valido: jsonData.value.json_contenido,
    carga_archivo: jsonData.value.carga_archivo,
  }).then(() => {
    router.push({ name: "listar-proyecto_de_inversion" });
  });
};

onMounted(async () => {
  // Realizar las llamadas a las funciones getDatas en el bloque onMounted
  getDatasPrioridad({ page: 1, size: 100 });
  getDatasFactibilidad({ page: 1, size: 100 });
  getDatasArea({ page: 1, size: 100 });
  getDatasProyecto({ page: 1, size: 100 });
  getDatasEstatus({ page: 1, size: 100 });
  getDatasEntidadFederativa({ page: 1, size: 100 });
  getDatasUnidadResponsable({ page: 1, size: 100 });
  getDatasFase({ page: 1, size: 100 });
  getDatasTipoObra({ page: 1, size: 100 });
  scrollTop();
});
</script>

<style scoped lang="scss">
@media (max-width: 768px) {
  .margin-head {
    margin-top: 18rem;
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
}

.table-semi-important {
  background-color: #f2f2f2;
  color: #000;
}

.form-control {
  width: 100px;
  text-align: center;
}
.header-cell {
  max-width: 150px;
  white-space: wrap; /* Evitar que el texto se divida en varias líneas */
  overflow: auto; /* Ocultar cualquier exceso de texto que no quepa */
  text-overflow: ellipsis; /* Mostrar puntos suspensivos (...) si el texto no cabe */
}
.custom-icon {
  font-size: 30px; /* Modifica el tamaño del icono */
  margin-left: 50%; /* Modifica la posición horizontal del icono */
  color: #9d2449;
}
.custom-icon:hover {
  cursor: pointer;
}
</style>
