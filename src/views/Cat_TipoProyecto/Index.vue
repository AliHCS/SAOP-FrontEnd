<template>
  <h4 class="view-name">{{ viewName }}</h4>
  <hr class="red" />
  <div class="row app-options-bar">
    <div class="col buttons-component">
      <ButtonBarComponent @onCreate="handleCreate" :showSubactions="false"/>
    </div>
    <div class="col search-component">
        <SearchComponent  @onSearch="handleSearch"/>
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
import DataTableComponent from "@/components/DataTableComponent.vue";
import SearchComponent from "@/components/SearchComponent.vue";
import ButtonBarComponent from "@/components/ButtonBarComponent.vue";
import usePetition from "@/composables/usePetition";

const viewName = "Catálogo Tipos de Proyecto";
const searchTerm = ref("");
const { arrayData, getDatas, searchData } = usePetition("cat_tipo_proyecto/");

const handleCreate = () => router.push({ name: "crear-tipoProyecto" });
const handleEdit = (data: string) =>
  router.push({ name: "editar-tipoProyecto", params: { id: data } });
const handleDelete = (data: string) =>
  router.push({
    name: "eliminar-tipoProyecto",
    params: { id: data },
  });
/* const handleSubGroup = (data: any) =>
  router.push({ name: "listar-actividad-presupuestal", params: { act: data } }); */

const handlePaginate = (page: number) => {
  if (searchTerm.value) {
    searchData({ page: page, search: searchTerm.value });
  } else {
    getDatas({ page });
  }
};

const handleSearch = (term: any) => {
  searchTerm.value = term;
  searchData({ page: 1, search: searchTerm.value });
};

const columns = [
  { title: "Tipo de Proyecto", data: "clave" },
  { title: "Descripción Tipo de Proyecto", data: "descripcion" },
];

onMounted(() => getDatas({ page: 1 }));
</script>
<style lang="scss" scoped></style>
