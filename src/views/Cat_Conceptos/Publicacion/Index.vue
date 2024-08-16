<template>
  <div>
    <div v-if="showView">
      <h4 class="view-name">
        {{ viewName }}
        <span v-if="selectedProyect"> - {{ selectedProyect }}</span>
      </h4>
      <hr class="red" />
      <div class="row app-options-bar">
        <div
          class="d-flex align-items-center buttons-component align-items-center"
        >
          <div class="col-md-8">
            <ButtonBarComponent
              @onCreate="handleCreate"
              :show-subactions="false"
            />
          </div>
        </div>
      </div>
      <div class="d-flex px-2">
        <div class="pr-3 col-md-1" style="font-size: 30px">
          <i class="px-2 bi bi-funnel-fill"></i>
        </div>
        <div class="px-3" style="min-width: 210px !important">
          <select
            class="form-select form-control"
            v-model="cbEntidad"
            @change="handleFilter()"
          >
            <option selected value="">Entidad</option>
            <option
              v-for="opt in arrayDataEntidadFederativa.data"
              :key="opt.value"
              :value="opt.descripcion_corta"
            >
              {{ opt.descripcion_corta }}
            </option>
          </select>
        </div>
        <div class="px-3" style="min-width: 210px !important">
          <select
            class="form-select form-control"
            v-model="cbUnidad"
            @change="handleFilter()"
          >
            <option value="">Unidad reponsable</option>
            <option
              v-for="opt in arrayDataUnidadResponsable.data"
              :key="opt.value"
              :value="opt.clave"
            >
              {{ opt.descripcion_corta }}
            </option>
          </select>
        </div>
        <div class="flex-grow-1 d-flex justify-content-end">
          <div class="form-group">
            <div class="d-flex align-items-center form-group m-0">
              <div>
                <span class="font-weight-bold pr-2">No. Solicitud: </span>
              </div>
              <div>
                <input
                  class="form-control w-auto"
                  placeholder="Buscar..."
                  type="text"
                  v-model="inputSolicitud"
                  @keyup.enter="handleFilter()"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <DataTableComponent
        v-if="!arrayData.loading"
        rowId="clave"
        :columns="columns"
        :data="arrayData.data"
        :pagination="arrayData.pagination"
        :showDelete="true"
        :showEdit="true"
        :row-select="true"
        :fixed-actions="true"
        @onPaginate="handlePaginate"
        @onEdit="handleEdit"
        @onDelete="handleDelete"
        @onCreate="handleCreate"
        @onGetID="handleRowClick"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, onBeforeUnmount } from "vue";
import usePetition from "@/composables/usePetition";
import DataTableComponent from "@/components/DataTableComponent.vue";
import router from "@/router";
import ButtonBarComponent from "@/components/ButtonBarComponent.vue";
import {
  addClickListener,
  removeClickListener,
} from "@/utils/listeners/clickListener";

const viewName = "Conceptos de Obra";
const { arrayData, getDatas, searchData } = usePetition(
  "cartera_proyectos_inversion/"
);
const searchTerm = ref("");
const idRow = ref("");
const selectedProyect = ref("");
const showView = ref(false);
const handleCreate = () => router.push({ name: "crear-proyecto_de_inversion" });
const handleEdit = (data: any) =>
  router.push({ name: "editar-proyecto_de_inversion", params: { id: data } });
const handleDelete = (data: any) =>
  router.push({ name: "eliminar-proyecto_de_inversion", params: { id: data } });

const handleRowClick = (rowData: any) => {
  // Obtén el ID del registro seleccionado
  // Realiza las operaciones necesarias con el ID del registro seleccionado
  idRow.value = rowData.clave;
  selectedProyect.value = rowData.nombre;
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
const {
  arrayData: arrayDataEntidadFederativa,
  getDatas: getDatasEntidadFederativa,
} = usePetition("cat_entidad_federativa/");
const {
  arrayData: arrayDataUnidadResponsable,
  getDatas: getDatasUnidadResponsable,
} = usePetition("cat_unidad_responsable/");

const handlePaginate = (page: number) => {
  if (searchTerm.value) {
    searchData({ page: page, search: searchTerm.value });
  } else {
    getDatas({ page });
  }
};

const handleFilter = () => {
  let searchFilter = "";
  if (cbEntidad.value.length) searchFilter += cbEntidad.value;
  if (cbUnidad.value.length) {
    if (searchFilter.length) searchFilter += " ,";
    searchFilter += cbEntidad.value;
  }
  if (inputSolicitud.value.length) {
    if (searchFilter.length) searchFilter += " ,";
    searchFilter += inputSolicitud.value;
  }
  searchData({ page: 1, search: searchFilter });
};

const cbEntidad = ref<string>("");
const cbUnidad = ref<string>("");
const inputSolicitud = ref<string>("");
const columns = [
  { title: "Clave Cartera", data: "clave", align: "left" },
  { title: "No. de Solicitud", data: "no_solicitud", align: "left" },
  { title: "Unidad Responsable", data: "unidad_responsable", align: "left" },
  { title: "Nombre Proyecto", data: "nombre", align: "left" },
  { title: "Descripción del proyecto", data: "descripcion", align: "left" },
];

onMounted(async () => {
  await getDatas({ page: 1 }).then(() => {
    showView.value = true;
  });
  getDatasEntidadFederativa({ page: 1, size: 100 });
  getDatasUnidadResponsable({ page: 1, size: 100 });
  addClickListener(handleClick);
});
onBeforeUnmount(() => {
  removeClickListener(handleClick);
});
</script>
