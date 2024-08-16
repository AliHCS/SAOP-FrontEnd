<template>
  <div>
    <h4 class="view-name">{{ viewName }}</h4>
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
          @click="renderPorcentajeIndirectos = false"
        >
          Datos generales
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          :disabled="idRow === ''"
          class="nav-link"
          id="pip-tab"
          data-bs-toggle="tab"
          data-bs-target="#pip"
          type="button"
          role="tab"
          aria-controls="pip"
          aria-selected="true"
          @click="renderPorcentajeIndirectos = true"
        >
          Porcentaje de indirectos y puntuación
        </button>
      </li>
    </ul>
    <div v-if="showView" class="tab-content" id="myTabContent">
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
                  @onCreate="handleCreate()"
                  @onCustom="
                    router.push({ name: 'listar-procedimiento-contrataciones' })
                  "
                  showCustomButton
                  customLabel="Regresar"
                  :show-subactions="false"
                />
              </div>
              <AccionesParticipantes v-if="idRow"
                @registroPropuestas="handlePropuestas"
              />
            </div>
          </div>
          <DataTableComponent
            v-if="!arrayData.loading"
            rowId="id"
            prefix="pc"
            :columns="columns"
            :data="arrayData.data"
            :pagination="arrayData.pagination"
            showDelete
            hidePagination
            showEdit
            :row-select="true"
            :fixed-actions="true"
            @onPaginate="handlePaginate"
            @onEdit="handleEdit"
            @onDelete="handleDelete"
            @onCreate=""
            @onGetID="handleRowClick"
          />
        </div>
      </div>
      <div
        class="tab-pane fade"
        id="pip"
        role="tabpanel"
        aria-labelledby="pip-tab"
      >
        <div>
          <h4 class="view-name">Porcentaje de indirectos</h4>
        </div>
      </div>
    </div>
    <Modal
      v-if="modalParticipante"
      :title="`Participante`"
      saveButtonTitle="Aceptar"
      hideActions
      openButtonTittle="Crear"
      @onCloseModal="modalParticipante = false"
      size-modal="xl"
    >
      <RegistroParticipante
        :procedimiento="procedimiento"
        :subestatus="subestatus"
        :participante="participante"
        @save="refreshData()"
        @closeModal="modalParticipante = false"
      />
    </Modal>
    <div v-if="renderPorcentajeIndirectos === true">
      <PorcentajeDeIndirectos
        v-if="renderPorcentajeIndirectos === true"
        @returnDatosGenerales="goToTab('dg')"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import usePetition from "@/composables/usePetition";
import DataTableComponent from "@/components/DataTableComponent.vue";
import { useRoute } from "vue-router";
import router from "@/router";
import Modal from "@/components/ModalWithoutButton.vue";
import RegistroParticipante from "@/components/ProcedimientoContratacion/RegistroParticipante.vue";
import ButtonBarComponent from "@/components/ButtonBarComponent.vue";
import PorcentajeDeIndirectos from "@/components/forms/PorcentajeDeIndirectos.vue";
import { useParticipantesLicitacionStore } from "@/store/participantesLicitacionsStore";
import AccionesParticipantes from "@/components/AccionesParticipantes.vue";

const route = useRoute();

const viewName = "Registro de participantes para la licitación";
const { arrayData, getDatas, searchData, getData } = usePetition(
  "registro_participante/"
);
const { getData: getDataPC } = usePetition("procedimiento_contratacion/");
const { getData: getDataSE } = usePetition("cat_subestatus/");
const { getDatas: getDatasProveedores, arrayData: arrayProveedores } =
  usePetition("cat_proveedor/");

const modalParticipante = ref(false);
const procedimiento: any = ref({});
const participante: any = ref({});
const subestatus: any = ref({});
const searchText = ref<string>("");
const showView = ref(false);
const idRow = ref("");
const renderPorcentajeIndirectos = ref(false);
const participanteLicitacion = useParticipantesLicitacionStore();

