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
                    <div class="col-sm-9 mb-4">
                        <label for="nombre-operacion">Descripción de tipo de procedimiento</label>
                        <input type="text" v-model="data.descripcion_tipo_procedimiento" class="form-control"
                            id="description-position" placeholder="Ingrese descripción..." autocomplete="off" />
                    </div>
                    <div class="col-sm-3 mb-4">
                        <label for="nombre-operacion">Prefijo</label>
                        <input type="text" v-model="data.prefijo" class="form-control" id="description-position"
                            placeholder="Ingrese prefijo..." autocomplete="off" />
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
import { ITipoProcedimiento, defaultValues } from "@/utils/models/tipoProcedimiento";
import router from "@/router";
import { scrollTop } from "@/utils/helpers/scrollHelper";
import usePetition from "@/composables/usePetition";

const { createData, getData, updateData } = usePetition("cat_tipo_procedimiento/"); 

const viewName = ref("Registrar tipo de procedimiento");
var data = reactive<ITipoProcedimiento>({...defaultValues});
const itemId = ref("");
const isEditing = ref(false);

const handleCancel = () => {
    resetValues();
    router.push({ name: "listar-tipo-procedimientos" });
};
const handleSubmit = () => {

    if (itemId.value) {
        updateData({...data}).then(() => {
            resetValues();
            router.push({ name: "listar-tipo-procedimientos" });
        });
    } else {
        createData({...data}).then(() => {
            resetValues();
            router.push({ name: "listar-tipo-procedimientos" });
        });
    }

};

const resetValues = () => {
    Object.assign(data, {...defaultValues});
};

onMounted(async () => {
    itemId.value = router.currentRoute.value.params.id?.toString();
    if (itemId.value) {
        viewName.value = "Actualizar tipo de procedimiento";
        getData(itemId.value).then((response) => {
            data.descripcion_tipo_procedimiento = response.descripcion_tipo_procedimiento;
            data.prefijo = response.prefijo;
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