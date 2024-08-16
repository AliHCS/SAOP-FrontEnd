<template>
    <Transition name="view">
        <div>
            <h4 class="view-name">{{ viewName }}</h4>
            <hr class="red" />
            <form class="p-4">
                <div class="form-group">
                    <div class="col-sm-12 mb-4">
                        <label for="nombre-modulo">Clave de módulo</label>
                        <input
                            type="text"
                            v-model="data.clave"
                            class="form-control"
                            id="description-position"
                            placeholder="Ingrese clave..."
                            autocomplete="off"
                            :readonly="isEditMode"
                            :style="{ cursor: isEditMode ? 'not-allowed' : 'text' }"
                        />
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-sm-12 mb-4">
                        <label for="nombre-modulo">Descripción de módulo</label>
                        <input
                            type="text"
                            v-model="data.descripcion"
                            class="form-control"
                            id="description-position"
                            placeholder="Ingrese descripción..."
                            autocomplete="off"
                        />
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
import { ICatModulo, defaultValues } from "@/utils/models/cat_modulos";
import router from "@/router";
import { scrollTop } from "@/utils/helpers/scrollHelper";
import usePetition from "@/composables/usePetition";

const { createData, getData, updateData } = usePetition("cat_modulo/");

const viewName = ref("Registrar módulo");
const data = reactive<ICatModulo>({ ...defaultValues });
const itemId = ref("");
const showView = ref(false);
const isEditMode = ref(false);

const handleCancel = () => {
    resetValues();
    router.push({ name: "listar_modulos" });
};

const handleSubmit = () => {
    if (itemId.value) {
        updateData({
            clave: data.clave,
            descripcion: data.descripcion,
        }).then(() => {
            resetValues();
            router.push({ name: "listar_modulos" });
        });
    } else {
        createData({
            clave: data.clave,
            descripcion: data.descripcion,
        }).then(() => {
            resetValues();
            router.push({ name: "listar_modulos" });
        });
    }
};

const resetValues = () => {
    Object.assign(data, { ...defaultValues });
};

onMounted(async () => {
    itemId.value = router.currentRoute.value.params.id?.toString();
    if (itemId.value) {
        viewName.value = "Actualizar módulo";
        isEditMode.value = true;
        getData(itemId.value).then((response) => {
            data.clave = response.clave;
            data.descripcion = response.descripcion;
            showView.value = true;
        });
    } else {
        resetValues();
        isEditMode.value = false;
        showView.value = true;
    }
    scrollTop();
});
</script>
