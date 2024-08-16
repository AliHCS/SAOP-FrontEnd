<template>
    <Transition name="view">
        <div v-if="showView">
            <h4 class="view-name">{{ viewName }}</h4>
            <hr class="red" />
            <form class="p-4">
                <div class="form-group">
                    <div class="col-sm-5 mb-4">
                        <label for="nombre-operacion">Folio procedimiento</label>
                        <input v-model="procedimiento.folio" type="text" class="form-control" autocomplete="off"
                            disabled />
                    </div>
                    <div class="col-sm-5 mb-4">
                        <label for="nombre-operacion">Clave folio</label>
                        <input v-model="procedimiento.id" type="text" class="form-control" autocomplete="off"
                            disabled />
                    </div>
                    <div class="col-sm-2 mb-4">
                        <label for="nombre-operacion">Evento</label>
                        <input v-model="data.evento" type="text" class="form-control" autocomplete="off" disabled />
                    </div>
                    <div class="col-sm-12 mb-4">
                        <label for="nombre-operacion">Nombre empresa</label>
                        <input v-model="data.nombre_empresa" type="text" class="form-control" autocomplete="off" />
                    </div>
                    <div class="col-sm-12 mb-4">
                        <label for="nombre-operacion">Representante empresa</label>
                        <input v-model="data.representante_empresa" type="text" class="form-control"
                            autocomplete="off" />
                    </div>
                    <div class="col-sm-12 mb-4">
                        <label for="nombre-operacion">Cargo representante</label>
                        <input v-model="data.cargo_representante" type="text" class="form-control" autocomplete="off" />
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
import { ref, onMounted, reactive } from "vue";
import router from "@/router";
import usePetition from "@/composables/usePetition";
import { IVisitaSitio, defaultValues } from "@/utils/models/visitaSitio";
import { useRoute } from "vue-router";

const route = useRoute();
const { createData, getData, updateData } = usePetition("visita_sitio/");
const { getData: getProcedimiento } = usePetition("procedimiento_contratacion/");

const viewName = ref("Registrar visita sitio");
const itemId = ref("");
const showView = ref(false);
const procedimiento: any = ref({})
const edit = ref(false);

var data = reactive<IVisitaSitio>(defaultValues);
// selects data




const handleCancel = () => {
    resetValues();
    router.push({ name: "listar-visitas-sitio" });
};
const handleSubmit = () => {

    if (itemId.value) {
        updateData(data).then(() => {
            resetValues();
            router.push({ name: "listar-visitas-sitio" });
        });
    } else {
        createData(data).then(() => {
            resetValues();
            router.push({ name: "listar-visitas-sitio" });
        });
    }

};

const resetValues = () => {
    data.nombre_empresa = null;
    data.representante_empresa = null;
    data.cargo_representante = null;
};

onMounted(async () => {
    data.evento = Number(route.params.idEvento)
    await getProcedimiento(route.params.idProceso.toString()).then(res => procedimiento.value = res)
    console.log(router.currentRoute.value.params)
    itemId.value = router.currentRoute.value.params.id?.toString();
    if (itemId.value) {
        edit.value = true
        viewName.value = "Actualizar visita sitio";
        getData(itemId.value).then((response) => {
            data.id = Number(itemId.value);
            data.nombre_empresa = response.nombre_empresa;
            data.representante_empresa = response.representante_empresa;
            data.cargo_representante = response.cargo_representante;

            showView.value = true;
        })
    } else {
        resetValues()
        showView.value = true;
    }
});
</script>
<style lang="scss" scoped></style>