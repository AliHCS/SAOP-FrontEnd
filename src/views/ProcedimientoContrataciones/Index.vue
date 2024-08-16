<template>
  <div>
    <h4 class="view-name">
      {{ viewName }}
      <!-- <span v-if="selectedProyect"> - {{ selectedProyect }}</span> -->
    </h4>
    <hr class="red" />
    <ul class="nav nav-tabs" id="myTab" role="tablist">
      <li class="nav-item" role="presentation">
        <button
          class="nav-link active"
          id="dg-tab"
          data-bs-toggle="tab"
          data-bs-target="#dg"
          type="button"
          role="tab"
          aria-controls="dg"
          aria-selected="true"
          @click="currentTab = tabDatosGenerales"
        >
          {{ tabDatosGenerales }}
        </button>
      </li>
      <li class="nav-item">
        <button
          class="nav-link"
          id="ayg-tab"
          data-bs-toggle="tab"
          data-bs-target="#ayg"
          type="button"
          role="tab"
          :disabled="!idRow"
          aria-controls="ayg"
          aria-selected="true"
          @click="currentTab = tabAnticipos"
        >
          {{ tabAnticipos }}
        </button>
      </li>
      <li class="nav-item">
        <button
          :disabled="idRow === ''"
          class="nav-link"
          id="cdp-tab"
          data-bs-toggle="tab"
          data-bs-target="#cdp"
          type="button"
          role="tab"
          aria-controls="cdp"
          aria-selected="true"
          @click="currentTab = tabCaracteristicas"
        >
          {{ tabCaracteristicas }}
        </button>
      </li>
      <li class="nav-item">
        <button
          class="nav-link"
          :disabled="!idRow"
          id="oficioLiberacion-tab"
          data-bs-toggle="tab"
          data-bs-target="#oficioLiberacion"
          type="button"
          role="tab"
          aria-controls="oficioLiberacion"
          @click="handleOficioLiberacion()"
        >
          {{ tabLiberacion }}
        </button>
      </li>
      <li class="nav-item">
        <button
          class="nav-link"
          id="excep-tab"
          data-bs-toggle="tab"
          data-bs-target="#excep"
          type="button"
          role="tab"
          aria-controls="excep"
          aria-selected="true"
          @click="currentTab = tabExcepciones"
        >
          {{ tabExcepciones }}
        </button>
      </li>
    </ul>
    <div class="tab-content" id="myTabContent">
      <div
        class="tab-pane fade show active"
        id="dg"
        role="tabpanel"
        aria-labelledby="dg-tab"
      >
        <div>
          <div class="row app-options-bar">
            <div
              class="d-flex align-items-center buttons-component align-items-center"
            >
              <div class="col-md-8">
                <ButtonBarComponent
                  @onCreate="create()"
                  :show-subactions="false"
                />
              </div>
              <AccionesProcedimientoContrataciones
                v-if="idRow !== ''"
                @asignaE7="handleAsignarE7"
                @publicacion="handlePublicacion()"
                @ubicacion="handleUbicacionConvocante"
                @participantes="handleParticipantes"
                @documentacion="handleDocumentos"
                @eventos="handleEventos"
                :disabledParticipantes="isNaN(rowData.consecutivo_e7)"
              />
            </div>
          </div>
          <div class="d-flex px-2 justify-content-end">
            <div class="pr-3" style="font-size: 30px">
              <i v-if="!tipoProcedimiento" class="bi bi-funnel-fill"></i>
              <i
                v-else
                class="bi bi-x clickable"
                @click="tipoProcedimiento = ''"
              ></i>
            </div>
            <div class="pb-4 pt-2">
              <select
                v-model="tipoProcedimiento"
                class="form-select form-control"
              >
                <option value="">Tipo de procedimiento...</option>
                <option
                  v-for="tp in arrayDataTipoProced.data"
                  :key="tp.id"
                  :value="tp.id"
                >
                  {{ tp.descripcion_tipo_procedimiento }}
                </option>
              </select>
            </div>
          </div>
          <DataTableComponent
            v-if="!loading"
            rowId="folio"
            prefix="pc"
            hideActions
            :columns="columns"
            :data="arrayData.data"
            :pagination="arrayData.pagination"
            :showDelete="true"
            :showEdit="true"
            :showDetail="true"
            :row-select="true"
            :fixed-actions="true"
            @onPaginate="handlePaginate"
            @onEdit="handleEdit"
            @onDetail="handleDetail"
            @onDelete="handleDelete"
            @onCreate="handleEdit"
            @onGetID="handleRowClick"
          />
        </div>
      </div>
      <div
        class="tab-pane fade"
        id="ayg"
        role="tabpanel"
        aria-labelledby="ayg-tab"
      >
        <div>
          <AnticiposGarantias :procedimiento="idRow" />
        </div>
      </div>
      <!-- Caracteristicas del Procedimiento -->
      <div
        class="tab-pane fade"
        id="cdp"
        role="tabpanel"
        aria-labelledby="cdp-tab"
      >
        <h4 class="view-name">
          {{ currentTab }}
          <!-- <span v-if="selectedProyect"> - {{ selectedProyect }}</span> -->
        </h4>
        <CaracteristicasProcedimento
          v-if="currentTab === tabCaracteristicas"
          @returnDatosGenerales="goToTab('dg')"
        />
      </div>
      <div
        class="tab-pane fade"
        id="oficioLiberacion"
        role="tabpanel"
        aria-labelledby="oficioLiberacion-tab"
      >
        <OficioLiberacion
          key="oficioLiberacionForm"
          v-if="datosOficioLiberacion && !loadingLiberacion"
          :idRow="idRow"
          :datosOficioLiberacion="datosOficioLiberacion"
          :loading="loadingLiberacion"
        />
      </div>
    </div>
    <Modal
      v-if="modal"
      :title="`${isEditing ? 'Editar' : 'Agregar'} ${currentTab.toLowerCase()}`"
      saveButtonTitle="Aceptar"
      hideActions
      openButtonTittle="Crear"
      @onCloseModal="closeModalDatos()"
      size-modal="xl"
    >
      <DatosGeneralesForm @closeModal="closeModalDatos" />
    </Modal>
    <Modal
      v-if="modalPublicacion"
      :title="`Publicacion ${selectedProyect}`"
      saveButtonTitle="Aceptar"
      hideActions
      openButtonTittle="Crear"
      @onCloseModal="closeModalPublicacion()"
      size-modal="xl"
    >
      <PublicacionForm @closeModal="closeModalPublicacion" />
    </Modal>
    <Modal
      v-if="modalDocumentos"
      :title="`Documentos`"
      saveButtonTitle="Aceptar"
      hideActions
      openButtonTittle="Crear"
      @onCloseModal="closeModalDocumentos()"
      size-modal="xl"
    >
      <Documentos @closeModal="closeModalDocumentos" />
    </Modal>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, onBeforeUnmount, watch } from "vue";
