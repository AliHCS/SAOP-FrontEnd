<template>
  <h4 class="view-name">{{ viewName }}</h4>
  <hr class="red" />
  <div class="container">
    <div class="row app-options-bar">
      <div
        class="d-flex align-items-center buttons-component align-items-center"
      >
        <div class="col-md-8">
          <span>
            <button
              title="Cancelar"
              class="btn btn-secondary mr-4"
              type="button"
              @click="handleCancel()"
            >
              <span><b>Cancelar</b></span>
            </button>
          </span>
        </div>
      </div>
    </div>
    <!-- Filtros de búsqueda -->
    <div class="row align-items-end">
      <div class="col-md-4 align-items-center">
        <div><span class="font-weight-bold pr-2">No. Solicitud:</span></div>
        <div>
          <input
            class="form-control w-auto"
            placeholder="Buscar..."
            type="text"
            v-model="filtros.solicitud"
          />
        </div>
      </div>

      <div class="col-md-4 align-items-center">
        <div><span class="font-weight-bold pr-2">Cve Cartera:</span></div>
        <div>
          <input
            class="form-control w-auto"
            placeholder="Buscar..."
            type="text"
            v-model="filtros.cartera"
          />
        </div>
      </div>
      <div class="col-md-4 align-items-end">
        <button
          title="Aplicar"
          class="btn btn-primary active mr-4"
          type="button"
          @click="aplicarFiltros"
        >
          <span><b>Aplicar</b></span>
        </button>
        <button
          title="Limpiar campos"
          class="dt-button btn btn-secondary"
          type="button"
          @click="limpiarFiltros"
        >
          <i class="bi bi-eraser-fill"></i>
        </button>
      </div>
    </div>
    <div class="container">
      <DataTableComponent
        rowId="id"
        :columns="dynamicColumns"
        :data="dataTableDataHistorico"
        :pagination="paginate"
        :hideActions="true"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import DataTableComponent from "@/components/DataTableComponent.vue";

//const route = useRoute();
const router = useRouter();

const viewName = "Historico Anual Del Proyecto";

const filtros = ref({
  solicitud: "",
  cartera: "",
});

const paginate = {
  page_size: 10,
  page: 1,
  total: 2,
  total_pages: 1,
  previous_page: 1,
  next_page: 1,
};

const handleCancel = () =>
  router.push({ name: "listar-proyecto_de_inversion" });

const aplicarFiltros = () => {
  // Lógica para aplicar los filtros
  let searchFilter = "";
  if (filtros.value.solicitud.length) searchFilter += filtros.value.solicitud;
  if (filtros.value.cartera.length) {
    if (searchFilter.length) searchFilter += " ,";
    searchFilter += filtros.value.cartera;
  }
  /* searchData({ page: 1, search: searchFilter }); */
  console.log("Cadena Filtros:", searchFilter);
  console.log("Aplicar filtros con valores:", filtros.value);
};

const limpiarFiltros = () => {
  // Lógica para limpiar los filtros
  console.log("Limpiar filtros");
  filtros.value.solicitud = "";
  filtros.value.cartera = "";
};

const dynamicColumns = ref([
  { title: "No. Solicitud", data: "id" },
  { title: "Consecutivo", data: "consecutivo" },
  { title: "Cve Cartera", data: "cveCartera" },
  { title: "Nombre del Proyecto", data: "nombreProyecto" },
  { title: "Tasa Descuentos", data: "tasaDescuentos" },
  { title: "Comentarios", data: "comentarios" },
  { title: "Fecha Inicial", data: "fechaInicial" },
  { title: "Fecha Final", data: "fechaFinal" },
  { title: "Años Anteriores", data: "aniosAnteriores" },
  { title: "Años Posteriores", data: "aniosPosteriores" },
  { title: "Fase", data: "fase" },
  { title: "Entidad", data: "entidad" },
  { title: "Unidad Responsable", data: "unidadResponsable" },
  { title: "Factibilidad de la Obra", data: "factibilidadObra" },
  { title: "Clave de Compromiso", data: "claveCompromiso" },
  { title: "Requerimiento de Hacienda", data: "requerimientoHacienda" },
  { title: "Aforo", data: "aforo" },
  { title: "Situación Actual", data: "situacionActual" },
  { title: "Autorización y Permisos", data: "autorizacionPermisos" },
  { title: "Alcance Proyecto", data: "alcanceProyecto" },
  { title: "Aportación Estatal", data: "aportacionEstatal" },
  { title: "Ficha Técnica", data: "fichaTecnica" },
  { title: "Estudio Costo-Beneficio", data: "estudioCostoBeneficio" },
  { title: "Proyecto Ejecutivo", data: "proyectoEjecutivo" },
  { title: "Tomo", data: "tomo" },
  { title: "Fecha Tomo", data: "fechaTomo" },
]);

const dataTableDataHistorico = ref([
  {
    id: 1,
    consecutivo: "001",
    cveCartera: "CC001",
    nombreProyecto: "Proyecto A",
    tasaDescuentos: "10%",
    comentarios: "Comentario 1",
    fechaInicial: "01/01/2023",
    fechaFinal: "31/12/2023",
    aniosAnteriores: 2,
    aniosPosteriores: 3,
    fase: "Fase 1",
    entidad: "Entidad 1",
    unidadResponsable: "Unidad 1",
    factibilidadObra: "Factible",
    claveCompromiso: "CC123",
    requerimientoHacienda: "RH456",
    aforo: "Aforo 1",
    situacionActual: "En progreso",
    autorizacionPermisos: "Autorizado",
    alcanceProyecto: "Completo",
    aportacionEstatal: "25%",
    fichaTecnica: "FT001",
    estudioCostoBeneficio: "Positivo",
    proyectoEjecutivo: "PE001",
    tomo: "Tomo 1",
    fechaTomo: "15/05/2023",
  },
  {
    id: 2,
    consecutivo: "002",
    cveCartera: "CC002",
    nombreProyecto: "Proyecto B",
    tasaDescuentos: "15%",
    comentarios: "Comentario 2",
    fechaInicial: "01/04/2023",
    fechaFinal: "30/11/2023",
    aniosAnteriores: 1,
    aniosPosteriores: 4,
    fase: "Fase 2",
    entidad: "Entidad 2",
    unidadResponsable: "Unidad 2",
    factibilidadObra: "No factible",
    claveCompromiso: "CC456",
    requerimientoHacienda: "RH789",
    aforo: "Aforo 2",
    situacionActual: "Pendiente",
    autorizacionPermisos: "En revisión",
    alcanceProyecto: "Parcial",
    aportacionEstatal: "30%",
    fichaTecnica: "FT002",
    estudioCostoBeneficio: "Negativo",
    proyectoEjecutivo: "PE002",
    tomo: "Tomo 2",
    fechaTomo: "20/06/2023",
  },
]);

onMounted(async () => {});
onBeforeUnmount(() => {});
</script>
