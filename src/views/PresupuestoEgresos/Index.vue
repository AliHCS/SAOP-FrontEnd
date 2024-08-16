<template>
  <div>
    <ul class="nav nav-tabs" id="myTab" role="tablist">
      <li class="nav-item" role="presentation">
        <button
          class="nav-link active"
          id="home-tab"
          data-bs-toggle="tab"
          data-bs-target="#home"
          type="button"
          role="tab"
          aria-controls="home"
          aria-selected="true"
        >
          Presupuesto de Egreso de la Federación
        </button>
      </li>
      <!-- <li class="nav-item" role="presentation">
        <button
          :disabled="!idRow"
          @click="handleDatosFinancieros()"
          class="nav-link"
          id="datosFinancieros-tab"
          data-bs-toggle="tab"
          data-bs-target="#datosFinancieros"
          type="button"
          role="tab"
          aria-controls="datosFinancieros"
        >
          Datos financieros
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          :disabled="!idRow"
          class="nav-link"
          id="contact-tab"
          data-bs-toggle="tab"
          data-bs-target="#contact"
          type="button"
          role="tab"
          aria-controls="contact"
          aria-selected="false"
          @click="handleFichaTecnica()"
        >
          Ficha técnica
        </button>
      </li> -->
    </ul>
    <div class="tab-content" id="myTabContent">
      <div
        class="tab-pane fade show active"
        id="home"
        role="tabpanel"
        aria-labelledby="home-tab"
      >
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
                  customLabel="Carga masiva"
                  showCustomButton
                  @onCustom="router.push({ name: 'carga-masiva-presupuesto'})"
                />
              </div>
              <AccionesPresupuestoEgreso
                @onCalendar="handleCalendar"
                @onHistory="handleHistory"
                @onContentAdmin="handleContentAdmin"
                @onFolder="handleReport"
              />
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

            <div class="flex-grow-1 d-flex justify-content-start">
              <div class="form-group">
                <div class="d-flex align-items-center form-group m-0">
                  <div>
                    <span class="font-weight-bold pr-2">PEF: </span>
                  </div>
                  <div>
                    <input
                      class="form-control"
                      type="text"
                      v-model="inputPEF"
                      placeholder="PEF"
                      @keyup.enter="handleFilter()"
                    />
                  </div>
                </div>
              </div>
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
            :pagination="paginate"
            :showDelete="true"
            :showEdit="true"
            :showDetail="false"
            :fixed-actions="true"
            @onEdit="handleEdit"
            @onDelete="handleDelete"
            @onCreate="handleCreate"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, onBeforeUnmount } from "vue";
import usePetition from "@/composables/usePetition";
import DataTableComponent from "@/components/DataTableComponent.vue";
import router from "@/router";
import ButtonBarComponent from "@/components/ButtonBarComponent.vue";
import AccionesPresupuestoEgreso from "@/components/AccionesPresupuestoEgreso.vue";
import {
  addClickListener,
  removeClickListener,
} from "@/utils/listeners/clickListener";

const viewName = "Presupuesto de Egreso de la Federación";
const { arrayData, getDatas, searchData } = usePetition("presupuesto_egresos_federacion/");
/* const searchTerm = ref(""); */
const idRow = ref("");
const selectedProyect = ref("");
const showView = ref(true);
const handleCreate = () => router.push({ name: "crear-presupuestoEgreso" });
const handleCalendar = () => {
  router.push({ name: "calendario-anual-proyecto_de_inversion" });
};
const handleHistory = () => {
  router.push({ name: "historico-anual-proyecto_de_inversion" });
};
const handleContentAdmin = () => {
  router.push({ name: "administrador-contenido-proyecto_de_inversion" });
};
const handleReport = () => {
  router.push({ name: "reporte-cartera-inversion" });
};
const handleEdit = (data: any) =>
  router.push({ name: "editar-presupuestoEgreso", params: { id: data } });
const handleDelete = (data: any) =>
  router.push({ name: "eliminar-presupuestoEgreso", params: { id: data } });
/* const handleFichaTecnica = () => router.push({ name: 'ficha_tecnica-proyecto_de_inversion', params: { id: idRow.value } }
) */

/* const handleRowClick = (rowData: any) => {
  // Obtén el ID del registro seleccionado
  // Realiza las operaciones necesarias con el ID del registro seleccionado
  idRow.value = rowData.clave;
  selectedProyect.value = rowData.nombre;
}; */

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

/* const handleDatosFinancieros = () => {
  let { getData: getDataDatosFinancieros } = usePetition(
    `informacion_financiera/`
  );
  getDataDatosFinancieros(idRow.value).then((result) => {
    arrayDataDatosFinancieros.value = result;
  });
  // if (true) {
  //     arrayDataDatosFinancieros = reactive<IFinancialData>(defaultValues);
  // }
}; */

/* const handleFichaTecnica = () => {
  let { getData: getDatahandleFichaTecnica } = usePetition(`ficha_tecnica/`);
  getDatahandleFichaTecnica(idRow.value).then((result) => {
    arrayDataFichaTecnica.value = result;
  });
}; */

const {
  arrayData: arrayDataEntidadFederativa,
  getDatas: getDatasEntidadFederativa,
} = usePetition("cat_entidad_federativa/");
/* const {
  arrayData: arrayDataUnidadResponsable,
  getDatas: getDatasUnidadResponsable,
} = usePetition("cat_unidad_responsable/"); */

/* const handlePaginate = (page: number) => {
  if (searchTerm.value) {
    searchData({ page: page, search: searchTerm.value });
  } else {
    getDatas({ page });
  }
}; */

const handleFilter = () => {
  let searchFilter = "";
  if (cbEntidad.value.length) searchFilter += cbEntidad.value;
  /* if (cbUnidad.value.length) {
    if (searchFilter.length) searchFilter += " ,";
    searchFilter += cbEntidad.value;
  } */
  if (inputSolicitud.value.length) {
    if (searchFilter.length) searchFilter += " ,";
    searchFilter += inputSolicitud.value;
  }
  if (inputPEF.value.length) {
    if (searchFilter.length) searchFilter += " ,";
    searchFilter += inputPEF.value;
  }
  searchData({ page: 1, search: searchFilter });
};

const inputPEF = ref<string>("");
const cbEntidad = ref<string>("");
/* const cbUnidad = ref<string>(""); */
const inputSolicitud = ref<string>("");
const columns = [
  { title: "Entidad", data: "entidad_federativa", align: "left" },
  { title: "No. de Solicitud", data: "cartera_proyecto_inversion", align: "left" },
  { title: "Clave Clave PEF", data: "clave_pef", align: "left" },
  { title: "Descripción PEF", data: "descripcion_pef", align: "left" },
  { title: "Ubicación", data: "ubicacion", align: "left" },
  { title: "Beneficios", data: "beneficios", align: "left" },
  { title: "Transito Esperado", data: "transito_esperado", align: "left" },
  { title: "Impacto Ambiental", data: "impacto_regional", align: "left" },
  { title: "Longitud", data: "longitud", align: "left" },
  { title: "Fecha", data: "fecha", align: "left" },
];

const paginate = {
  page_size: 10,
  page: 1,
  total: 2,
  total_pages: 1,
  previous_page: 1,
  next_page: 1,
};


onMounted(async () => {
  getDatas({ page: 1, size: 50 });
  getDatasEntidadFederativa({ page: 1, size: 100 });
  /* getDatasUnidadResponsable({ page: 1, size: 100 }); */
  addClickListener(handleClick);
});
onBeforeUnmount(() => {
  removeClickListener(handleClick);
});
</script>
