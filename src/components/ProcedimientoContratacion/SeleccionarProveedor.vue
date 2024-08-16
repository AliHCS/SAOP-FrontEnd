<template>
    <div>
        <div :class="{ 'show modal-backdrop': isModalOpen }" v-if="isModalOpen"></div>
        <div class="modal fade overflow-auto" :class="{ ' show ': isModalOpen }" v-if="isModalOpen">
            <div :class="['modal-dialog', 'modal-xl']" role="document">
                <div class="modal-content">
                    <div class="custom-modal-header">
                        <h4 class="custom-modal-title">Selección de proveedor</h4>
                        <button type="button" class="close" aria-label="Close" @click="closeModal">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <!-- filtros -->
                        <div class="row pt-5">
                            <div class="col-md-7">
                                <input v-model="searchNombre" class="form-control" placeholder="Nombre" type="text"
                                    @keyup.enter="search()" />
                            </div>
                            <div class="col-md-5">
                                <select v-model="selectTrabajo" class="form-select form-control" @change="search(true)">
                                    <option v-for="filter in FILTER_OPTIONS_TEXT" :key="filter.id" :value="filter.id">
                                        {{ filter.name }}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div class="row py-1">
                            <div class="col-md-7">
                                <input v-model="searchDescripcion" class="form-control" placeholder="Nombre comercial" type="text"
                                    @keyup.enter="search()" />
                            </div>
                            <div class="col-md-5">
                                <select v-model="selectDescripcion" class="form-select form-control" @change="search(true)">
                                    <option v-for="filter in FILTER_OPTIONS_TEXT" :key="filter.id" :value="filter.id">
                                        {{ filter.name }}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div class="row py-1 pb-5">
                            <div class="col-md-7">
                                <input v-model="searchObra" class="form-control" placeholder="RFC" type="text"
                                    @keyup.enter="search()" />
                            </div>
                            <div class="col-md-5">
                                <select v-model="selectObra" class="form-select form-control" @change="search(true)">
                                    <option v-for="filter in FILTER_OPTIONS_TEXT" :key="filter.id" :value="filter.id">
                                        {{ filter.name }}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div v-if="loading" class="text-center">
                            <div class="spinner-border spinner" style="width: 3rem; height: 3rem;" role="status">
                                <span class="sr-only">Loading...</span>
                            </div>
                        </div>
                        <div v-else>
                            <DataTableComponent v-if="!arrayData.loading && decoratedData" rowId="id" :columns="columns"
                                :data="arrayData.data" :pagination="arrayData.pagination" hideActions
                                @onPaginate="handlePaginate" @onGetID="handleRowClick" />
                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" @click="closeModal">
                                Cerrar
                            </button>
                            <button type="button" class="btn btn-primary active" @click="closeAndSaveModal">
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
import { FILTER_OPTIONS_TEXT } from "@/utils/constants/filterOptions.ts"

const emit = defineEmits(["onSave", "onCloseModal"]);

const { arrayData, getDatas, searchData } = usePetition("cat_proveedor/");
// const { arrayData: arrayDataStatus, getDatas: getDatasStatus } = usePetition("cat_estatus/");

const isModalOpen = ref(true);
const decoratedData = ref<boolean>(false);
const proveedorSeleccionado = ref();
const searchNombre = ref("")
const searchDescripcion = ref("")
const searchObra = ref("")
const loading = ref(true)
// const estatusLiberado = ref()

const selectTrabajo = ref("igual")
const nombreParams:any = {
    contiene: 'nombre__icontains',
    comienza: 'nombre__istartswith',
    igual: 'nombre__iexact',
    termina: 'nombre__iendswith'
}

const selectDescripcion = ref("igual")
const nombreComercialParams:any = {
    contiene: 'nombre_comercial__icontains',
    comienza: 'nombre_comercial__istartswith',
    igual: 'nombre_comercial__iexact',
    termina: 'nombre_comercial__iendswith'
}
const selectObra = ref("igual")
const rfcParams:any = {
    contiene: 'rfc__icontains',
    comienza: 'rfc__istartswith',
    igual: 'rfc__iexact',
    termina: 'rfc__iendswith'
}
const columns = [
    { title: "Proveedor", data: "id", align: "left" },
    { title: "Nombre", data: "nombre", align: "left" },
    { title: "Nombre comercial", data: "nombre_comercial", align: "left" },
    { title: "RFC", data: "rfc", align: "left" },
];

