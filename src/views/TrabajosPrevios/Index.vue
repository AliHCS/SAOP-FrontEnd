<template>
  <div>
    <ul class="nav nav-tabs" id="tabs" role="tablist">
      <li class="nav-item" role="presentation">
        <button
          class="nav-link active"
          id="trabajosPrevios-tab"
          data-bs-toggle="tab"
          data-bs-target="#trabajosPrevios"
          type="button"
          role="tab"
          aria-controls="trabajosPrevios"
          aria-selected="true"
        >
          Trabajos Previos
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          :disabled="!consecutivoSeleccionado"
          class="nav-link"
          id="detalles-tab"
          data-bs-toggle="tab"
          data-bs-target="#detalles"
          type="button"
          role="tab"
          aria-controls="detalles"
          aria-selected="true"
          
        >
          Ver Detalles
        </button>
      </li>
    </ul>
    <div class="tab-content" id="tabsContent">
      <div
        class="tab-pane fade show active"
        id="trabajosPrevios"
        role="tabpanel"
        aria-labelledby="trabajosPrevios-tab"
      >
        <Transition name="view">
          <div>
            <h4 class="view-name">{{ viewName }}</h4>
            <hr class="red" />
            <div class="row app-options-bar">
              <div class="col search-component">
                <SearchComponent
                  @onSearch="handleSearch"
                  search-placeholder="No.Obra, Solicitud, Trabajo o Desc."
                  inputWidth="330px"
                />
              </div>
            </div>
            <DataTableComponent
              v-if="!arrayData.loading"
              rowId="id"
              :columns="columns"
              :data="arrayData.data"
              :pagination="arrayData.pagination"
              :row-select="true"
              :hideActions="true"
              @onPaginate="handlePaginate"
              @onGetID="handleRowClick"
            />
            <h4 class="view-name">
              Información de los consecutivos de los trabajos Previos
            </h4>
            <hr class="red" />
            <DataTableComponent
              v-if="!dataTableTrabajosPrevios"
              rowId="id"
              :row-select="true"
              :columns="trabajosPreviosColumns"
              :data="trabajosPreviosSeleccionados"
              :pagination="arrayData.pagination"
              :hidePagination="true"
              :hideActions="true"
              prefix="consecutivo"
              @onPaginate="handlePaginate"
              @onGetID="handleRowConsecutivoClick"
            />
          </div>
        </Transition>
      </div>
      <!-- ver detalle -->
      <div
        class="tab-pane fade"
        id="detalles"
        role="tabpanel"
        aria-labelledby="detalles-tab"
      >
        <Transition name="view">
          <div>
            <h4 class="view-name">Ver Detalle</h4>
            <hr class="red" />
            <div class="row app-options-bar">
              <div
                class="d-flex align-items-center buttons-component align-items-center"
              >
                <div class="col-md-8">
                  <!-- <ButtonBarComponent @onCreate="handleCreate" :show-subactions="false" customLabel="Carga masiva"
                    showCustomButton @onCustom="router.push({ name: 'carga-masiva' })" /> -->
                </div>
                <Acciones
                  :actions="[
                    { action: 'presupuesto', iconAction: 'bi-calculator' },
                  ]"
                  @onAction="hanldeCustomAction"
                />
              </div>
            </div>
            <div class="row app-options-bar">
              <div class="search-component w-100">
                <input
                  :style="{ width: '300px' }"
                  class="form-control"
                  placeholder="Buscar..."
                  type="text"
                  v-model="searchDetalles.value"
                  @keyup.enter="refreshDetalles()"
                />
              </div>
            </div>
            <DataTableComponent
              v-if="showDetalles"
              rowId="id"
              :columns="columnsDetalle"
              :data="verDetallesData"
              :pagination="detallesPaginacion"
              prefix="detalle"
              :hideActions="true"
              @onPaginate="handlePaginate"
              :row-select="true"
              @onGetID="handleRowDetallesClick"
            >
              <template v-slot:footerData>
                <div class="text-right mt-4 mb-1 font-weight-bold">
                  Total:
                  <span>{{
                    totalDetalles.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })
                  }}</span>
                </div>
              </template>
            </DataTableComponent>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {
  onBeforeUnmount,
  onMounted,
  ref,
  computed,
  reactive,
  watch,
} from "vue";
import usePetition from "@/composables/usePetition";
import DataTableComponent from "@/components/DataTableComponent.vue";
import SearchComponent from "@/components/SearchComponent.vue";
import {
  addClickListener,
  removeClickListener,
} from "@/utils/listeners/clickListener";
import Acciones from "@/components/customTableActions.vue";

import useAlert from "@/composables/useAlert";

const { showAlertError, showAlertSuccess } = useAlert();