import usePetition from "@/composables/usePetition";
import DataTableComponent from "@/components/DataTableComponent.vue";
import router from "@/router";
import AccionesProcedimientoContrataciones from "@/components/AccionesProcedimientoContrataciones.vue";
import ButtonBarComponent from "@/components/ButtonBarComponent.vue";
import Modal from "@/components/ModalWithoutButton.vue";
import { removeClickListener } from "@/utils/listeners/clickListener";
import DatosGeneralesForm from "@/components/forms/DatosGenerales.vue";
import CaracteristicasProcedimento from "@/components/forms/CaracteristicasProcedimento.vue";
import PublicacionForm from "@/components/forms/PublicacionProcedimientoContratacion.vue";
import { useProcesoContratacionStore } from "@/store/procesoContratacionStore";
import Documentos from "@/components/ProcedimientoContratacion/Documentos.vue";
import OficioLiberacion from "@/components/forms/OficioLiberacion.vue";
import { IOficioLiberacionData } from "@/utils/models/oficioLiberacionModel";
import AnticiposGarantias from "@/components/ProcedimientoContratacion/AnticiposGarantias.vue";
import { HTTP_METHODS } from "@/utils/constants/methodsPetitions";

const viewName = "Procedimiento de contrataciones";

const { arrayData, getDatas, searchData } = usePetition(
  "procedimiento_contratacion/"
);
const { arrayData: arrayDataTipoProced } = usePetition(
  "cat_tipo_procedimiento/"
);
const { getDatas: getDatasTP} =
  usePetition("trabajo_previo/");
