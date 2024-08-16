<template>
  <div>
    <div v-if="!arrayDataEtiqueta.loading">
      <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
          <button class="nav-link active" id="etiquetas-tab" data-bs-toggle="tab" data-bs-target="#etiquetas"
            type="button" role="tab" aria-controls="etiquetas" aria-selected="true" @click="handleEtiquetas()">
            Etiquetas
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" id="valor_tab-tab" data-bs-toggle="tab" data-bs-target="#valor_tab" type="button"
            role="tab" aria-controls="valor_tab" @click="handleValores()" :disabled="etiquetaId === ''">
            Valores
          </button>
        </li>
      </ul>
      <div class="tab-content" id="myTabContent">
        <h4 class="view-name">
          <!-- {{ viewName }} -->
        </h4>
        <hr class="red" />
        <div class="row app-options-bar">
          <div class="d-flex align-items-center buttons-component align-items-center">
            <div class="col-md-8">
              <ButtonBarComponent @onCreate="openModal()" :show-subactions="false" custom-label="Etiquetas"
                custom-icon="bi bi-tag" />
              <Modal v-if="modal" :title="`${isEditing ? 'Editar' : 'Agregar'} ${viewName.toLowerCase()}`"
                saveButtonTitle="Aceptar" openButtonTittle="Crear" size-modal="lg" @onCloseModal="modal = false"
                @onSave="saveForm">
                <EtiquetaForm v-if="viewName == 'Etiquetas'" @update-data="dataEtiquetaForm"
                  :existingData="existingEtiquetaData" :dataIds="dataIds" />
                <ValoresForm v-if="viewName == 'Valores'" @update-data="dataValorForm" :existingData="existingValorData"
                  :dataIds="dataIds" />
              </Modal>
              <Modal v-if="modalDelete" :title="`Eliminar ${viewName}`" saveButtonTitle="Eliminar" size-modal="lg"
                @onCloseModal="modalDelete = false" @onSave="deleteForm">
                <div class="card">
                  <div class="card-body text-center">
                    <h5 class="card-title">¿Estás Seguro?</h5>
                    <h6 class="card-subtitle mb-2 text-muted">
                      El registro será eliminado permanetemente.
                    </h6>
                    <p class="card-text">
                      {{ dataDelete.descripcion }}
                    </p>
                  </div>
                </div>
              </Modal>
            </div>
          </div>
        </div>
        <div class="tab-pane fade show active" id="etiquetas" role="tabpanel" aria-labelledby="etiquetas-tab">
          <div v-if="showView">
            <DataTableComponent v-if="!arrayDataEtiqueta.loading" rowId="id" :columns="columnsEtiqueta"
              :data="arrayDataEtiqueta.data" :pagination="arrayDataEtiqueta.pagination" :showDelete="true"
              :showEdit="true" :row-select="true" :fixed-actions="true" :prefix="etiquetaPrefix"
              @onPaginate="handlePaginateEtiqueta" @onEdit="handleEdit" @onDelete="handleDelete"
              @onGetID="(data) => (etiquetaId = data.id)" />
          </div>
        </div>
        <div class="tab-pane fade" id="valor_tab" role="tabpanel" aria-labelledby="valor_tab-tab">
          <DataTableComponent v-if="!arrayDataValor.loading" rowId="id" :columns="columnsValor"
            :data="arrayDataValor.data" :pagination="arrayDataValor.pagination" :showDelete="true" :showEdit="true"
            :row-select="true" :fixed-actions="true" :prefix="valorPrefix" @onPaginate="handlePaginateValor"
            @onEdit="handleEdit" @onDelete="handleDelete" @onGetID="(data) => (valorId = data.id)" />
        </div>
      </div>
    </div>
    <div v-else class="text-center">
      <div class="spinner-border spinner" style="width: 3rem; height: 3rem;" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import ButtonBarComponent from "@/components/ButtonBarComponent.vue";
import { onMounted, ref, watch } from "vue";
import EtiquetaForm from "@/components/forms/Etiquetas.vue";
import ValoresForm from "@/components/forms/Valores.vue";
import { IEtiqueta, defaultValues as defaultValuestiqueta, } from "@/utils/models/cat_etiquetas";
import { IValor, defaultValues as defaultValuesValor, } from "@/utils/models/cat_valor";
import usePetition from "@/composables/usePetition";
import DataTableComponent from "@/components/DataTableComponent.vue";
import Modal from "@/components/ModalWithoutButton.vue";


const props = defineProps(["capituloId", "dataIds"]);
const emit = defineEmits(["toggle-parent-modal"]);

const showView = ref(false);
const viewName = ref("Etiquetas");
const searchTerm = ref("");
const etiquetaId = ref("");
const etiquetaPrefix = "etiqueta";
const valorId = ref("");
const valorPrefix = "etiqueta";
const modal = ref(false);
const modalDelete = ref(false);
const isEditing = ref(false);

const savedEtiquetaData = ref<IEtiqueta>(defaultValuestiqueta);
const savedValorData = ref<IValor>(defaultValuesValor);

const columnsEtiqueta = [
  { title: "Publicacion", data: "publicacion", align: "center" },
  { title: "Libro", data: "libro", align: "center" },
  { title: "Tema", data: "tema", align: "center" },
  { title: "Parte", data: "parte", align: "center" },
  { title: "Titulo", data: "titulo", align: "center" },
  { title: "Capitulo", data: "capitulo", align: "center" },
  { title: "Etiqueta", data: "etiqueta", align: "center" },
  { title: "Etiqueta", data: "id", align: "center" },
];