const viewName = "Trabajos Previos";
const { arrayData, getDatas, searchData } = usePetition("trabajo_previo/");
const searchTerm = ref<string>("");
const dataTableTrabajosPrevios = ref<boolean>();

const consecutivoSeleccionado = ref<any>();
const trabajoPrevioSeleccionado = ref<any>();
const detallesSeleccionado = ref<any>();
const showDetalles = ref<boolean>(false);
const totalDetalles = ref<number>(0);
const searchDetalles = reactive({ value: "" });
const detallesPaginacion = ref<any>();
const consecutivosDatas = ref<any>()
// Define una variable reactiva con un arreglo de tipo TrabajoPrevio
interface TrabajoPrevio {
  id: number;
  partida: number;
  consecutivo: number;
  descripcion_trabajos_previos: string;
  precio_base: string;
  cantidad: string;
  tipo_esp: string;
  tipo_escalatoria: number;
  calculo_escalatoria: number;
  numero_obra: string;
  concepto: string;
  presupuesto_egresos_federacion: number;
  cartera_proyecto_inversion: number;
  trabajo: number;
  estatus_trabajo: number;
  proceso: number;
  modulo: number;
  unidad_responsable: number;
  pais: number;
  entidad_federativa: number;
  publicacion: number;
  libro: number;
  tema: number;
  parte: number;
  titulo: number;
  capitulo: number;
}
const trabajosPreviosSeleccionados = ref<TrabajoPrevio[]>([]);

const handlePaginate = (page: number) => {
  if (searchTerm.value) {
    searchData({ page: page, search: searchTerm.value });
  } else {
    getDatas({ page });
  }
};

const handleRowClick = (rowData: any) => {
  //data para ver detalles
  trabajoPrevioSeleccionado.value = rowData;
  trabajosPreviosSeleccionados.value = [];
  const idSeleccionado = rowData;
  dataTableTrabajosPrevios.value = true;
  if (idSeleccionado && idSeleccionado.trabajos_previos) {
    idSeleccionado.trabajos_previos.forEach((element: TrabajoPrevio) => {
      trabajosPreviosSeleccionados.value.push(element);
    });
  } else {
    console.error("No se encontraron trabajos previos para este registro.");
  }
  setTimeout(() => {
    dataTableTrabajosPrevios.value = false;
  }, 10);
};

const handleRowDetallesClick = (rowData: any) => {
  detallesSeleccionado.value = rowData.id;
};

const handleRowConsecutivoClick = (rowData: any) => {
  consecutivoSeleccionado.value = rowData.id;
  fetchVerDetalle()
};


const verDetallesData = computed(() => {
  totalDetalles.value = 0;
  let decoratedArray: any = [];
  if (consecutivosDatas.value) {
    consecutivosDatas.value.forEach((el: any) => {
      decoratedArray.push({
        id: el.id,
        no_partida: el.partida,
        descripcion: el.descripcion_trabajos_previos,
        grupo: el.tipo_escalatoria,
        estatus: el.estatus_trabajo,
        cantidad: el.cantidad,
        precio: el.precio_base,
        importe: (el.precio_base * el.cantidad).toFixed(2),
      });
      totalDetalles.value += el.precio_base * el.cantidad;
    });
  }
  if (searchDetalles.value) {
    decoratedArray = decoratedArray.filter((item: any) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(searchDetalles.value.toLowerCase())
      )
    );
  }
  detallesPaginacion.value = {
    page_size: 100,
    page: 1,
    total: decoratedArray.length,
    total_pages: 1,
    previous_page: 1,
    next_page: 1,
  };
  return decoratedArray;
});

const refreshDetalles = () => {
  showDetalles.value = false;
  setTimeout(() => {
    showDetalles.value = true;
  }, 10);
};

const handleSearch = (term: any) => {
  searchTerm.value = term;
  console.log("term: ", term);
  searchData({ page: 1, search: searchTerm.value });
};

const handleClick = (event?: MouseEvent) => {
  //solo aplica si se esta en la pantalla de datatable
  const homeTab = document.getElementById("trabajosPrevios");
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
  }
};

const fetchVerDetalle = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${import.meta.env.VITE_API}trabajo_previo/conceptos_obra/?consecutivo=${consecutivoSeleccionado.value}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },

      }
    );
    consecutivosDatas.value = await response.json();
  } catch (error) {
    console.log(error);
  }
};