const procesoContratacionStore = useProcesoContratacionStore();

const idRow = ref("");
const rowData:any = ref({});
const loading = ref(true);
const selectedProyect = ref("");

const tipoProcedimiento = ref("");
const arrayDataCopy: any = ref({});
const modal = ref(false);
const modalPublicacion = ref(false);
const modalDocumentos = ref(false);
const isEditing = ref(false);
const tabDatosGenerales = ref("Datos generales");
const tabAnticipos = ref("Anticipos y garantías");
const tabCaracteristicas = ref("Caracteristicas del procedimiento");
const tabLiberacion = ref("Oficio de liberación");
const tabExcepciones = ref("Excepciones");
const currentTab = ref(tabDatosGenerales.value);
const datosOficioLiberacion = ref<IOficioLiberacionData>();
const loadingLiberacion = ref(false);

const handleOficioLiberacion = async () => {
  loadingLiberacion.value = true;
  currentTab.value = tabLiberacion.value;
  let { customPetition: getDataDatosOficio } = usePetition(
    `procedimiento_contratacion/`
  );
  const response = await getDataDatosOficio(
    HTTP_METHODS.GET,
    undefined,
    `${idRow.value}/oficio_liberacion/`
  );
  datosOficioLiberacion.value = JSON.parse(JSON.stringify(response));
  loadingLiberacion.value = false;
};

const handleEdit = (data: any) =>
  router.push({ name: "editar-proyecto_de_inversion", params: { id: data } });
const handleDetail = (data: any) =>
  router.push({ name: "ver-proyecto_de_inversion", params: { id: data } });
const handleDelete = (data: any) =>
  router.push({ name: "eliminar-proyecto_de_inversion", params: { id: data } });
/* const handleFichaTecnica = () => router.push({ name: 'ficha_tecnica-proyecto_de_inversion', params: { id: idRow.value } }
) */

/* const someAction = () => {
  console.log("action");
}; */

const goToTab = (tabId: string) => {
  currentTab.value = tabId;
  const tabButton = document.querySelector(`[data-bs-target="#${tabId}"]`);
  if (tabButton) {
    (tabButton as HTMLButtonElement).click();
  }
};

const handleRowClick = (row: any) => {
  if (idRow.value === row.id) {
    rowData.value = row
    idRow.value = "";
    selectedProyect.value = "";
    procesoContratacionStore.resetSelectedRowData();
    // Remover la clase de selección si ya estaba seleccionada
    const selected = document.querySelector(".selectedRow");
    if (selected) {
      selected.classList.remove("selectedRow");
    }
  } else {
    procesoContratacionStore.setSelectedRowData(row);
    idRow.value = row.id.toString();
    rowData.value = row
    selectedProyect.value = row.folio;
    // Agregar la clase de selección
    const selected = document.querySelector(`[data-row-id="${row.id}"]`);
    if (selected) {
      selected.classList.add("selectedRow");
    }
  }
};

const handleClick = (event?: MouseEvent) => {
  //solo aplica si se esta en la pantalla de datatable
  const homeTab = document.getElementById("home");
  if (homeTab && !homeTab.classList.contains("show")) {
    return;
  }
  // Verificar si el clic proviene del componente DataTable
  const isDataTableClick =
    (event?.target as HTMLElement).closest(".datatable") !== null ||
    (event?.target as HTMLElement).closest(".nav-item") !== null;
  if (isDataTableClick) {
    return;
  }
  const selected = document.querySelector(".selectedRow");
  if (selected) {
    selected.classList.remove("selectedRow");
    idRow.value = "";
    selectedProyect.value = "";
  }
};

const closeModalDatos = (reload: boolean = false) => {
  if (reload) decorateData();
  arrayData.value = JSON.parse(JSON.stringify(arrayDataCopy.value));
  modal.value = false;
};

