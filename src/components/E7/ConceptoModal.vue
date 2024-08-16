<template>
    <div>
        <div :class="{ 'show modal-backdrop': isModalOpen }" v-if="isModalOpen"></div>
        <div class="modal fade overflow-auto" :class="{ ' show ': isModalOpen }" v-if="isModalOpen">
            <div :class="['modal-dialog', 'modal-lg']" role="document">
                <div class="modal-content">
                    <div class="custom-modal-header">
                        <h4 class="custom-modal-title">Generador dinámico de conceptos</h4>
                        <button type="button" class="close" aria-label="Close" @click="closeModal">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-5 h4">{{ props.concepto.label }}</div>
                        <div v-for="etiqueta in etiquetas" class="mb-5">
                            <div v-if="etiqueta.nombre_vista == VISTAS.COMBOBOX.name">
                                <div class="mb-2">{{ etiqueta.etiqueta }}</div>
                                <select v-model="valorCombo" class="form-select form-control" name="combo" id="vista_combo" @change="updateDescription(valorCombo.descripcion_concepto_total)">
                                    <option v-for="valor in etiqueta.valores" :value="valor">
                                        {{ valor.valor }}
                                    </option>
                                </select>
                            </div>
                            <div v-if="etiqueta.nombre_vista == VISTAS.RADIO.name">
                                <div class="mb-2">{{ etiqueta.etiqueta }}</div>
                                <div v-for="valor in etiqueta.valores">
                                    <input v-model="valorRadio" type="radio" :name="valor.valor" :value="valor" class="mr-2" @change="updateDescription(valorRadio.descripcion_concepto_total)"/>
                                    <label class="font-weight-normal" :for="valor.id">
                                    {{ valor.valor }}</label>
                                </div>
                            </div>
                            <div v-if="etiqueta.nombre_vista == VISTAS.OPCION.name">
                                <div class="mb-2">{{ etiqueta.etiqueta }}</div>
                                <div v-for="valor in etiqueta.valores">
                                    <input v-model="valorOpcion" type="radio" :name="valor.valor" :value="valor" class="mr-2" @change="updateDescription(valorOpcion.descripcion_concepto_total)" />
                                    <label class="font-weight-normal" :for="valor.id">
                                    {{ valor.valor }}</label>
                                </div>
                            </div>
                            <!-- <div v-if="etiqueta.nombre_vista == VISTAS.OPCION.name">
                                <div class="mb-2">{{ etiqueta.etiqueta }}</div>
                                <div class="">
                                    <input v-model="valorOpcion" type="radio" id="si" value="si" class="mr-2" />
                                    <label for="si" class="font-weight-normal">Si</label>
                                </div>
                                <div class="">
                                    <input v-model="valorOpcion" type="radio" id="no" value="no" class="mr-2" />
                                    <label class="font-weight-normal" for="no">No</label>
                                </div>
                            </div> -->
                            <!-- <div v-if="etiqueta.nombre_vista == VISTAS.LISTA.name">
                                <div class="mb-2">{{ etiqueta.etiqueta }}</div>
                                <div class="">
                                    <div v-for="valor in etiqueta.valores" class="form-check">
                                        <input v-model="valorLista" type="checkbox" class="mr-2"
                                            :id="valor.id" :value="valor"/>
                                        <label class="font-weight-normal" :for="valor.id"> 
                                            {{ valor.descripcion_concepto_total }}
                                        </label>
                                    </div>
                                </div>
                            </div> -->
                            <div v-if="etiqueta.nombre_vista == VISTAS.CAMPO.name">
                                <div class="mb-2">{{ etiqueta.etiqueta }}</div>
                                <div v-for="valor in etiqueta.valores">
                                    <input v-model="valorCampo" type="text" placeholder="Texto..." class="mr-2 form-control" @focus="updateDescription(valor.descripcion_concepto_total)"/>
                                </div>
                            </div>
                            <div v-if="etiqueta.nombre_vista == VISTAS.NO_VISTA.name">
                                <div class="mb-2">{{ etiqueta.etiqueta }}</div>
                            </div>
                        </div>
                        <div>
                            {{ valorDescripcion }}
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="closeModal">
                            Cerrar
                        </button>
                        <button type="button" class="btn btn-primary active" @click="closeAndSaveModal" :disabled="isValidForm">
                            Aceptar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { VISTAS } from "@/utils/constants/TiposDeVistas.ts"
const props = defineProps({
    concepto: {
        type: Object,
        default: {}
    }
});


const emit = defineEmits(["onSave", "onCloseModal"]);
const isModalOpen = ref(true);
const etiquetas: any = ref([]);
const closeModal = () => {
    isModalOpen.value = false;
    emit("onCloseModal");
};

const valorCombo = ref();
const valorRadio = ref()
const valorOpcion = ref()
const valorCampo = ref()
const valorDescripcion = ref()


const updateDescription = (val: string) => {
    valorDescripcion.value = val
}

const isValidForm = computed(() => {
  return etiquetas.value.some((e:any) => e.nombre_vista == VISTAS.COMBOBOX.name) && !valorCombo.value 
  || etiquetas.value.some((e:any) => e.nombre_vista == VISTAS.RADIO.name) && !valorRadio.value 
  || etiquetas.value.some((e:any) => e.nombre_vista == VISTAS.OPCION.name) && !valorOpcion.value 
  || etiquetas.value.some((e:any) => e.nombre_vista == VISTAS.CAMPO.name) && !valorCampo.value 
});

const closeAndSaveModal = () => {
    isModalOpen.value = false;
    emit("onCloseModal");
    emit("onSave", formData());
};

const formData = () => {
    const data = {
        descripcion: '',
        unidad_medida: '',
        grupo: props.concepto.grupo
    }
    if (valorCombo.value) {
        data.descripcion = data.descripcion + valorCombo.value.descripcion_concepto_total + `\n`
        data.unidad_medida = valorCombo.value.unidad 
    }
    if (valorRadio.value) {
        data.descripcion = data.descripcion + valorRadio.value.descripcion_concepto_total + `\n`
        data.unidad_medida = valorRadio.value.unidad 
    }
    if (valorOpcion.value) {
        data.descripcion = data.descripcion + valorOpcion.value.descripcion_concepto_total + `\n`
                data.unidad_medida = valorOpcion.value.unidad 
    }
    if (valorCampo.value) {
        data.descripcion = data.descripcion + valorCampo.value + `\n`
    }
    return data
}

const getEtiquetas = () => {
    if (props.concepto) {
        etiquetas.value = props.concepto.etiquetas
    }
    else etiquetas.value = []
    etiquetas.value.forEach((etiqueta: any) => {
        const vista = Object.values(VISTAS).find(v => v.id == etiqueta.vista);
        etiqueta.nombre_vista = vista ? vista.name : null
    })
}

onMounted(() => {
    getEtiquetas()
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