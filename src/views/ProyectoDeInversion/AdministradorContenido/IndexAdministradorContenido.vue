<template>
  <div>
    <h4 class="view-name">{{ viewName }}</h4>
    <hr class="red" />
    <div class="container">
      <div class="row app-options-bar">
        <div
          class="d-flex btn-group align-items-center buttons-component align-items-center"
        >
          <div>
            <span>
              <button
                title="Cancelar"
                class="btn btn-secondary"
                type="button"
                @click="handleCancel"
              >
                <span><b>Cancelar</b></span>
              </button>
            </span>
          </div>
          <div>
            <Modal
              :title="modalTitle"
              :saveButtonTitle="saveButtonTitle"
              :openButtonTittle="openButtonTittle"
              :large-modal="true"
              @onSaveButton="SaveData"
              class="col-md-6"
            >
              <div class="col-sm-12">
                <label for="">Documento</label>
                <input
                  data-documento
                  type="file"
                  id="precidencial-prioridad"
                  placeholder=""
                  autocomplete="off"
                  ref="fileInput"
                  accept="application/pdf, image/*"
                  @change="handleFileUpload"
                />
              </div>
              <TextAraComponent
                :title="'Descripción:'"
                :placeholder="'Ingresa una descripción...'"
                :name="'situacion_actual'"
                :id="'situacion_actual'"
                class="col-sm-12"
                v-model="data.descripcion"
              />
            </Modal>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <DataTableComponent
        rowId="id"
        :columns="columnsTable"
        :data="dataTable"
        :pagination="paginate"
        :show-delete="true"
        :show-edit="true"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import DataTableComponent from "@/components/DataTableComponent.vue";
import Modal from "@/components/Modals.vue";
/* import InputText from "@/components/InputText.vue"; */
import TextAraComponent from "@/components/TextAraComponent.vue";

const router = useRouter();

const viewName = "Administrador de Contenido";

const paginate = {
  page_size: 10,
  page: 1,
  total: 2,
  total_pages: 1,
  previous_page: 1,
  next_page: 1,
};

interface DataInterface {
  document: File | null;
  descripcion: string;
}

const modalTitle: string = "Subir Archivo";
const saveButtonTitle: string = "Guardar";
const openButtonTittle: string = "Agregar";

const SaveData = () => {
  console.log("Se Cierra el modal con los datos guardados: ", data.value);
};

const handleCancel = () =>
  router.push({ name: "listar-proyecto_de_inversion" });

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length) {
    data.value.document = target.files[0];
  }
};

const data = ref<DataInterface>({
  document: null,
  descripcion: "",
});

const columnsTable = ref([
  { title: "Documentación", data: "documentacion" },
  { title: "Consecutivo", data: "consecutivo" },
  { title: "Módulo", data: "modulo" },
  { title: "Proceso", data: "proceso" },
  { title: "Nombre", data: "nombre" },
  { title: "Ruta", data: "ruta" },
  { title: "Extensión", data: "extension" },
  { title: "Descripción", data: "descripcion" },
  { title: "Tipo de Documento", data: "tipo_documento" },
  { title: "Nombre zip", data: "nombre_zip" },
]);

const dataTable = ref([
  {
    id: 1,
    documentacion: "Document1",
    consecutivo: "11",
    modulo: "Module1",
    proceso: "Process1",
    nombre: "Name1",
    ruta: "/path/to/file1",
    extension: ".pdf",
    descripcion: "Description1",
    tipo_documento: "PDF",
    nombre_zip: "Zip1",
  },
  {
    id: 2,
    documentacion: "Document2",
    consecutivo: "12",
    modulo: "Module2",
    proceso: "Process2",
    nombre: "Name2",
    ruta: "/path/to/file2",
    extension: ".jpg",
    descripcion: "Description2",
    tipo_documento: "Image",
    nombre_zip: "Zip2",
  },
]);
</script>
