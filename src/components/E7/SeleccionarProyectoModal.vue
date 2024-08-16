<template>
    <div>
        <div :class="{ 'show modal-backdrop': isModalOpen }" v-if="isModalOpen"></div>
        <div class="modal fade overflow-auto" :class="{ ' show ': isModalOpen }" v-if="isModalOpen">
            <div :class="['modal-dialog', 'modal-xl']" role="document">
                <div class="modal-content">
                    <div class="custom-modal-header">
                        <h4 class="custom-modal-title">Selección de proyectos</h4>
                        <button type="button" class="close" aria-label="Close" @click="closeModal">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <!-- filtros -->
                        <div class="row pt-5">
                            <div class="col-md-7">
                                <input v-model="searchSolicitud" class="form-control" placeholder="No. Solicitud" type="text"
                                    @keyup.enter="search()" />
                            </div>
                            <div class="col-md-5">
                                <select v-model="selectSolicitud" class="form-select form-control" @change="search(true)">
                                    <option v-for="filter in FILTER_OPTIONS_NUMERIC" :key="filter.id" :value="filter.id">
                                        {{ filter.name }}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div class="row py-1 pb-5">
                            <div class="col-md-7">
                                <input v-model="searchProyecto" class="form-control" placeholder="Nombre Proyecto" type="text"
                                    @keyup.enter="search()" />
                            </div>
                            <div class="col-md-5">
                                <select v-model="selectProyecto" class="form-select form-control" @change="search(true)">
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
                            <DataTableComponent v-if="!arrayData.loading" rowId="id" :columns="columns"
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
import { FILTER_OPTIONS_TEXT, FILTER_OPTIONS_NUMERIC } from "@/utils/constants/filterOptions.ts"

const emit = defineEmits(["onSave", "onCloseModal"]);

const { arrayData, getDatas, searchData } = usePetition("cartera_proyectos_inversion/");

const isModalOpen = ref(true);
const proyectoSeleccionado = ref();

const searchSolicitud = ref("")
const searchProyecto = ref("")

const loading = ref(true)

const selectSolicitud = ref("igual")
const solicitudParams:any = {
    mayor_igual: 'no_solicitud__gte',
    mayor: 'no_solicitud__gt',
    igual: 'no_solicitud',
    menor: 'no_solicitud__lt',
    menor_igual: 'no_solicitud__lte',
}

const selectProyecto = ref("igual")
const proyectoParams:any = {
    contiene: 'nombre__icontains',
    comienza: 'nombre__istartswith',
    igual: 'nombre__iexact',
    termina: 'nombre__iendswith'
}

const columns = [
    { title: "Departamento", data: "departamento", align: "left" },
    { title: "No. Solicitud", data: "no_solicitud", align: "left" },
    { title: "Nombre Proyecto", data: "nombre", align: "left" },
];

const closeModal = () => {
    isModalOpen.value = false;
    emit("onCloseModal");
};
const closeAndSaveModal = () => {
    isModalOpen.value = false;
    emit("onCloseModal");
    emit("onSave", proyectoSeleccionado);
};

const handlePaginate = (page: number) => {
    getDecoratedDatas(page)
};

const search = (fromCb = false) => {
    if (fromCb && !searchSolicitud.value && !searchProyecto.value) return
    loading.value = true
    let params:any = { page:1 }
    if (searchSolicitud.value) params[solicitudParams[selectSolicitud.value]] = searchSolicitud.value
    if (searchProyecto.value) params[proyectoParams[selectProyecto.value]] = searchProyecto.value

    searchData(params).then(() => {
        loading.value = false
    });
};

const handleRowClick = (rowData: any) => {
    proyectoSeleccionado.value = rowData
};

const { getDatas: getDatasTrabajos, arrayData: trabajos } = usePetition("trabajo/");

const getDecoratedDatas = (page = 1, size = 10) => {
    loading.value = true
    getDatas({ page, size })
    .then(() => {
        arrayData.value.data.forEach((row:any) => {
            let trabajo = trabajos.value.data.find((t:any) => row.id == t.cartera_proyecto_inversion)

            row.departamento = trabajo ? trabajo.departamento : ""
        })
    })
    .finally(() => loading.value = false)
};

onMounted(async () => {
    await Promise.all([
        getDatasTrabajos({ page: 1, size: 100 }),
    ]);
    getDecoratedDatas()
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