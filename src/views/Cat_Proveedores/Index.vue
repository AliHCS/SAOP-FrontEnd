<template>
  <h4 class="view-name">{{ viewName }}</h4>
  <hr class="red" />
  <div class="row app-options-bar">
    <div class="col buttons-component">
      <ButtonBarComponent @onCreate="handleCreate" :show-subactions="false" />
    </div>
    <div class="col search-component">
      <SearchComponent
        @onSearch="handleSearch"
        searchPlaceholder="Ingresa clave..."
      />
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
import DataTableComponent from "@/components/TableCustomResponseComponent.vue";
import SearchComponent from "@/components/SearchComponent.vue";
import ButtonBarComponent from "@/components/ButtonBarComponent.vue";
import usePetition from "@/composables/usePetition";

const viewName = "Catálogo Proveedores";
const searchTerm = ref("");
const { arrayData, getDatas, searchData } = usePetition("cat_proveedor/");

const handleCreate = () => router.push({ name: "crear-cat_proveedores" });
const handleEdit = (data: string) =>
  router.push({ name: "editar-cat_proveedores", params: { id: data } });
const handleDelete = (data: string) =>
  router.push({
    name: "eliminar-cat_proveedores",
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
  { title: "ID", data: "id" },
  { title: "Clave", data: "clave" },
  { title: "Nombre", data: "nombre" },
  { title: "Nombre Comercial", data: "nombre_comercial" },
  { title: "Giro Empresarial", data: "giro_empresarial" },
  { title: "Tipo Personalidad", data: "tipo_personalidad" },
  { title: "Calle", data: "calle" },
  { title: "Número Exterior", data: "num_exterior" },
  { title: "Número Interior", data: "num_interior" },
  { title: "Colonia", data: "colonia" },
  { title: "Código Postal", data: "codigo_postal" },
  { title: "Extensión", data: "extension" },
  { title: "Dirección Página Web", data: "direccion_pagina_web" },
  { title: "Correo Electrónico", data: "correo_electronico" },
  { title: "Código Postal Fiscal", data: "codigo_postal_fiscal" },
  { title: "Teléfono Fiscal", data: "telefono_fiscal" },
  { title: "Extensión Fiscal", data: "extension_fiscal" },
  { title: "Calle Fiscal", data: "calle_fiscal" },
  { title: "Número Exterior Fiscal", data: "num_exterior_fiscal" },
  { title: "Número Interior Fiscal", data: "num_interior_fiscal" },
  { title: "Colonia Fiscal", data: "colonia_fiscal" },
  { title: "Correo Electrónico Fiscal", data: "correo_electronico_fiscal" },
  { title: "Teléfono", data: "telefono" },
  { title: "País", data: "pais.nombre_oficial" },
  { title: "Entidad", data: "entidad.descripcion" },
  { title: "Entidad Fiscal", data: "entidad_fiscal.descripcion" },
  { title: "Municipio", data: "municipio.descripcion" },
  { title: "Municipio Fiscal", data: "municipio_fiscal.descripcion" },
  { title: "Proveedor Estatus", data: "proveedor_estatus.descripcion" },
  { title: "IVA", data: "iva.descripcion" },
];

onMounted(() => getDatas({ page: 1 }));
</script>
<style lang="scss" scoped></style>
