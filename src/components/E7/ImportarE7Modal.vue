<template>
    <div>
        <div :class="{ 'show modal-backdrop': isModalOpen }" v-if="isModalOpen"></div>
        <div class="modal fade overflow-auto" :class="{ ' show ': isModalOpen }" v-if="isModalOpen">
            <div :class="['modal-dialog', 'modal-xl']" role="document">
                <div class="modal-content">
                    <div class="custom-modal-header">
                        <h4 class="custom-modal-title">Copiar E7</h4>
                        <button type="button" class="close" aria-label="Close" @click="closeModal">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <h3>Buscar E7</h3>
                        <div class="row py-3">
                            <div class="col-md-3 d-flex align-content-center flex-wrap justify-content-end text-right">
                                Proyecto
                            </div>
                            <div class="col-md-2">
                                <input v-model="proyecto.clave" type="text" class="form-control" />
                            </div>
                            <div class="col-md-6">
                                <input v-model="proyecto.nombre" type="text" class="form-control" disabled />
                            </div>
                            <div class="col-md-1 d-flex align-content-center flex-wrap">
                                <i class="bi bi-info-circle-fill primary-red--text clickable"
                                    @click="modalProyectos = true"></i>
                            </div>
                        </div>
                        <div class="row py-3">
                            <div class="col-md-3 d-flex align-content-center flex-wrap justify-content-end text-right">
                                PEF
                            </div>
                            <div class="col-md-2">
                                <select v-model="pef" class="form-select form-control">
                                    <option v-for="pef in selectPEF" :key="pef.id" :value="pef">
                                        {{ pef.clave_pef }}
                                    </option>
                                </select>
                            </div>
                            <div class="col-md-7">
                                <input :value="pef.descripcion_programa" type="text" class="form-control" disabled />
                            </div>
                        </div>
                        <div class="row py-3">
                            <div class="col-md-3 d-flex align-content-center flex-wrap justify-content-end text-right">
                                Trabajos
                            </div>
                            <div class="col-md-9">
                                <select v-model="trabajo" class="form-select form-control">
                                    <option v-for="t in selectTrabajo" :key="t.id" :value="t">
                                        {{ t.descripcion }}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div class="row py-3">
                            <div class="col-md-3 d-flex align-content-center flex-wrap justify-content-end text-right">
                                Consecutivo
                            </div>
                            <div class="col-md-3">
                                <select v-model="consecutivo" class="form-select form-control" @change="getConceptos()">
                                    <option v-for="trabajoPrevio in tp" :key="trabajoPrevio.id" :value="trabajoPrevio">
                                        {{ trabajoPrevio.consecutivo }}
                                    </option>
                                </select>
                            </div>
                        </div>

                        <div v-if="conceptos.length" class="mt-5">
                            <table class="table table-hover table-bordered">
                                <tr>
                                    <th>Partida</th>
                                    <th>Consecutivo</th>
                                    <th>Clasificación</th>
                                    <th>Descripción Trabajos Prev</th>
                                </tr>
                                <tr v-for="c in conceptos">
                                    <td>{{ c.partida }}</td>
                                    <td>{{ c.consecutivo }}</td>
                                    <td>{{ c.norma }}</td>
                                    <td>{{ c.descripcion }}</td>
                                </tr>
                            </table>
                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" @click="closeModal()">
                                cancelar
                            </button>
                            <button type="button" class="btn btn-primary active" :disabled="!conceptos.length" @click="closeAndSaveModal()" >
                                Importar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <SeleccionarProyectoModal v-if="modalProyectos" @onCloseModal="modalProyectos = false" @onSave="addProyecto" />
    </div>
</template>



<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import SeleccionarProyectoModal from "@/components/E7/SeleccionarProyectoModal.vue";
import usePetition from "@/composables/usePetition";
// import { AJUSTE_COSTOS } from "@/utils/constants/ajusteCostos.ts"
// import ModalConsecutivo from "@/components/ModalWithoutButton.vue";
// import useAlert from "@/composables/useAlert";
// import { getToken } from "@/utils/helpers/authenticationHelper";

const emit = defineEmits(["onSave", "onCloseModal"]);

const { getDatas: getDatasPEF, arrayData: arrayPEF } = usePetition("presupuesto_egresos_federacion/");
const { getDatas: getDatasTrabajos, arrayData: arrayTrabajos } = usePetition("trabajo_previo/");
const { getDatas: getDatasConceptos, arrayData: arrayConceptos } = usePetition("conceptos_trabajos/");

const isModalOpen = ref(true);
const modalProyectos = ref(false);

const proyecto: any = ref({})
const pef: any = ref({})
const trabajo: any = ref({})
const consecutivo: any = ref({})

const conceptos: any = ref([])

const selectPEF = computed(() => {
    const pefs = arrayPEF.value.data.filter((pef: any) => pef.cartera_proyecto_inversion == proyecto.value.id)
    return pefs.length ? pefs : [];
});

const selectTrabajo = computed(() => {
    const trabajos = arrayTrabajos.value.data.filter((t: any) => t.cartera_proyecto_inversion == proyecto.value.id)
    return trabajos.length ? trabajos : [];
});

const tp = computed(() => {
    // Asegurándonos de que selectedTrabajo.value es un array y ordenándolo por 'consecutivo'
    const sortedItems = trabajo.value.trabajos_previos ? [...trabajo.value.trabajos_previos].sort((a, b) => a.consecutivo - b.consecutivo) : [];
    return sortedItems;
});

const getConceptos = () => {
    if (!trabajo.value.id || !consecutivo.value.id) return
    let trabajo_id = trabajo.value.id
    let conceptosAux: any = []
    getDatasConceptos({ page: 1, size: 100, trabajo_id }).then(() => {
        arrayConceptos.value.data.map((c: any) => {
            if (c.datos && c.datos.length) {
                if (c.datos[0].consecutivo == consecutivo.value.consecutivo) {
                    conceptosAux.push(...c.datos)
                }
            }
        })
    })
        .finally(() => {
            conceptos.value = conceptosAux
        })
}

const addProyecto = (data: any) => {
    proyecto.value = data.value
    // getPEF(data.value.presupuesto_egresos_federacion).then((response) => { trabajo.value.pef_descripcion = response.descripcion_programa })
    // getUR({ page: 1, size: 100 }).then(() => { selectUR.value = data.value.unidad_responsable })
    // proyectoSeleccionado.value = data.value.id_proyecto
    // cargarConsecutivo()
}

const closeAndSaveModal = () => {
    isModalOpen.value = false;
    emit("onCloseModal");
    emit("onSave", conceptos);
};

const closeModal = () => {
    isModalOpen.value = false;
    emit("onCloseModal");
};

onMounted(async () => {
    getDatasPEF({ page: 1, size: 100 })
    getDatasTrabajos({ page: 1, size: 100 })
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
</style>