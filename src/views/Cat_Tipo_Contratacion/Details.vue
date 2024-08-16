<template>
    <Transition name="view">
        <div>
            <h4 class="view-name">{{ viewName }}</h4>
            <hr class="red" />
            <form class="p-4">
                <div class="form-group">
                    <div class="col-sm-6 mb-4" >
                        <label for="nombre-operacion">Clave</label>
                        <input :disabled="isEditing" type="text" v-model="data.clave" class="form-control" id="description-position"
                            placeholder="Ingrese clave..." autocomplete="off" />
                    </div>
                    <div class="col-sm-12 mb-4">
                        <label for="nombre-operacion">Descripción de tipo de contratación</label>
                        <input type="text" v-model="data.descripcion_contratacion" class="form-control"
                            id="description-position" placeholder="Ingrese descripción..." autocomplete="off" />
                    </div>
                    <div class="col-sm-4 mb-4">
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
import { ref, reactive, onMounted } from "vue";
import { ICatTipoContratacion, defaultValues } from "@/utils/models/cat_tipo_contratacion";
import router from "@/router";
import { scrollTop } from "@/utils/helpers/scrollHelper";
import usePetition from "@/composables/usePetition";

const { createData, getData, updateData } = usePetition("cat_tipo_contratacion/");

const viewName = ref("Registrar tipo de contratación");
var data = reactive<ICatTipoContratacion>({ ...defaultValues });
const itemId = ref("");
const isEditing = ref(false);

const handleCancel = () => {
    resetValues();
    router.push({ name: "listar-tipos-contratacion" });
};
const handleSubmit = () => {

    if (itemId.value) {
        updateData({...data}).then(() => {
            resetValues();
            router.push({ name: "listar-tipos-contratacion" });
        });
    } else {
        createData({...data}).then(() => {
            resetValues();
            router.push({ name: "listar-tipos-contratacion" });
        });
    }
};

const resetValues = () => {
    Object.assign(data, { ...defaultValues });
};

onMounted(async () => {
    itemId.value = router.currentRoute.value.params.id?.toString();
    if (itemId.value) {
        viewName.value = "Actualizar tipo de contratación";
        getData(itemId.value).then((response) => {
            data.descripcion_contratacion = response.descripcion_contratacion;
            data.prefijo = response.prefijo;
            data.clave = response.clave;

            isEditing.value = true;
        });
    } else {
        resetValues();
        isEditing.value = false;
    }
    scrollTop();
});

</script>