const closeModalPublicacion = () => {
  modalPublicacion.value = false;
};
const closeModalDocumentos = () => {
  modalDocumentos.value = false;
  idRow.value = "";
  selectedProyect.value = "";
  procesoContratacionStore.resetSelectedRowData();
  decorateData();

  /* window.location.reload(); */
};
const handleUbicacionConvocante = () => {
  router.push({
    name: "listar-ubicacion_convocante",
    params: { idProceso: idRow.value },
  });
};
const handleAsignarE7 = () => {
  router.push({
    name: "procedimiento-contrataciones-asignarE7",
    params: { idProceso: idRow.value },
  });
};
const handleParticipantes = () => {
  router.push({
    name: "listar-registro-participantes",
    params: { idProceso: idRow.value },
  });
};
const handlePaginate = (page: number) => {
  if (tipoProcedimiento.value) {
    decorateData(page, true);
  } else {
    decorateData(page);
  }
};
const handleEventos = () => {
  const registro = procesoContratacionStore.getSelectedRowData;
  console.log(registro.estatus_procedimiento)
  router.push({
    name: "procedimiento-contrataciones-eventos",
    params: { idProceso: idRow.value },
  });
};

const create = () => {
  arrayDataCopy.value = JSON.parse(JSON.stringify(arrayData.value));
  modal.value = true;
};

const handlePublicacion = () => {
  modalPublicacion.value = true;
};
const handleDocumentos = () => {
  modalDocumentos.value = true;
};

const columns = [
  /* { title: 'Entidad', data: 'entidad_federativa', align: 'left' }, */
  { title: "Entidad", data: "lugar_inscripcion", align: "left" },
  { title: "Área", data: "area", align: "left" },
  { title: "Folio", data: "id", align: "left" },
  { title: "No. Procedimiento", data: "folio", align: "left" },
  { title: "Descripción procedimiento", data: "descripcion", align: "left" },
  { title: "Trabajo", data: "trabajo", align: "left" },
  { title: "Tipo procedimiento", data: "tipo_procedimiento", align: "left" },
  { title: "Tipo contratación", data: "tipo_contratacion", align: "left" },
  {
    title: "Estatus procedimiento",
    data: "estatus_procedimiento",
    align: "left",
  },
  { title: "Subestatus", data: "subestatus_procedimiento", align: "left" },
  {
    title: "Carácter procedimiento",
    data: "caracter_procedimiento",
    align: "left",
  },
  { title: "Consecutivo E7", data: "consecutivo_e7", align: "left" },
  { title: "Fecha inicio", data: "fecha_inicio", align: "left" },
  { title: "Fecha fin", data: "fecha_fin", align: "left" },
];

watch(
  () => tipoProcedimiento,
  () => {
    decorateData(1, true);
  },
  {
    deep: true,
  }
);

const decorateData = (page: Number = 1, search: Boolean = false) => {
  loading.value = true;
  let promises = [];
  search
    ? promises.push(searchData({ page, search: tipoProcedimiento.value }))
    : promises.push(getDatas({ page }));
  Promise.all(promises)
    .then(() => {
      arrayData.value.data.forEach((item: any) => {
        item.area = item.area.nombre;
        item.trabajo = item.trabajo.descripcion;
        item.tipo_contratacion =
          item.tipo_contratacion.descripcion_contratacion;
        item.tipo_procedimiento =
          item.tipo_procedimiento.descripcion_tipo_procedimiento;
        item.subestatus_procedimiento = item.subestatus.descripcion_subestatus;
        item.estatus_procedimiento = item.estatus_procedimiento.descripcion;
        item.caracter_procedimiento =
          item.caracter_procedimiento.descripcion_caracter_procedimiento;
        item.consecutivo_e7 = item.consecutivo_e7 && item.consecutivo_e7.consecutivo
          ? item.consecutivo_e7.consecutivo
          : "-";
      });
    })
    .finally(() => (loading.value = false));
};

onMounted(async () => {
  await Promise.all([getDatasTP({ page: 1, size: 100 })]);
  decorateData();
});
onBeforeUnmount(() => {
  removeClickListener(handleClick);
});
</script>