const columnsValor = [
  { title: "Valor", data: "valor", align: "center" },
  { title: "Siguiente nivel", data: "nivel_etiqueta", align: "center" },
  { title: "Nombre siguiete nivel", data: "vista", align: "center" },
];

const isDeleting = ref(false);
const existingEtiquetaData = ref<IEtiqueta | null>(null);
const existingValorData = ref<IValor | null>(null);
const dataDelete = ref({
  descripcion: "",
  id: "",
});

/* Consultas  */
const {
  arrayData: arrayDataEtiqueta,
  getDatas: getDatasEtiqueta,
  getData: getDataEtiqueta,
  searchData: searchDataEtiqueta,
  createData: createDataEtiqueta,
  updateData: updateDataEtiqueta,
  deleteData: deleteDataEtiqueta,
} = usePetition("cat_etiqueta/");

const {
  arrayData: arrayDataValor,
  getDatas: getDatasValor,
  getData: getDataValor,
  searchData: searchDataValor,
  createData: createDataValor,
  updateData: updateDataValor,
  deleteData: deleteDataValor,
} = usePetition("cat_valor/");

const handlePaginateEtiqueta = (page: number) => {
  if (searchTerm.value) {
    searchDataEtiqueta({ page: page, search: searchTerm.value });
  } else {
    getDatasEtiqueta({ page });
  }
};

const handlePaginateValor = (page: number) => {
  if (searchTerm.value) {
    searchDataValor({ page: page, search: searchTerm.value });
  } else {
    getDatasValor({ page });
  }
};

const handleEdit = (data: any) => {
  switch (viewName.value) {
    case "Etiquetas":
      getDataEtiqueta(data).then((response: any) => {
        existingEtiquetaData.value = { ...response }; // Asegúrate de que los campos coincidan con el modelo
        isEditing.value = true;
        modal.value = true;
      });
      break;
    case "Valores":
      getDataValor(data).then((response: any) => {
        existingValorData.value = { ...response }; // Asegúrate de que los campos coincidan con el modelo
        isEditing.value = true;
        modal.value = true;
      });
      break;
    default:
      console.error(`Tipo de formulario no reconocido: ${viewName.value}`);
  }
};

const handleDelete = (data: any) => {
  switch (viewName.value) {
    case "Etiquetas":
      getDataEtiqueta(data).then((response: any) => {
        dataDelete.value.descripcion = response.etiqueta;
        dataDelete.value.id = response.id;
        isDeleting.value = true;
        modalDelete.value = true;
      });
      break;
    case "Valores":
      getDataValor(data).then((response: any) => {
        dataDelete.value.descripcion = response.valor;
        dataDelete.value.id = response.id;
        isDeleting.value = true;
        modalDelete.value = true;
      });
      break;
    default:
      console.error(`Tipo de formulario no reconocido: ${viewName.value}`);
  }
  //router.push({ name: "eliminar-proyecto_de_inversion", params: { id: data } });
};

const saveForm = async () => {
  arrayDataEtiqueta.value.loading = true
  switch (viewName.value) {
    case "Etiquetas":
      if (isEditing.value) {
        await updateDataEtiqueta(savedEtiquetaData.value);
        await searchDataEtiqueta({ page: 1, search: props.capituloId });
      } else {
        await createDataEtiqueta(savedEtiquetaData.value);
        await searchDataEtiqueta({ page: 1, search: props.capituloId });
      }
      break;
    case "Valores":
      savedValorData.value.etiqueta = `${etiquetaId.value}`;
      if (isEditing.value) {
        await updateDataValor(savedValorData.value);
        await searchDataValor({ page: 1, search: etiquetaId.value });
      } else {
        await createDataValor(savedValorData.value);
        await searchDataValor({ page: 1, search: etiquetaId.value });
      }
      break;
    default:
      console.error(`Tipo de formulario no reconocido: ${viewName.value}`);
  }
  isEditing.value = false;
};

const dataEtiquetaForm = (dataEtiqueta: IEtiqueta) => {
  savedEtiquetaData.value = dataEtiqueta;
};
const dataValorForm = (dataValor: IValor) => {
  savedValorData.value = dataValor;
};

const deleteForm = async () => {
  switch (viewName.value) {
    case "Etiquetas":
      await deleteDataEtiqueta(dataDelete.value.id);
      await searchDataEtiqueta({ page: 1, search: props.capituloId });
      break;
    case "Valores":
      await deleteDataValor(dataDelete.value.id);
      await searchDataValor({ page: 1, search: etiquetaId.value });
      break;
    default:
      console.error(`Tipo de formulario no reconocido: ${viewName.value}`);
  }
  isDeleting.value = false;
};

const handleEtiquetas = () => {
  viewName.value = "Etiquetas";
  valorId.value = "";
};

const handleValores = () => {
  if (viewName.value !== "Valores" && valorId.value === "") {
    searchDataValor({ page: 1, search: etiquetaId.value });
  }
  viewName.value = "Valores";
};


const openModal = () => {
  existingEtiquetaData.value = null
  existingValorData.value = null
  isEditing.value = false
  modal.value = true
}

onMounted(async () => {
  showView.value = true;
  await getDatasEtiqueta({ page: 1, search: props.capituloId }).then(() => {
  });
  // addClickListener(handleClick);
});

watch(
  () => modal.value,
  (newVal) => {
    emit("toggle-parent-modal", newVal)
  }
);
</script>
<style>
.spinner {
  width: 4rem;
  height: 4rem;
  color: var(--primary-red);
}
</style>