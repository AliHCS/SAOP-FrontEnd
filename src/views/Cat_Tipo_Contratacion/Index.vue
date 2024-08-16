<template>
  <h4 class="view-name">{{ viewName }}</h4>
  <hr class="red" />
  <div class="row app-options-bar">
    <div class="col buttons-component">
      <ButtonBarComponent @onCreate="handleCreate" :showSubactions="false"/>
    </div>
    <div class="col search-component">
      <SearchComponent @onSearch="handleSearch" searchPlaceholder="Ingresa clave..."/>
    </div>
  </div>
  <DataTableComponent v-if="!arrayData.loading" rowId="clave" :columns="columns" :data="arrayData.data"
    :pagination="arrayData.pagination" :showDelete="true" :showEdit="true" :showDetail="false"
    @onPaginate="handlePaginate" @onEdit="handleEdit" @onDelete="handleDelete" @onCreate="handleCreate" />
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import router from "@/router";
import DataTableComponent from "@/components/DataTableComponent.vue";
import SearchComponent from "@/components/SearchComponent.vue";
import ButtonBarComponent from "@/components/ButtonBarComponent.vue";
import usePetition from "@/composables/usePetition";

const viewName = "Catálogo de Tipo de Contratación";
const searchTerm = ref("");
const { arrayData, getDatas, searchData } = usePetition("cat_tipo_contratacion/");

const handleCreate = () => router.push({ name: "crear-cat_tipo_contratacion" });
const handleEdit = (data: string) =>
  router.push({ name: "editar-cat_tipo_contratacion", params: { id: data } });
const handleDelete = (data: string) =>
  router.push({
    name: "eliminar-cat_tipo_contratacion",
    params: { id: data },
  });

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
  { title: "Clave", data: "clave" },
  { title: "Descripción", data: "descripcion_contratacion" },
  { title: "Prefijo", data: "prefijo" },
];

onMounted(() => getDatas({ page: 1 }));
</script>
<style lang="scss" scoped></style>
