<template>
    <Transition name="view">
        <div>
            <h4 class="view-name">{{ viewName }}</h4>
            <hr class="red" />
            <form class="p-4">
                <div class="form-group">
                    <div class="col-sm-12 mb-4">
                        <label for="nombre-periodo">Clave de periodo de pago</label>
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
                        <label for="nombre-periodo">Descripción de periodo de pago</label>
                        <input
                            type="text"
                            v-model="data.descripcion_periodo_pago"
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
import { ICatPeriodoPago, defaultValues } from "@/utils/models/cat_periodos_pago";
import router from "@/router";
import { scrollTop } from "@/utils/helpers/scrollHelper";
import usePetition from "@/composables/usePetition";

const { createData, getData, updateData } = usePetition("cat_periodo_pago/");

const viewName = ref("Registrar periodo de pago");
const data = reactive<ICatPeriodoPago>({ ...defaultValues });
const itemId = ref("");
const showView = ref(false);
const isEditMode = ref(false);

const handleCancel = () => {
    resetValues();
    router.push({ name: "listar_periodos_pago" });
};

const handleSubmit = () => {
    if (itemId.value) {
        updateData({
            clave: data.clave,
            descripcion_periodo_pago: data.descripcion_periodo_pago,
        }).then(() => {
            resetValues();
            router.push({ name: "listar_periodos_pago" });
        });
    } else {
        createData({
            clave: data.clave,
            descripcion_periodo_pago: data.descripcion_periodo_pago,
        }).then(() => {
            resetValues();
            router.push({ name: "listar_periodos_pago" });
        });
    }
};

const resetValues = () => {
    Object.assign(data, { ...defaultValues });
};

onMounted(async () => {
    itemId.value = router.currentRoute.value.params.id?.toString();
    if (itemId.value) {
        viewName.value = "Actualizar periodo de pago";
        isEditMode.value = true;
        getData(itemId.value).then((response) => {
            data.clave = response.clave;
            data.descripcion_periodo_pago = response.descripcion_periodo_pago;
            showView.value = true;
        });
    } else {
        resetValues();
        showView.value = true;
    }
    scrollTop();
});
</script>
