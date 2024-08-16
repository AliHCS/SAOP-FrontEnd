<template>
  <div class="margin-head">
    <div class="row">
      <div class="col-12 col-sm-6">
        <h4 style="margin-left: 15px">Carga masiva de datos de trabajos</h4>
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
            <th v-for="col in columnsTrabajo" class="text-center header-cell">
              {{ col.title }}
            </th>
          </tr>
        </thead>
        <tbody>
          <template v-for="DataTrabajo in DataResponseRef">
            <tr>
              <template v-for="col in columnsTrabajo">
                <td class="table-important">
                  <!-- showInput(value.clasificacion, col.data) -->
                  <template
                    v-if="
                      true &&
                      col.data !== 'total' &&
                      col.data !== 'clasificacion'
                    "
                  >
                    <input
                      class="form-control"
                      type="text"
                      maxlength="15"
                      disabled
                      v-model="DataTrabajo[col.data]"
                      @copy="$event.preventDefault()"
                      @paste="$event.preventDefault()"
                      @cut="$event.preventDefault()"
                    />
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
      :headerErrors="headerErrors"
      :getErrosByState="getErrosByState"
    ></AlertSection>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import DropZone from "@/components/DropZone.vue";
import Modal from "@/components/Modals.vue";
import AlertSection from "@/components/AlertBulkData.vue";
import PaginationTable from "@/components/TableInputs/Pagination.vue";
import { scrollTop } from "@/utils/helpers/scrollHelper";
import usePetition from "@/composables/usePetition";
import router from "@/router";
import { downloadTemplateDoc } from "@/utils/helpers/exportFileHelper";

const { createData } = usePetition("control_carga/");

const docName = "Carga_Trabajos.xlsx";
const dropzoneFile = ref<any>("");
const errorTypeDocument = ref<boolean>(false);
const finishedProcess = ref(false);
const loadingData = ref(false);
const globalError = ref(false);
const wrongData = ref(false);
const getErrosByState = ref();
const headerErrors = ref();

const columnsTrabajo = [
  { data: "descripcion", title: "Descripcion Trabajo" },
  { data: "ubicacion", title: "Ubicación" },
  { data: "meta", title: "Meta" },
  { data: "periodo", title: "Periodo" },
  { data: "fecha_obra", title: "FechaObra" },
  { data: "actividad_prioritaria", title: "Actividad Prioritaria" },
  { data: "observaciones", title: "Observaciones" },
  { data: "tipo_contratacion", title: "Tipo Contratacion" },
  { data: "presupuesto_egresos_federacion", title: "PEF" },
  { data: "cartera_proyecto_inversion", title: "Cartera Proyecto Inversion" },
  { data: "numero_obra", title: "Numero Obra" },
  { data: "aplica_ruta_tramo_subtramo", title: "Ruta" },
  { data: "estatus_trabajo", title: "Estatus Trabajo" },
  { data: "pais", title: "Pais" },
  { data: "entidad_federativa", title: "Entidad Federativa" },
  { data: "departamento", title: "Departamento" },
  { data: "tipo_trabajo", title: "Tipo Trabajo" },
  { data: "tipo_subtrabajo", title: "Tipo Sub-Trabajo" },
  /*  { data: "iIdTrabajos", title: "IdTrabajos" },
  { data: "lRequisitos", title: "Requisitos" },
  { data: "lDerechoVia", title: "DerechoVia" },
  { data: "lImpactoAmbiental", title: "ImpactoAmbiental" },
  { data: "lINAH", title: "INAH" },
  { data: "lCostoBeneficio", title: "CostoBeneficio" },
  { data: "lProyectoEjecutivo", title: "ProyectoEjecutivo" },
  { data: "dkminicial", title: "KmInicial" },
  { data: "dkmfinal", title: "KmFinal" },
  { data: "iVelocpy", title: "Velocpy" },
  { data: "cCurvatura", title: "Curvatura" },
  { data: "dPendiente", title: "Pendiente" },
  { data: "cCorona", title: "Corona" },
  { data: "cEspSubyacente", title: "EspSubyacente" },
  { data: "cEspSubrasante", title: "EspSubrasante" },
  { data: "cEspsubbase", title: "Espsubbase" },
  { data: "cEspbase", title: "Espbase" },
  { data: "cEspCarpeta", title: "EspCarpeta" },
  { data: "cRiegoSello", title: "RiegoSello" },
  { data: "iNumPuentes", title: "NumPuentes" },
  { data: "iNumPasos", title: "NumPasos" },
  { data: "iNEntronque", title: "NEntronque" },
  { data: "iNumCasetas", title: "NumCasetas" },
  { data: "ipoblacion", title: "Poblacion" },
  { data: "cClave", title: "Clave" },
  { data: "cTpda", title: "Tpda" },
  { data: "ianioproy", title: "AnioProy" },
  { data: "cEjecproy", title: "EjecProy" },
  { data: "dCobproyini", title: "CobProyIni" },
  { data: "dCobproyfin", title: "CobProyFin" },
  { data: "cDerechoVia", title: "DerechoVia" },
  { data: "cCalzada", title: "Calzada" },
  { data: "iAhorroTiempo", title: "AhorroTiempo" },
  { data: "iAhorroDistancia", title: "AhorroDistancia" },
  { data: "iIdTerreno", title: "IdTerreno" },
  { data: "iIdCarpeta", title: "IdCarpeta" },
  { data: "iidtramo", title: "IdTramo" },
  { data: "iidsubtramo", title: "IdSubtramo" },
  { data: "iIdUnidad", title: "IdUnidad" },
  { data: "lruta", title: "Ruta" },
  { data: "lsecas", title: "Secas" },
  { data: "lotros", title: "Otros" },
  { data: "cDscOtros", title: "DscOtros" },
  { data: "iIdProceso", title: "IdProceso" },
  { data: "iIdModulo", title: "IdModulo" },
  { data: "iIdUr", title: "IdUr" },
  { data: "iIdResidencia", title: "IdResidencia" }, */
];

const DataResponseRef = ref<{ [key: string]: any }[]>([]);

const itemsPerPage = ref(7);
const inicio = ref(0);
const jsonData = ref<any>(null);

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

const reset = () => {
  dropzoneFile.value = "";
  errorTypeDocument.value = false;
  finishedProcess.value = false;
  loadingData.value = false;
  globalError.value = false;
  wrongData.value = false;
  scrollTop();
};

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
  formData.append("tipo_archivo", "trabajo");

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

    const json = await response.json();

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
    router.push({ name: "listar-trabajos" });
  });
};

onMounted(async () => {
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
  width: fit-content;
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