const hanldeCustomAction = async () => {
  if (!detallesSeleccionado.value) {
    showAlertError(`No se ha selecionado ningún registro`, 2000);
    return;
  }
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${import.meta.env.VITE_API}trabajo_previo/${
        detallesSeleccionado.value
      }/presupuesto_base/`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response) return;

    if (response.status !== 200) {
      const json = await response.json();
      showAlertError(`${json.non_field_errors[0]}`, 3000);
      console.log(json.non_field_errors[0]);
    } else {
      showAlertSuccess(
        "¡Éxito! se ha aplicado el presupuesto base correctamente."
      );
    }
  } catch (error) {
    console.log(error);
  }
};

const columns = [
  /* { title: "ID", data: "id", align: "left" }, */
  { title: "Clave Cartera", data: "cartera_proyecto_inversion", align: "left" },
  {
    title: "Presupuesto Egresos Federación",
    data: "presupuesto_egresos_federacion",
    align: "left",
  },
  { title: "País", data: "pais", align: "left" },
  { title: "Entidad Federativa", data: "entidad_federativa", align: "left" },
  { title: "Departamento", data: "departamento", align: "left" },
  { title: "Estatus Trabajo", data: "estatus_trabajo", align: "left" },
  { title: "Tipo Trabajo", data: "tipo_trabajo", align: "left" },
  { title: "Tipo Subtrabajo", data: "tipo_subtrabajo", align: "left" },
  { title: "Descripción", data: "descripcion", align: "left" },
  {
    title: "Aplica Ruta Tramo Subtramo",
    data: "aplica_ruta_tramo_subtramo",
    align: "left",
  },
  { title: "Fecha Obra", data: "fecha_obra", align: "left" },
  { title: "Número Obra", data: "numero_obra", align: "left" },
  { title: "Meta", data: "meta", align: "left" },
  {
    title: "Actividad Prioritaria",
    data: "actividad_prioritaria",
    align: "left",
  },
  { title: "Ubicación", data: "ubicacion", align: "left" },
  { title: "Observaciones", data: "observaciones", align: "left" },
  { title: "Tipo Contratación", data: "tipo_contratacion", align: "left" },
  { title: "Periodo", data: "periodo", align: "left" },
];
const trabajosPreviosColumns = [
  { title: "ID", data: "id", align: "left" },
  { title: "Partida", data: "partida", align: "left" },
  { title: "Consecutivo", data: "consecutivo", align: "left" },
  {
    title: "Descripción Trabajos Previos",
    data: "descripcion_trabajos_previos",
    align: "left",
  },
  { title: "Precio Base", data: "precio_base", align: "left" },
  { title: "Cantidad", data: "cantidad", align: "left" },
  { title: "Tipo Esp", data: "tipo_esp", align: "left" },
  { title: "Tipo Escalatoria", data: "tipo_escalatoria", align: "left" },
  { title: "Cálculo Escalatoria", data: "calculo_escalatoria", align: "left" },
  { title: "Número Obra", data: "numero_obra", align: "left" },
  { title: "Concepto", data: "concepto", align: "left" },
  {
    title: "Presupuesto Egresos Federación",
    data: "presupuesto_egresos_federacion",
    align: "left",
  },
  { title: "Clave Cartera", data: "cartera_proyecto_inversion", align: "left" },
  { title: "Trabajo", data: "trabajo", align: "left" },
  { title: "Estatus Trabajo", data: "estatus_trabajo", align: "left" },
  { title: "Proceso", data: "proceso", align: "left" },
  { title: "Módulo", data: "modulo", align: "left" },
  { title: "Unidad Responsable", data: "unidad_responsable", align: "left" },
  { title: "País", data: "pais", align: "left" },
  { title: "Entidad Federativa", data: "entidad_federativa", align: "left" },
  { title: "Publicación", data: "publicacion", align: "left" },
  { title: "Libro", data: "libro", align: "left" },
  { title: "Tema", data: "tema", align: "left" },
  { title: "Parte", data: "parte", align: "left" },
  { title: "Título", data: "titulo", align: "left" },
  { title: "Capítulo", data: "capitulo", align: "left" },
];
const columnsDetalle = [
  { title: "No. Partida", data: "no_partida", align: "center" },
  { title: "Descripción", data: "descripcion", align: "left" },
  { title: "Grupo escalación", data: "grupo", align: "left" },
  { title: "Estatus", data: "estatus", align: "left" },
  { title: "Cantidad", data: "cantidad", align: "left" },
  { title: "Precio", data: "precio", align: "left" },
  { title: "Importe", data: "importe", align: "left" },
];

watch(consecutivosDatas, () => {
  showDetalles.value = false;
  setTimeout(() => {
    showDetalles.value = true;
  }, 10);
});

onMounted(async () => {
  await getDatas({ page: 1 }).then(() => {});
  addClickListener(handleClick);
});
onBeforeUnmount(() => {
  removeClickListener(handleClick);
});
</script>
<style scoped>
.ml-4 {
  margin-left: -1.5rem !important;
}

.form-group {
  display: flex;
  align-items: center;
}
</style>
