<template>
  <h4 class="view-name">{{ viewName }}</h4>
  <hr class="red" />
  <div class="row app-options-bar">
    <div class="col buttons-component">
      <ButtonBarComponent
        @onCreate="handleCreate"
        :show-subactions="false"
        showCustomButton
        customLabel="Regresar"
        @onCustom="handleRegresar"
      />
    </div>
    <div class="col search-component">
      <SearchComponent
        @onSearch="handleSearch"
        searchPlaceholder="Ingresa Municipio, ID..."
      />
    </div>
  </div>
  <DataTableComponent
    v-if="!arrayData.loading"
    rowId="id"
    :columns="columns"
    :data="arrayData.data"
    :pagination="arrayData.pagination"
    :showDelete="true"
    :showEdit="true"
    :showDetail="false"
    @onPaginate="handlePaginate"
    @onEdit="handleEdit"
    @onDelete="handleDelete"
    @onCreate="handleCreate"
  />
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import router from "@/router";
import DataTableComponent from "@/components/TableCustomResponseComponent.vue";
import SearchComponent from "@/components/SearchComponent.vue";
import ButtonBarComponent from "@/components/ButtonBarComponent.vue";
import usePetition from "@/composables/usePetition";
import { useProcesoContratacionStore } from "@/store/procesoContratacionStore";

const procesoContratacionStore = useProcesoContratacionStore();

const viewName = ref<string>("");
const searchTerm = ref("");
const { arrayData, getDatas, searchData } = usePetition(
  "ubicacion_convocante/"
);

const handleCreate = () =>
  router.push({
    name: "crear-ubicacion_convocante",
    params: { idProceso: procesoContratacionStore.getSelectedRowData.id },
  });
const handleEdit = (data: string) => {
  console.log(data);
  router.push({
    name: "editar-ubicacion_convocante",
    params: {
      idProceso: procesoContratacionStore.getSelectedRowData.id,
      id: data,
    },
  });
};
const handleDelete = (data: string) =>
  router.push({
    name: "eliminar-ubicacion_convocante",
    params: {
      idProceso: procesoContratacionStore.getSelectedRowData.id,
      id: data,
    },
  });

const handleRegresar = () => {
  procesoContratacionStore.resetSelectedRowData;
  router.push({
    name: "listar-procedimiento-contrataciones",
  });
};

const handlePaginate = (page: number) => {
  if (searchTerm.value) {
    searchData({ page: page, search: searchTerm.value });
  } else {
    getDatas({ page });
  }
};

const handleSearch = (term: any) => {
  searchTerm.value = term;
  searchData({
    page: 1,
    procedimiento: procesoContratacionStore.getSelectedRowData.id,
    search: searchTerm.value,
  });
};

const columns = [
  { title: "ID", data: "id" },
  { title: "Procedimiento", data: "procedimiento.forma_procedimiento" },
  { title: "Calle", data: "calle" },
  { title: "Número Exterior", data: "numero_exterior" },
  { title: "Número Interior", data: "numero_interior" },
  { title: "Colonia", data: "colonia" },
  { title: "Código Postal", data: "codigo_postal" },
  { title: "Teléfono", data: "telefono" },
  { title: "Extensión", data: "extension" },
  { title: "Municipio", data: "municipio.nombre" },
];

onMounted(() => {
  const selectedRowData = procesoContratacionStore.getSelectedRowData;
  if (selectedRowData && selectedRowData.folio) {
    viewName.value = `Ubicacion de la Convocante folio: ${selectedRowData.folio}`;
    getDatas({
      page: 1,
      procedimiento: procesoContratacionStore.getSelectedRowData.id,
    });
  } else {
    // Manejo si no hay datos seleccionados o faltan campos importantes
    router.push({ name: "listar-procedimiento-contrataciones" });
  }
});
</script>
<style lang="scss" scoped></style>
