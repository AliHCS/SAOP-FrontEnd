<template>
  <div>
    <div
      :class="{ 'show modal-backdrop': isModalOpen }"
      v-if="isModalOpen"
    ></div>
    <div
      class="modal fade overflow-auto"
      :class="{ ' show ': isModalOpen }"
      v-if="isModalOpen"
    >
      <div :class="['modal-dialog', 'modal-xl']" role="document">
        <div class="modal-content">
          <div class="custom-modal-header">
            <h4 class="custom-modal-title">Selección de testigo social</h4>
            <button
              type="button"
              class="close"
              aria-label="Close"
              @click="closeModal"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <!-- filtros -->
            <div class="row pt-5">
              <div class="col-md-7">
                <input
                  v-model="searchNombre"
                  class="form-control"
                  placeholder="Nombre"
                  type="text"
                  @keyup.enter="search()"
                />
              </div>
              <div class="col-md-5">
                <select
                  v-model="selectNombre"
                  class="form-select form-control"
                  @change="search(true)"
                >
                  <option
                    v-for="filter in FILTER_OPTIONS_TEXT"
                    :key="filter.id"
                    :value="filter.id"
                  >
                    {{ filter.name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="row py-1">
              <div class="col-md-7">
                <input
                  v-model="searchApaterno"
                  class="form-control"
                  placeholder="Apellido Paterno"
                  type="text"
                  @keyup.enter="search()"
                />
              </div>
              <div class="col-md-5">
                <select
                  v-model="selectApaterno"
                  class="form-select form-control"
                  @change="search(true)"
                >
                  <option
                    v-for="filter in FILTER_OPTIONS_TEXT"
                    :key="filter.id"
                    :value="filter.id"
                  >
                    {{ filter.name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="row py-1">
              <div class="col-md-7">
                <input
                  v-model="searchAmaterno"
                  class="form-control"
                  placeholder="Apellido Materno"
                  type="text"
                  @keyup.enter="search()"
                />
              </div>
              <div class="col-md-5">
                <select
                  v-model="selectAmaterno"
                  class="form-select form-control"
                  @change="search(true)"
                >
                  <option
                    v-for="filter in FILTER_OPTIONS_TEXT"
                    :key="filter.id"
                    :value="filter.id"
                  >
                    {{ filter.name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="row py-1 pb-5">
              <div class="col-md-7">
                <input
                  v-model="searchRFC"
                  class="form-control"
                  placeholder="RFC"
                  type="text"
                  @keyup.enter="search()"
                />
              </div>
              <div class="col-md-5">
                <select
                  v-model="selectRFC"
                  class="form-select form-control"
                  @change="search(true)"
                >
                  <option
                    v-for="filter in FILTER_OPTIONS_TEXT"
                    :key="filter.id"
                    :value="filter.id"
                  >
                    {{ filter.name }}
                  </option>
                </select>
              </div>
            </div>
            <div v-if="loading" class="text-center">
              <div
                class="spinner-border spinner"
                style="width: 3rem; height: 3rem"
                role="status"
              >
                <span class="sr-only">Loading...</span>
              </div>
            </div>
            <div v-else>
              <DataTableComponent
                v-if="!arrayData.loading && decoratedData"
                rowId="id"
                :columns="columns"
                :data="arrayData.data"
                :pagination="arrayData.pagination"
                hideActions
                @onPaginate="handlePaginate"
                @onGetID="handleRowClick"
              />
            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                @click="closeModal"
              >
                Cerrar
              </button>
              <button
                type="button"
                class="btn btn-primary active"
                @click="closeAndSaveModal"
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import DataTableComponent from "@/components/DataTableComponent.vue";
import usePetition from "@/composables/usePetition";
import { FILTER_OPTIONS_TEXT } from "@/utils/constants/filterOptions.ts";

const emit = defineEmits(["onSave", "onCloseModal"]);

const { arrayData, getDatas, searchData } = usePetition("cat_testigo_social/");
// const { arrayData: arrayDataStatus, getDatas: getDatasStatus } = usePetition("cat_estatus/");

const isModalOpen = ref(true);
const decoratedData = ref<boolean>(false);
const trabajoSeleccionado = ref();
const searchNombre = ref("");
const searchApaterno = ref("");
const searchAmaterno = ref("");
const searchRFC = ref("");
const loading = ref(true);
// const estatusLiberado = ref()

const selectNombre = ref("igual");
const nombreParams: any = {
  contiene: "nombre__icontains",
  comienza: "nombre__istartswith",
  igual: "nombre__iexact",
  termina: "nombre__iendswith",
};
const selectApaterno = ref("igual");
const ApaternoParams: any = {
  contiene: "apellido_paterno__icontains",
  comienza: "apellido_paterno__istartswith",
  igual: "apellido_paterno__iexact",
  termina: "apellido_paterno__iendswith",
};
const selectAmaterno = ref("igual");
const AmaternoParams: any = {
  contiene: "apellido_materno__icontains",
  comienza: "apellido_materno__istartswith",
  igual: "apellido_materno__iexact",
  termina: "apellido_materno__iendswith",
};
const selectRFC = ref("igual");
const RFCParams: any = {
  contiene: "rfc_ts__icontains",
  comienza: "rfc_ts__istartswith",
  igual: "rfc_ts__iexact",
  termina: "rfc_ts__iendswith",
};

const columns = [
  { title: "Testigo social", data: "clave", align: "center" },
  { title: "Nombre", data: "nombre", align: "left" },
  { title: "Apellido Paterno", data: "apellido_paterno", align: "left" },
  { title: "Apellido MaternoApel", data: "apellido_materno", align: "left" },
  { title: "RFC", data: "rfc_ts", align: "left" },
];

const closeModal = () => {
  isModalOpen.value = false;
  emit("onCloseModal");
};
const closeAndSaveModal = () => {
  isModalOpen.value = false;
  emit("onCloseModal");
  emit("onSave", trabajoSeleccionado);
};

const handlePaginate = (page: number) => {
  loading.value = true;
  if (
    searchNombre.value ||
    searchApaterno.value ||
    searchAmaterno.value ||
    searchRFC
  ) {
    let params: any = { page: page };
    if (searchNombre.value)
      params[nombreParams[selectNombre.value]] = searchNombre.value;
    if (searchApaterno.value)
      params[ApaternoParams[selectApaterno.value]] = searchApaterno.value;
    if (searchAmaterno.value)
      params[AmaternoParams[selectAmaterno.value]] = searchAmaterno.value;
    if (searchRFC.value) params[RFCParams[selectRFC.value]] = searchRFC.value;
    searchData(params);
  } else {
    getDecoratedDatas(page);
  }
  loading.value = false;
};

const search = (fromCb = false) => {
  if (
    fromCb &&
    !searchNombre.value &&
    !searchApaterno.value &&
    !searchAmaterno.value &&
    !searchRFC.value
  )
    return;
  loading.value = true;
  let params: any = { page: 1 };
  if (searchNombre.value)
    params[nombreParams[selectNombre.value]] = searchNombre.value;
  if (searchApaterno.value)
    params[ApaternoParams[selectApaterno.value]] = searchApaterno.value;
  if (searchAmaterno.value)
    params[AmaternoParams[selectAmaterno.value]] = searchAmaterno.value;
  if (searchRFC.value) params[RFCParams[selectRFC.value]] = searchRFC.value;

  searchData(params).then(() => {
    decoratedData.value = true;
    loading.value = false;
  });
};

const handleRowClick = (rowData: any) => {
  trabajoSeleccionado.value = rowData;
};

const getDecoratedDatas = (page = 1, size = 10) => {
  decoratedData.value = false;

  // Obtiene todos
  getDatas({
    page,
    size,
  }).then(() => {
    decoratedData.value = true;
  });
};

onMounted(async () => {
  getDecoratedDatas();
  loading.value = false;
});
</script>

<style scoped>
.custom-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #545454;
  background-color: #272829;
}

.custom-modal-title {
  text-align: center;
  color: white;
  flex-grow: 1;
}

.custom-modal-header .close {
  color: white;
  cursor: pointer;
}

.custom-modal-header .close:hover {
  color: #ccc;
}

@media (min-width: 768px) {
  .modal .modal-dialog.modal-xl {
    max-width: 1300px !important;
    width: 100%;
    margin: 30px auto;
  }
}

.modal-dialog.modal-xl {
  max-width: 900px !important;
}

.spinner {
  width: 4rem;
  height: 4rem;
  color: var(--primary-red);
}
</style>
