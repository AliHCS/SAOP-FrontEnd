<template>
    <Transition name="view">
        <div>
            <h4 class="view-name">{{ viewName }}</h4>
            <hr class="red" />
            <form class="p-4">
                <div class="form-group">
                    <div class="col-sm-4 mb-4">
                        <label for="nombre-operacion">Clave</label>
                        <input :disabled="isEditing" type="text" v-model="data.clave" class="form-control"
                            id="description-position" placeholder="Ingrese descripción..." autocomplete="off" />
                    </div>
                    <div class="col-sm-12 mb-4">
                        <label for="nombre-operacion">Carácter del procedimiento</label>
                        <input type="text" v-model="data.caracter_procedimiento" class="form-control"
                            id="description-position" placeholder="Ingrese carácter..." autocomplete="off" />
                    </div>
                    <div class="col-sm-12 mb-4">
                        <label for="nombre-operacion">Descripción carácter del procedimiento</label>
                        <input type="text" v-model="data.descripcion_caracter_procedimiento" class="form-control" id="description-position"
                            placeholder="Ingrese descripción..." autocomplete="off" />
                    </div>
                </div>

                <div class="modal-footer col-sm-12">
                    <button type="button" class="btn btn-secondary" @click="handleCancel">
                        Cancelar
                    </button>
                    <button type="button" @click="handleSubmit" class="btn btn-primary">
                        Guardar
                    </button>
                </div>
            </form>
        </div>
    </Transition>
</template>

<script setup lang="ts">
import { ref, reactive,onMounted } from "vue";
import { ICaracterProcedimiento, defaultValues } from "@/utils/models/caracterProcedimiento";
import router from "@/router";
import { scrollTop } from "@/utils/helpers/scrollHelper";
import usePetition from "@/composables/usePetition";

const { createData, getData, updateData } = usePetition("cat_caracter_procedimiento/"); 

const viewName = ref("Registrar carácter de procedimiento");
var data = reactive<ICaracterProcedimiento>({...defaultValues});
const itemId = ref("");
const isEditing = ref(false);

const handleCancel = () => {
    resetValues();
    router.push({ name: "listar-caracter-procedimientos" });
};
const handleSubmit = () => {

    if (itemId.value) {
        updateData({...data}).then(() => {
            resetValues();
            router.push({ name: "listar-caracter-procedimientos" });
        });
    } else {
        createData({...data}).then(() => {
            resetValues();
            router.push({ name: "listar-caracter-procedimientos" });
        });
    }

};

const resetValues = () => {
    Object.assign(data, {...defaultValues});
};

onMounted(async () => {
    itemId.value = router.currentRoute.value.params.id?.toString();
    if (itemId.value) {
        viewName.value = "Actualizar carácter de procedimiento";
        getData(itemId.value).then((response) => {
            data.descripcion_caracter_procedimiento = response.descripcion_caracter_procedimiento;
            data.caracter_procedimiento = response.caracter_procedimiento;
            data.clave = response.clave
            isEditing.value = true;
        })
    } else {
        resetValues()
        isEditing.value = false;
    }
    scrollTop();
});

</script>