<template>
  <div>
    <ul class="nav nav-tabs" id="tabs" role="tablist">
      <li class="nav-item" role="presentation">
        <button
          class="nav-link active"
          id="trabajos-tab"
          data-bs-toggle="tab"
          data-bs-target="#trabajos"
          type="button"
          role="tab"
          aria-controls="trabajos"
          aria-selected="true"
        >
          Trabajos
        </button>
      </li>
    </ul>
    <div class="tab-content" id="tabsContent">
      <div
        class="tab-pane fade show active"
        id="trabajos"
        role="tabpanel"
        aria-labelledby="trabajos-tab"
      >
        <Transition name="view">
          <div>
            <h4 class="view-name">{{ viewName }}</h4>
            <hr class="red" />
            <div class="row app-options-bar">
              <div class="col-md-4 col-sm-12 buttons-component">
                <ButtonBarComponent
                  @onCreate="handleCreate"
                  customLabel="Carga masiva"
                  showCustomButton
                  :show-subactions="false"
                  @onCustom="router.push({ name: 'carga-masiva-trabajos' })"
                />
              </div>
              <div class="col-md-6 col-sm-12">
                <Modal
                  title="Liberar a CSCT"
                  saveButtonTitle="Aprobar"
                  openButtonTittle="Liberar a CSCT"
                  sizeModal="lg"
                  :typeOpenButtonTittle="false"
                  @onSaveButton="liberarCSCT(idRow)"
                >
                  <div class="card">
                    <div class="card-body">
                      <p class="card-text text-center">
                        ¿Estas seguro de liberar este trabajo?
                      </p>
                    </div>
                  </div>
                </Modal>
              </div>
              <div class="col-md-12 col-sm-12 search-component">
                <SearchComponent
                  @onSearch="handleSearch"
                  search-placeholder="No. Obra o solicitud"
                />
              </div>
            </div>
            <DataTableComponent
              v-if="!arrayData.loading && decoratedData"
              rowId="id"
              :columns="columns"
              :data="arrayData.data"
              :pagination="arrayData.pagination"
              showDelete
              showEdit
              @onPaginate="handlePaginate"
              @onEdit="handleEdit"
              @onDelete="handleDelete"
              @onCreate="handleCreate"
              @onGetID="handleRowClick"
            />
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import usePetition from "@/composables/usePetition";
import DataTableComponent from "@/components/DataTableComponent.vue";
import router from "@/router";
import SearchComponent from "@/components/SearchComponent.vue";
import ButtonBarComponent from "@/components/ButtonBarComponent.vue";
import Modal from "@/components/Modals.vue";
import useAlert from "@/composables/useAlert";

const { showAlertSuccess, showAlertError } = useAlert();
const viewName = "Trabajos";
const { arrayData, getDatas, searchData } = usePetition("trabajo/");
const searchText = ref<string>("");
const decoratedData = ref<boolean>(false);
const idRow = ref<string>("");
const handleCreate = () => router.push({ name: "crear-trabajos" });
const handleEdit = (data: any) =>
  router.push({ name: "editar-trabajos", params: { id: data } });
const handleDelete = (data: any) =>
  router.push({ name: "eliminar-trabajos", params: { id: data } });

const handlePaginate = (page: number) => {
  if (searchText.value) {
    searchData({ page: page, search: searchText.value });
  } else {
    getDecoratedDatas(page);
  }
};

const handleSearch = (term: any) => {
  searchText.value = term;
  decoratedData.value = false;
  searchData({ page: 1, search: term }).then(() => {
    arrayData.value.data.forEach((row: any) => {
      let entidad = entidades.value.data.find(
        (entidad: any) => row.entidad_federativa == entidad.id
      );
      let proyecto = proyectos.value.data.find(
        (proyecto: any) => row.cartera_proyecto_inversion == proyecto.id
      );
      row.entidad_federativa_desc = entidad ? entidad.descripcion_corta : "";
      row.cartera_proyecto_inversion_desc = proyecto ? proyecto.nombre : "";
      decoratedData.value = true;
    });
  });
};

const columns = [
  { title: "Entidad", data: "entidad_federativa_desc", align: "center" },
  { title: "Área", data: "descripcion", align: "left" },
  { title: "Proyecto", data: "cartera_proyecto_inversion_desc", align: "left" },
  { title: "No. Obra", data: "numero_obra", align: "left" },
  { title: "Ruta", data: "region", align: "left" },
  { title: "No. Solicitud", data: "no_solicitud", align: "left" },
];

const getDecoratedDatas = (page = 1, size = 10) => {
  decoratedData.value = false;
  getDatas({ page, size }).then(() => {
    arrayData.value.data.forEach((row: any) => {
      let entidad = entidades.value.data.find(
        (entidad: any) => row.entidad_federativa == entidad.id
      );
      let proyecto = proyectos.value.data.find(
        (proyecto: any) => row.cartera_proyecto_inversion == proyecto.id
      );
      row.entidad_federativa_desc = entidad ? entidad.descripcion_corta : "";
      row.cartera_proyecto_inversion_desc = proyecto ? proyecto.nombre : "";
      row.no_solicitud = proyecto ? proyecto.no_solicitud : "";
      decoratedData.value = true;
    });
  });
};

const { getDatas: getDatasEntidadFederativa, arrayData: entidades } =
  usePetition("cat_entidad_federativa/");
const { getDatas: getDatasCartera, arrayData: proyectos } = usePetition(
  "cartera_proyectos_inversion/"
);

const handleRowClick = (rowData: any) => {
  // Obtén el ID del registro seleccionado
  // Realiza las operaciones necesarias con el ID del registro seleccionado
  idRow.value = rowData.id;
};

const liberarCSCT = async (id: string) => {
  if (id === "") {
    showAlertError("¡Error! No haz seleccionado un trabajo.");
  } else {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_API}trabajo/${id}/aprobar/`,
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
      } else {
        showAlertSuccess("¡Éxito! El trabajo ha sido liberado correctamente.");
      }
    } catch (error) {
      console.log(error);
    }
  }
};

onMounted(async () => {
  await Promise.all([
    getDatasEntidadFederativa({ page: 1, size: 100 }),
    getDatasCartera({ page: 1 }),
  ]);
  getDecoratedDatas();
});
</script>
<style lang="scss" scoped></style>