const columns = [
  { title: "Folio", data: "procedimiento_contratacion", align: "center" },
  { title: "Contratista", data: "proveedor", align: "left" },
  { title: "RFC Nombre", data: "nombre", align: "left" },
  { title: "Comentarios", data: "comentarios", align: "left" },
  { title: "Lugar de inscripción", data: "lugar_inscripcion", align: "left" },
  { title: "Fecha inscripción", data: "fecha_inscripcion", align: "left" },
  { title: "Hora inscripción", data: "hora_inscripcion", align: "left" },
];

const goToTab = (tabId: string) => {
  const tabButton = document.querySelector(`[data-bs-target="#${tabId}"]`);
  if (tabButton) {
    (tabButton as HTMLButtonElement).click();
  }
};

const handlePaginate = (page: number) => {
  showView.value = false;
  if (searchText.value) {
    searchData({ search: searchText.value, page })
      .then(() => decorateData())
      .finally(() => (showView.value = true));
  } else {
    getDatas({ page })
      .then(() => decorateData())
      .finally(() => (showView.value = true));
  }
};

const handleRowClick = (rowData: any) => {
  if (idRow.value === rowData.id) {
    idRow.value = "";
    /*  selectedProyect.value = "";
    procesoContratacionStore.resetSelectedRowData(); */
    participanteLicitacion.resetSelectedRowData();
    // Remover la clase de selección si ya estaba seleccionada
    const selected = document.querySelector(".selectedRow");
    if (selected) {
      selected.classList.remove("selectedRow");
    }
  } else {
    /* procesoContratacionStore.setSelectedRowData(rowData); */
    participanteLicitacion.setSelectedRowData(rowData);
    idRow.value = rowData.id;
    /* selectedProyect.value = rowData.folio; */
    // Agregar la clase de selección
    const selected = document.querySelector(`[data-row-id="${rowData.id}"]`);
    if (selected) {
      selected.classList.add("selectedRow");
    }
  }
};

const handlePropuestas = () => {
  router.push({
    name: "listar-registro-propuestas",
    params: { idProceso: route.params.idProceso.toString(), idParticipante: idRow.value },
  });
};

const handleCreate = () => {
  participante.value = {};
  modalParticipante.value = true;
};

const handleEdit = (participanteId: string) => {
  showView.value = false;
  getData(participanteId).then((res) => {
    const proveedor = arrayProveedores.value.data.find(
      (p: any) => p.id === res.proveedor
    );
    participante.value = res;
    participante.value.proveedor = proveedor
      ? { id: proveedor.id, nombre: proveedor.nombre }
      : "-";
    showView.value = true;
    modalParticipante.value = true;
  });
};

const handleDelete = (data: any) =>
  router.push({
    name: "eliminar-registro-participantes",
    params: { idProceso: data },
  });

const decorateData = () => {
  showView.value = false;
  let dataAux = [...arrayData.value.data]
  arrayData.value.data.forEach((el: any) => {
    if (el.procedimiento_contratacion !== Number(route.params.idProceso)) {
      const index = dataAux.indexOf(el)      
      dataAux.splice(index, 1)
    } else {
      const prov = arrayProveedores.value.data.find(
        (p: any) => p.id === el.proveedor
      );
      el.nombre = prov ? `${prov.rfc} ${prov.nombre}` : "-";
    }
  });
  arrayData.value.data = dataAux
  showView.value = true;
};

const refreshData = () => {
  showView.value = false;
  modalParticipante.value = false;
  getDatas({ page: 1 }).then(() => {
    decorateData();
  });
};

onMounted(async () => {
  await getDatasProveedores({ page: 1 });
  getDataPC(route.params.idProceso.toString()).then((res) => {
    procedimiento.value = res;
    getDataSE(res.subestatus.clave).then((se) => {
      subestatus.value = se;
    });
  });
  getDatas({ page: 1 }).then(() => {
    decorateData();
  });
});
</script>
<style lang="scss" scoped></style>
