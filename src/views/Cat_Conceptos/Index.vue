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
          @click="handlePublicacion()"
        >
          Publicacion
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          :disabled="publicacionId === ''"
          class="nav-link"
          id="libro_tab-tab"
          data-bs-toggle="tab"
          data-bs-target="#libro_tab"
          type="button"
          role="tab"
          aria-controls="libro_tab"
          @click="handleLibros()"
        >
          Libros
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          :disabled="libroId === ''"
          class="nav-link"
          id="temas_tab-tab"
          data-bs-toggle="tab"
          data-bs-target="#temas_tab"
          type="button"
          role="tab"
          aria-controls="temas_tab"
          @click="handleTemas()"
        >
          Temas
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          :disabled="temaId === ''"
          class="nav-link"
          id="parte_tab-tab"
          data-bs-toggle="tab"
          data-bs-target="#parte_tab"
          type="button"
          role="tab"
          aria-controls="parte_tab"
          @click="handleParte()"
        >
          Parte
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          :disabled="parteId === ''"
          class="nav-link"
          id="titulo_tab-tab"
          data-bs-toggle="tab"
          data-bs-target="#titulo_tab"
          type="button"
          role="tab"
          aria-controls="titulo_tab"
          @click="handleTitulo()"
        >
          Titulos
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          :disabled="tituloId === ''"
          class="nav-link"
          id="capitulo_tab-tab"
          data-bs-toggle="tab"
          data-bs-target="#capitulo_tab"
          type="button"
          role="tab"
          aria-controls="capitulo_tab"
          @click="handleCapitulo()"
        >
          Capitulos
        </button>
      </li>
    </ul>
    <div class="tab-content" id="myTabContent">
      <h4 class="view-name">
        {{ viewName }}
      </h4>
      <hr class="red" />
      <div class="row app-options-bar">
        <div
          class="d-flex align-items-center buttons-component align-items-center"
        >
          <div class="col-md-8">
            <ButtonBarComponent
              @onCreate="openModal()"
              @onCustom="modalEtiquetas = true"
              :show-subactions="false"
              :show-custom-button="viewName == 'Capitulos'"
              :disable-custom-button="capitulo == null"
              custom-label="Etiquetas"
              custom-icon="bi bi-tag"
            />
            <Modal
              v-if="modal"
              :title="`${
                isEditing ? 'Editar' : 'Agregar'
              } ${viewName.toLowerCase()}`"
              saveButtonTitle="Aceptar"
              openButtonTittle="Crear"
              size-modal="lg"
              @onCloseModal="modal = false"
              @onSave="saveForm"
            >
              <PublicacionForm
                v-if="viewName === 'Publicaciones'"
                @update-data="dataPublicacionForm"
                :existingData="existingPublicacionData"
              />
              <LibroForm
                v-if="viewName === 'Libros'"
                @update-data="dataLibroForm"
                :existingData="existingLibroData"
              />
              <TemaForm
                v-if="viewName === 'Temas'"
                @update-data="dataTemaForm"
                :existingData="existingTemaData"
              />
              <ParteForm
                v-if="viewName === 'Parte'"
                @update-data="dataParteForm"
                :existingData="existingParteData"
              />
              <TituloForm
                v-if="viewName === 'Titulos'"
                @update-data="dataTituloForm"
                :existingData="existingTituloData"
              />
              <CapituloForm
                v-if="viewName === 'Capitulos'"
                @update-data="dataCapituloForm"
                :existingData="existingCapituloData"
              />
            </Modal>
            <Modal
              v-if="modalDelete"
              :title="`Eliminar ${viewName}`"
              saveButtonTitle="Eliminar"
              :large-modal="true"
              @onCloseModal="modalDelete = false"
              @onSave="deleteForm"
            >
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
            <Modal
              v-if="modalEtiquetas && capitulo"
              :title="`Etiqueta para el capitulo ${capitulo.descripcion}`"
              saveButtonTitle="Aceptar"
              openButtonTittle="Crear"
              size-modal="xl"
              @onCloseModal="modalEtiquetas = false"
              @onSave="saveForm"
              :showAcceptButton="false"
            >
              <Etiquetas
                :capituloId="capitulo.id"
                :dataIds="{
                  capitulo: capitulo.id,
                  libro: libroId,
                  parte: parteId,
                  publicacion: publicacionId,
                  tema: temaId,
                  titulo: tituloId,
                }"
              />
            </Modal>
          </div>
        </div>
      </div>
      <!-- buscador -->
      <!-- <div class="d-flex px-2">
        <div class="pr-3 col-md-1" style="font-size: 30px">
          <i class="px-2 bi bi-funnel-fill"></i>
        </div>
        <div class="flex-grow-1 d-flex justify-content-end">
          <div class="form-group">
            <div class="d-flex align-items-center form-group m-0">
              <div>
                <span class="font-weight-bold pr-2">Buscar: </span>
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
      </div> -->
      <div
        class="tab-pane fade show active"
        id="home"
        role="tabpanel"
        aria-labelledby="home-tab"
      >
        <div v-if="showView">
          <DataTableComponent
            v-if="!arrayDataPublicacion.loading"
            rowId="id"
            :columns="columns"
            :data="arrayDataPublicacion.data"
            :pagination="arrayDataPublicacion.pagination"
            :showDelete="true"
            :showEdit="true"
            :row-select="true"
            :fixed-actions="true"
            :prefix="publicacionPrefix"
            @onPaginate="handlePaginate"
            @onEdit="handleEdit"
            @onDelete="handleDelete"
            @onCreate="handleCreate"
            @onGetID="(data) => (publicacionId = data.id)"
          />
        </div>
      </div>
      <div
        class="tab-pane fade"
        id="libro_tab"
        role="tabpanel"
        aria-labelledby="libro_tab-tab"
      >
        <DataTableComponent
          v-if="!arrayDataLibro.loading && publicacionId"
          rowId="id"
          :columns="columnsLibro"
          :data="arrayDataLibro.data"
          :pagination="arrayDataLibro.pagination"
          :showDelete="true"
          :showEdit="true"
          :row-select="true"
          :fixed-actions="true"
          :prefix="libroPrefix"
          @onPaginate="handlePaginateLibro"
          @onEdit="handleEdit"
          @onDelete="handleDelete"
          @onCreate="handleCreate"
          @onGetID="(data) => (libroId = data.id)"
        />
      </div>
      <div
        class="tab-pane fade"
        id="temas_tab"
        role="tabpanel"
        aria-labelledby="temas_tab-tab"
      >
        <DataTableComponent
          v-if="!arrayDataTemas.loading && libroId"
          rowId="id"
          :columns="columnsTemas"
          :data="arrayDataTemas.data"
          :pagination="arrayDataTemas.pagination"
          :showDelete="true"
          :showEdit="true"
          :row-select="true"
          :fixed-actions="true"
          :prefix="temaPrefix"
          @onPaginate="handlePaginateTemas"
          @onEdit="handleEdit"
          @onDelete="handleDelete"
          @onCreate="handleCreate"
          @onGetID="(data) => (temaId = data.id)"
        />
      </div>
      <div
        class="tab-pane fade"
        id="parte_tab"
        role="tabpanel"
        aria-labelledby="parte_tab-tab"
      >
        <DataTableComponent
          v-if="!arrayDataParte.loading && temaId"
          rowId="id"
          :columns="columnsParte"
          :data="arrayDataParte.data"
          :pagination="arrayDataParte.pagination"
          :showDelete="true"
          :showEdit="true"
          :row-select="true"
          :fixed-actions="true"
          :prefix="partePrefix"
          @onPaginate="handlePaginateParte"
          @onEdit="handleEdit"
          @onDelete="handleDelete"
          @onCreate="handleCreate"
          @onGetID="(data) => (parteId = data.id)"
        />
      </div>
      <div
        class="tab-pane fade"
        id="titulo_tab"
        role="tabpanel"
        aria-labelledby="titulo_tab-tab"
      >
        <DataTableComponent
          v-if="!arrayDataTitulo.loading && parteId"
          rowId="id"
          :columns="columnsTitulo"
          :data="arrayDataTitulo.data"
          :pagination="arrayDataTitulo.pagination"
          :showDelete="true"
          :showEdit="true"
          :row-select="true"
          :fixed-actions="true"
          :prefix="tituloPrefix"
          @onPaginate="handlePaginateTitulo"
          @onEdit="handleEdit"
          @onDelete="handleDelete"
          @onCreate="handleCreate"
          @onGetID="(data) => (tituloId = data.id)"
        />
      </div>
      <div
        class="tab-pane fade"
        id="capitulo_tab"
        role="tabpanel"
        aria-labelledby="capitulo_tab-tab"
      >
        <DataTableComponent
          v-if="!arrayDataCapitulo.loading && tituloId"
          rowId="id"
          :columns="columnsCapitulo"
          :data="arrayDataCapitulo.data"
          :pagination="arrayDataCapitulo.pagination"
          :showDelete="true"
          :showEdit="true"
          :row-select="true"
          :fixed-actions="true"
          :prefix="capituloPrefix"
          @onPaginate="handlePaginateCapitulo"
          @onEdit="handleEdit"
          @onDelete="handleDelete"
          @onCreate="handleCreate"
          @onGetID="(data) => (capitulo = data)"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, onBeforeUnmount } from "vue";
import usePetition from "@/composables/usePetition";
import DataTableComponent from "@/components/DataTableComponent.vue";
import ButtonBarComponent from "@/components/ButtonBarComponent.vue";
import TituloForm from "@/components/forms/Titulo.vue";
import CapituloForm from "@/components/forms/Capitulo.vue";
import PublicacionForm from "@/components/forms/Publicacion.vue";
import { IPublicacion } from "@/utils/models/cat_publicaciones";
import LibroForm from "@/components/forms/Libro.vue";
import { ILibro } from "@/utils/models/cat_libros";
import TemaForm from "@/components/forms/Tema.vue";
import { ITema } from "@/utils/models/cat_temas";
import ParteForm from "@/components/forms/Parte.vue";
import Etiquetas from "@/views/Cat_Conceptos/Etiquetas/Index.vue";
import { IParte } from "@/utils/models/cat_partes";
import {
  ITitulo,
  defaultValues as defaultValuesTitulo,
} from "@/utils/models/cat_titulos";
import {
  ICapitulo,
  defaultValues as defaultValuesCapitulo,
} from "@/utils/models/cat_capitulos";
import router from "@/router";
/* import Modal from "@/components/Modals.vue"; */
import Modal from "@/components/ModalWithoutButton.vue";
import {
  addClickListener,
  removeClickListener,
} from "@/utils/listeners/clickListener";

// forms

const viewName = ref("Publicaciones");
const selectedCat = ref("cat_publicacion/");
/* Consultas  */
const {
  arrayData: arrayDataPublicacion,
  getDatas: getDatasPublicacion,
  getData: getDataPublicacion,
  searchData: searchDataPublicacion,
  createData: createDataPublicacion,
  updateData: updateDataPublicacion,
  deleteData: deleteDataPublicacion,
} = usePetition("cat_publicacion/");
const {
  arrayData: arrayDataLibro,
  getDatas: getDatasLibro,
  getData: getDataLibro,
  searchData: searchDataLibro,
  createData: createDataLibro,
  updateData: updateDataLibro,
  deleteData: deleteDataLibro,
} = usePetition("cat_libro/");
const {
  arrayData: arrayDataTemas,
  getDatas: getDatasTemas,
  getData: getDataTemas,
  searchData: searchDataTemas,
  createData: createDataTemas,
  updateData: updateDataTemas,
  deleteData: deleteDataTemas,
} = usePetition("cat_tema/");
const {
  arrayData: arrayDataParte,
  getDatas: getDatasParte,
  getData: getDataParte,
  searchData: searchDataParte,
  createData: createDataParte,
  updateData: updateDataParte,
  deleteData: deleteDataParte,
} = usePetition("cat_parte/");
const {
  arrayData: arrayDataTitulo,
  getDatas: getDatasTitulo,
  getData: getDataTitulo,
  searchData: searchDataTitulo,
  createData: createDataTitulo,
  updateData: updateDataTitulo,
  deleteData: deleteDataTitulo,
} = usePetition("cat_titulo/");
const {
  arrayData: arrayDataCapitulo,
  getDatas: getDatasCapitulo,
  getData: getDataCapitulo,
  searchData: searchDataCapitulo,
  createData: createDataCapitulo,
  updateData: updateDataCapitulo,
  deleteData: deleteDataCapitulo,
} = usePetition("cat_capitulo/");

const publicacionPrefix = "publicacion";
const publicacionId = ref("");
const libroPrefix = "libro";
const libroId = ref("");
const temaPrefix = "tema";
const temaId = ref("");
const partePrefix = "parte";
const parteId = ref("");
const tituloPrefix = "titulo";
const tituloId = ref("");
const capituloPrefix = "capitulo";
const capitulo = ref<ICapitulo | null>(null);

const searchTerm = ref("");
const idRow = ref("");
const selectedProyect = ref("");
const showView = ref(false);
const isEditing = ref(false);
const isDeleting = ref(false);
const modal = ref(false);
const modalEtiquetas = ref(false);
const modalDelete = ref(false);

const handleCreate = () => router.push({ name: "crear-proyecto_de_inversion" });

//Edit
const existingPublicacionData = ref<IPublicacion | null>(null);
const existingLibroData = ref<ILibro | null>(null);
const existingTemaData = ref<ITema | null>(null);
const existingParteData = ref<ITema | null>(null);
const existingTituloData = ref<ITema | null>(null);
const existingCapituloData = ref<ITema | null>(null);

const fetchDataAndSetExistingData = async (
  data: any,
  existingData: any,
  getDataFunction: Function
) => {
  await getDataFunction(data).then((response: any) => {
    existingData.value = { ...response };
    isEditing.value = true;
    modal.value = true;
  });
};

const handleEdit = (data: any) => {
  switch (viewName.value) {
    case "Publicaciones":
      fetchDataAndSetExistingData(
        data,
        existingPublicacionData,
        getDataPublicacion
      );
      break;
    case "Libros":
      fetchDataAndSetExistingData(data, existingLibroData, getDataLibro);
      break;
    case "Temas":
      fetchDataAndSetExistingData(data, existingTemaData, getDataTemas);
      break;
    case "Parte":
      fetchDataAndSetExistingData(data, existingParteData, getDataParte);
      break;
    case "Titulos":
      fetchDataAndSetExistingData(data, existingTituloData, getDataTitulo);
      break;
    case "Capitulos":
      fetchDataAndSetExistingData(data, existingCapituloData, getDataCapitulo);
      break;
    default:
      console.error(`Tipo de formulario no reconocido: ${viewName.value}`);
  }
};

const dataDelete = ref({
  descripcion: "",
  id: "",
});
const handleDelete = (data: any) => {
  switch (viewName.value) {
    case "Publicaciones":
      // Llamada para obtener los datos actualizados de la publicación
      getDataPublicacion(data).then((response: any) => {
        // Actualizar existingPublicacionData con los datos obtenidos
        dataDelete.value.descripcion = response.descripcion; // Asegúrate de que los campos coincidan con el modelo de IPublicacion
        dataDelete.value.id = response.id;
        isDeleting.value = true;
        modalDelete.value = true;
      });
      break;
    case "Libros":
      getDataLibro(data).then((response: any) => {
        dataDelete.value.descripcion = response.descripcion; // Asegúrate de que los campos coincidan con el modelo de IPublicacion
        dataDelete.value.id = response.id;
        modalDelete.value = true;
      });
      break;
    case "Temas":
      getDataTemas(data).then((response: any) => {
        dataDelete.value.descripcion = response.descripcion; // Asegúrate de que los campos coincidan con el modelo de IPublicacion
        dataDelete.value.id = response.id;
        isDeleting.value = true;
        modalDelete.value = true;
      });
      break;
    case "Parte":
      getDataParte(data).then((response: any) => {
        dataDelete.value.descripcion = response.descripcion; // Asegúrate de que los campos coincidan con el modelo de IPublicacion
        dataDelete.value.id = response.id;
        isDeleting.value = true;
        modalDelete.value = true;
      });
      break;
    case "Titulos":
      getDataTitulo(data).then((response: any) => {
        dataDelete.value.descripcion = response.descripcion;
        dataDelete.value.id = response.id;
        isDeleting.value = true;
        modalDelete.value = true;
      });
      break;
    case "Capitulos":
      getDataCapitulo(data).then((response: any) => {
        dataDelete.value.descripcion = response.descripcion;
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
//Catalogo publicacion
const handlePublicacion = () => {
  viewName.value = "Publicaciones";
  selectedCat.value = "cat_publicacion/";
  libroId.value = "";
  temaId.value = "";
  parteId.value = "";
  tituloId.value = "";
};
//Catalogo libros
const handleLibros = () => {
  if (viewName.value !== "Libros" && libroId.value === "") {
    searchDataLibro({ page: 1, search: publicacionId.value });
  }
  viewName.value = "Libros";
  selectedCat.value = "cat_libro/";
  temaId.value = "";
  parteId.value = "";
  tituloId.value = "";
};
const handlePaginateLibro = (page: number) => {
  if (searchTerm.value) {
    searchDataLibro({ page: page, search: searchTerm.value });
  } else {
    getDatasLibro({ page });
  }
};
//Catalogo Temas
const handleTemas = () => {
  if (viewName.value !== "Temas" && temaId.value === "") {
    searchDataTemas({ page: 1, search: libroId.value });
  }
  viewName.value = "Temas";
  selectedCat.value = "cat_tema/";
  parteId.value = "";
  tituloId.value = "";
};
const handlePaginateTemas = (page: number) => {
  if (searchTerm.value) {
    searchDataTemas({ page: page, search: searchTerm.value });
  } else {
    getDatasTemas({ page });
  }
};
//Catalogo Parte
const handleParte = () => {
  searchDataParte({ page: 1, search: temaId.value });
  viewName.value = "Parte";
  selectedCat.value = "cat_parte/";
  tituloId.value = "";
};
const handlePaginateParte = (page: number) => {
  if (searchTerm.value) {
    searchDataParte({ page: page, search: searchTerm.value });
  } else {
    getDatasParte({ page });
  }
};
//Catalogo titulo
const handleTitulo = () => {
  searchDataTitulo({ page: 1, search: parteId.value });
  viewName.value = "Titulos";
  selectedCat.value = "cat_titulo/";
};
const handlePaginateTitulo = (page: number) => {
  if (searchTerm.value) {
    searchDataTitulo({ page: page, search: searchTerm.value });
  } else {
    getDatasTitulo({ page, search: parteId.value });
  }
};
//Catalogo capitulo
const handleCapitulo = () => {
  searchDataCapitulo({ page: 1, search: tituloId.value });
  viewName.value = "Capitulos";
  selectedCat.value = "cat_capitulo/";
};
const handlePaginateCapitulo = (page: number) => {
  if (searchTerm.value) {
    searchDataCapitulo({ page: page, search: searchTerm.value });
  } else {
    getDatasCapitulo({ page, search: tituloId.value });
  }
};

const handlePaginate = (page: number) => {
  if (searchTerm.value) {
    searchDataPublicacion({ page: page, search: searchTerm.value });
  } else {
    getDatasPublicacion({ page });
  }
};

const openModal = () => {
  existingPublicacionData.value = null;
  existingLibroData.value = null;
  existingTemaData.value = null;
  existingParteData.value = null;
  existingTituloData.value = null;
  existingCapituloData.value = null;
  isEditing.value = false;
  modal.value = true;
};

// const handleFilter = () => {
//   let searchFilter = "";
//   if (cbEntidad.value.length) searchFilter += cbEntidad.value;
//   if (cbUnidad.value.length) {
//     if (searchFilter.length) searchFilter += " ,";
//     searchFilter += cbEntidad.value;
//   }
//   if (inputSolicitud.value.length) {
//     if (searchFilter.length) searchFilter += " ,";
//     searchFilter += inputSolicitud.value;
//   }
//   searchDataPublicacion({ page: 1, search: searchFilter });
// };

// const cbEntidad = ref<string>("");
// const cbUnidad = ref<string>("");
// const inputSolicitud = ref<string>("");
/* const saveActionTrigger = () => {
  modal.value = !modal.value;
  console.log(modal.value);
  if (viewName.value === "Publicaciones") {
    console.log(`ViewName: ${viewName.value}`);
    console.log(dynamicComponent);
  }
}; */
//Publicacion
const savedPublicacionData = ref<IPublicacion>({
  descripcion: "",
  tipo: "",
});
const dataPublicacionForm = (dataPublicacion: IPublicacion) => {
  savedPublicacionData.value = dataPublicacion;
};
//Libros
const savedLibroData = ref<ILibro>({
  descripcion: "",
  libro: "",
  publicacion: "",
});
const dataLibroForm = (dataLibro: ILibro) => {
  savedLibroData.value = dataLibro;
};
//Temas
const savedTemaData = ref<ITema>({
  descripcion: "",
  libro: "",
  publicacion: "",
  tema: "",
});
const dataTemaForm = (dataTema: ITema) => {
  savedTemaData.value = dataTema;
};
//Partes
const savedParteData = ref<IParte>({
  descripcion: "",
  libro: "",
  publicacion: "",
  tema: "",
});
const dataParteForm = (dataParte: IParte) => {
  savedParteData.value = dataParte;
};
//Titulos
const savedTituloData = ref<ITitulo>(defaultValuesTitulo);
const dataTituloForm = (dataTitulo: ITitulo) => {
  savedTituloData.value = dataTitulo;
};
//Capitulos
const savedCapituloData = ref<ICapitulo>(defaultValuesCapitulo);
const dataCapituloForm = (dataCapitulo: ICapitulo) => {
  savedCapituloData.value = dataCapitulo;
};

const saveForm = async () => {
  switch (viewName.value) {
    case "Publicaciones":
      if (isEditing.value) {
        // Llama a la función correspondiente para editar los datos existentes
        await updateDataPublicacion(savedPublicacionData.value);
        searchDataPublicacion({ page: 1, search: searchTerm.value });
      } else {
        // Llama a la función correspondiente para crear nuevos datos
        await createDataPublicacion(savedPublicacionData.value);
        searchDataPublicacion({ page: 1, search: searchTerm.value });
      }
      break;
    case "Libros":
      savedLibroData.value.publicacion = `${publicacionId.value}`;
      if (isEditing.value) {
        await updateDataLibro(savedLibroData.value);
        await searchDataLibro({ page: 1, search: publicacionId.value });
      } else {
        await createDataLibro(savedLibroData.value);
        await searchDataLibro({ page: 1, search: publicacionId.value });
      }
      break;
    case "Temas":
      savedTemaData.value.publicacion = `${publicacionId.value}`;
      savedTemaData.value.libro = `${libroId.value}`;
      if (isEditing.value) {
        await updateDataTemas(savedTemaData.value);
        await searchDataTemas({ page: 1, search: libroId.value });
      } else {
        await createDataTemas(savedTemaData.value);
        await searchDataTemas({ page: 1, search: libroId.value });
      }
      break;
    case "Parte":
      savedParteData.value.publicacion = `${publicacionId.value}`;
      savedParteData.value.libro = `${libroId.value}`;
      savedParteData.value.tema = `${temaId.value}`;
      if (isEditing.value) {
        await updateDataParte(savedParteData.value);
        await searchDataParte({ page: 1, search: temaId.value });
      } else {
        await createDataParte(savedParteData.value);
        await searchDataParte({ page: 1, search: temaId.value });
      }
      break;
    case "Titulos":
      savedTituloData.value.publicacion = `${publicacionId.value}`;
      savedTituloData.value.libro = `${libroId.value}`;
      savedTituloData.value.tema = `${temaId.value}`;
      savedTituloData.value.parte = `${parteId.value}`;
      if (isEditing.value) {
        await updateDataTitulo(savedTituloData.value);
        await searchDataTitulo({ page: 1, search: parteId.value });
      } else {
        await createDataTitulo(savedTituloData.value);
        await searchDataTitulo({ page: 1, search: parteId.value });
      }
      break;
    case "Capitulos":
      savedCapituloData.value.publicacion = `${publicacionId.value}`;
      savedCapituloData.value.libro = `${libroId.value}`;
      savedCapituloData.value.tema = `${temaId.value}`;
      savedCapituloData.value.parte = `${parteId.value}`;
      savedCapituloData.value.titulo = `${tituloId.value}`;
      if (isEditing.value) {
        await updateDataCapitulo(savedCapituloData.value);
        await searchDataCapitulo({ page: 1, search: tituloId.value });
      } else {
        await createDataCapitulo(savedCapituloData.value);
        await searchDataCapitulo({ page: 1, search: tituloId.value });
      }
      break;
    default:
      console.error(`Tipo de formulario no reconocido: ${viewName.value}`);
  }
  isEditing.value = false;
};
const deleteForm = async () => {
  switch (viewName.value) {
    case "Publicaciones":
      await deleteDataPublicacion(dataDelete.value.id);
      await searchDataPublicacion({ page: 1, search: searchTerm.value });
      break;
    case "Libros":
      await deleteDataLibro(dataDelete.value.id);
      await searchDataLibro({ page: 1, search: publicacionId.value });
      break;
    case "Temas":
      await deleteDataTemas(dataDelete.value.id);
      await searchDataTemas({ page: 1, search: libroId.value });
      break;
    case "Parte":
      await deleteDataParte(dataDelete.value.id);
      await searchDataParte({ page: 1, search: temaId.value });
      break;
    case "Titulos":
      await deleteDataTitulo(dataDelete.value.id);
      await searchDataTitulo({ page: 1, search: parteId.value });
      break;
    case "Capitulos":
      await deleteDataCapitulo(dataDelete.value.id);
      await searchDataCapitulo({ page: 1, search: tituloId.value });
      break;
    default:
      console.error(`Tipo de formulario no reconocido: ${viewName.value}`);
  }
  isDeleting.value = false;
};

//Colunas
const columns = [
  { title: "Publicacion", data: "id", align: "center" },
  { title: "Tipo", data: "tipo", align: "center" },
  { title: "Descripción de Publicaciones", data: "descripcion", align: "left" },
];
const columnsLibro = [
  { title: "Publicacion", data: "publicacion", align: "center" },
  { title: "Libro", data: "id", align: "center" },
  { title: "Libro", data: "libro", align: "center" },
  { title: "Descripción de Libro", data: "descripcion", align: "left" },
];
const columnsTemas = [
  { title: "Publicacion", data: "publicacion", align: "center" },
  { title: "Libro", data: "libro", align: "center" },
  { title: "Tema", data: "id", align: "center" },
  { title: "Tema", data: "tema", align: "center" },
  { title: "Descripción de Tema", data: "descripcion", align: "left" },
];
const columnsParte = [
  { title: "Publicacion", data: "publicacion", align: "center" },
  { title: "Libro", data: "libro", align: "center" },
  { title: "Tema", data: "tema", align: "center" },
  { title: "Parte", data: "id", align: "center" },
  { title: "Descripción de Parte", data: "descripcion", align: "left" },
];
const columnsTitulo = [
  { title: "Publicacion", data: "publicacion", align: "center" },
  { title: "Libro", data: "libro", align: "center" },
  { title: "Tema", data: "tema", align: "center" },
  { title: "Parte", data: "parte", align: "center" },
  { title: "Titulo", data: "id", align: "center" },
  { title: "Descripción titulo", data: "descripcion", align: "left" },
];
const columnsCapitulo = [
  { title: "Publicacion", data: "publicacion", align: "center" },
  { title: "Libro", data: "libro", align: "center" },
  { title: "Tema", data: "tema", align: "center" },
  { title: "Parte", data: "parte", align: "center" },
  { title: "Titulo", data: "titulo", align: "center" },
  { title: "Capitulo", data: "id", align: "center" },
  { title: "Escalatoria", data: "tipo_escalatoria", align: "center" },
  { title: "Descripción capitulo", data: "descripcion", align: "left" },
];

onMounted(async () => {
  await getDatasPublicacion({ page: 1 }).then(() => {
    showView.value = true;
  });
  addClickListener(handleClick);
});
onBeforeUnmount(() => {
  removeClickListener(handleClick);
});
</script>