const closeModal = () => {
    isModalOpen.value = false;
    emit("onCloseModal");
};
const closeAndSaveModal = () => {
    isModalOpen.value = false;
    emit("onCloseModal");
    emit("onSave", proveedorSeleccionado);
};

const handlePaginate = (page: number) => {
    loading.value = true
    if (searchNombre.value || searchDescripcion.value || searchObra.value) {
        let params:any = { page:page }
        if (searchNombre.value) params[nombreParams[selectTrabajo.value]] = searchNombre.value
        if (searchDescripcion.value) params[nombreComercialParams[selectDescripcion.value]] = searchDescripcion.value
        if (searchObra.value) params[rfcParams[selectObra.value]] = searchObra.value
        searchData(params);
    } else {
        getDecoratedDatas(page);
    }
    loading.value = false
};

const search = (fromCb = false) => {
    if (fromCb && !searchNombre.value && !searchDescripcion.value && !searchObra.value) return
    loading.value = true
    let params:any = { page:1 }
    if (searchNombre.value) params[nombreParams[selectTrabajo.value]] = searchNombre.value
    if (searchDescripcion.value) params[nombreComercialParams[selectDescripcion.value]] = searchDescripcion.value
    if (searchObra.value) params[rfcParams[selectObra.value]] = searchObra.value

    searchData(params).then(() => {
        arrayData.value.data.forEach((row: any) => {
            
            let entidad = entidades.value.data.find((entidad: any) => row.entidad_federativa == entidad.id);
            let proyecto = proyectos.value.data.find((proyecto: any) => row.cartera_proyecto_inversion == proyecto.id);

            row.entidad_federativa_desc = entidad ? entidad.descripcion_corta : "";
            row.cartera_proyecto_inversion_desc = proyecto ? proyecto.nombre : "";
            row.no_solicitud = proyecto ? proyecto.no_solicitud : "";
            row.proyecto = proyecto ? proyecto.nombre : "";
            row.estatus_trabajo = 'LIBERADO'
            row.id_proyecto = proyecto ? proyecto.id : "";
            row.unidad_responsable = proyecto ? proyecto.unidad_responsable : "";
            decoratedData.value = true;
        });
        loading.value = false
    });
};

const handleRowClick = (rowData: any) => {
    proveedorSeleccionado.value = rowData
};

const { getDatas: getDatasEntidadFederativa, arrayData: entidades } =usePetition("cat_entidad_federativa/");
const { getDatas: getDatasCartera, arrayData: proyectos } = usePetition("cartera_proyectos_inversion/");

const getDecoratedDatas = (page = 1, size = 10) => {
    decoratedData.value = false;

    // Obtiene todos
    getDatas({ page, size, estatus_trabajo__descripcion__iexact: 'liberado' }).then(() => {
        arrayData.value.data.forEach((row: any) => {
            
            let entidad = entidades.value.data.find((entidad: any) => row.entidad_federativa == entidad.id);
            let proyecto = proyectos.value.data.find((proyecto: any) => row.cartera_proyecto_inversion == proyecto.id);

            row.entidad_federativa_desc = entidad ? entidad.descripcion_corta : "";
            row.cartera_proyecto_inversion_desc = proyecto ? proyecto.nombre : "";
            row.no_solicitud = proyecto ? proyecto.no_solicitud : "";
            row.proyecto = proyecto ? proyecto.nombre : "";
            row.id_proyecto = proyecto ? proyecto.id : "";
            row.unidad_responsable = proyecto ? proyecto.unidad_responsable : "";
            row.estatus_trabajo = 'LIBERADO'//estatusLiberado.value.descripcion
            decoratedData.value = true;
        });
    });
};

onMounted(async () => {
    await Promise.all([
        getDatasEntidadFederativa({ page: 1, size: 100 }),
        getDatasCartera({ page: 1 }),
        // getDatasStatus({ page:1 }).then(() => {
        //     estatusLiberado.value = arrayDataStatus.value.data.find((estatus:any) => estatus.descripcion.toLowerCase() == 'liberado')
        // })
    ]);
    getDecoratedDatas();
    loading.value = false
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