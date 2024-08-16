<template>
  <h4 class="view-name">{{ viewName }}</h4>
  <hr class="red" />
  <div class="row app-options-bar">
    <div class="col buttons-component">
      <ButtonBarComponent @onCreate="handleCreate" :showSubactions="false" />
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

const viewName = "Catálogo Unidad Responsable";
const searchTerm = ref("");
const { arrayData, getDatas, searchData } = usePetition("cat_unidad_responsable/");

const handleCreate = () => router.push({ name: "crear-cat_unidad_responsable" });
const handleEdit = (data: string) =>
  router.push({ name: "editar-cat_unidad_responsable", params: { id: data } });
const handleDelete = (data: string) =>
  router.push({
    name: "eliminar-cat_unidad_responsable",
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
  { title: "Clave", data: "clave" },
  { title: "Descripción", data: "descripcion" },
  { title: "Descripción Corta", data: "descripcion_corta" },
  { title: "Tipo de Unidad", data: "tipo_unidad" },
  { title: "Titular", data: "titular" },
  { title: "Sub-Director", data: "subdirector" },
  { title: "Dependencia", data: "dependencia" },
  { title: "Codigo Postal", data: "codigo_postal" },
  { title: "Telefono", data: "telefono" },
  { title: "Extension", data: "extension" },
  { title: "Calle", data: "calle" },
  { title: "No. Ext", data: "numero_exterior" },
  { title: "No. Int", data: "numero_interior" },
  { title: "Colonia", data: "colonia" },
  { title: "Folio Licitacion", data: "folio_licitacion" },
  { title: "Folio Contratacion", data: "folio_contratacion" },
  { title: "Contrato", data: "nombre_contrato" },
  { title: "Jefe de Laboratorio ", data: "nombre_jefe_laboratorio" },
  { title: "Entidad", data: "entidad" },
];

onMounted(() => getDatas({ page: 1 }));
</script>
<style lang="scss" scoped></style>
