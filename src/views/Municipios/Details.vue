<template>
    <Transition name="view">
        <div v-if="showView">
            <h4 class="view-name">{{ viewName }}</h4>
            <hr class="red" />
            <form class="p-4">
                <div class="form-group">
                    <div class="col-sm-6 mb-4">
                        <label for="nombre-operacion">Clave</label>
                        <input type="text" v-model="data.clave" class="form-control" id="description-position"
                            placeholder="Clave..." autocomplete="off" :disabled="edit" />
                    </div>
                    <div class="col-sm-6 mb-4">
                        <label for="nombre-operacion">Descripción corta</label>
                        <input type="text" v-model="data.descripcion_corta" class="form-control"
                            id="description-position" placeholder="Ingrese descripción..." autocomplete="off" />
                    </div>
                    <div class="col-sm-12 mb-4">
                        <label for="nombre-operacion">Descripción</label>
                        <input type="text" v-model="data.descripcion" class="form-control" id="description-position"
                            placeholder="Ingrese descripción..." autocomplete="off" />
                    </div>
                    <SelectComponent v-model="data.entidad_federativa" title="Entidad federativa"
                        placeholder="Selecciona..." name="EF" id="EF" class="col-sm-6 mb-4" :options="arrayDataEF.data"
                        :optionText="'descripcion'" :optionValue="'clave'" />
                    <SelectComponent v-model="data.pais" title="País" placeholder="Selecciona..." name="pais" id="pais"
                        class="col-sm-6 mb-4" :options="arrayDataPais.data" :optionText="'nombre_oficial'"
                        :optionValue="'clave'" disabled />
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
import { scrollTop } from "@/utils/helpers/scrollHelper";
import router from "@/router";
import usePetition from "@/composables/usePetition";
import { IMunicipio, defaultValues } from "@/utils/models/municipio";
import SelectComponent from "@/components/SelectComponent.vue";

const viewName = ref("Registrar municipio");
const { createData, getData, updateData } = usePetition("cat_municipio/"); //, updateLevelByArea, getLevelByAreaById
const itemId = ref("");
const showView = ref(false);
var data = reactive<IMunicipio>(defaultValues);
const edit = ref(false);
// selects data
const { arrayData: arrayDataPais, getDatas: getDatasPais } = usePetition("cat_pais/");
const { arrayData: arrayDataEF, getDatas: getDatasEF } = usePetition("cat_entidad_federativa/");




const handleCancel = () => {
    resetValues();
    router.push({ name: "listar-municipios" });
};
const handleSubmit = () => {

    if (itemId.value) {
        updateData({ ...data }).then(() => {
            resetValues();
            router.push({ name: "listar-municipios" });
        });
    } else {
        createData({ ...data }).then(() => {
            resetValues();
            router.push({ name: "listar-municipios" });
        });
    }

};

const resetValues = () => {
    data.id = null;
    data.clave = null;
    data.descripcion = null;
    data.descripcion_corta = null;
    data.entidad_federativa = null
    edit.value = false
    data.pais = arrayDataPais.value.data.find((el: any) => el.nombre_oficial.toLowerCase() == 'mexico' || el.nombre_oficial.toLowerCase() == 'méxico').clave
};

onMounted(async () => {
    await Promise.all([
        getDatasPais({ page: 1, size: 100 }),
        getDatasEF({ page: 1, size: 100 })
    ]);
    data.pais = arrayDataPais.value.data.find((el: any) => el.nombre_oficial.toLowerCase() == 'mexico' || el.nombre_oficial.toLowerCase() == 'méxico').clave
    console.log(data.pais)
    itemId.value = router.currentRoute.value.params.id?.toString();
    if (itemId.value) {
        edit.value = true
        viewName.value = "Actualizar municipio";
        getData(itemId.value).then((response) => {
            data.id = itemId.value;
            data.clave = response.clave;
            data.descripcion = response.descripcion;
            data.descripcion_corta = response.descripcion_corta;
            data.pais = arrayDataPais.value.data.find((el: any) => el.clave == data.pais)?.clave
            data.entidad_federativa = arrayDataEF.value.data.find((el: any) => el.id == response.entidad_federativa)?.clave

            showView.value = true;
        })
    } else {
        resetValues()
        showView.value = true;
    }
    scrollTop();
});
</script>
<style lang="scss" scoped></style>