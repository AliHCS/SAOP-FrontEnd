<template>
    <Transition name="view">
        <div v-if="showView">
            <h4 class="view-name">{{ viewName }}</h4>
            <hr class="red" />
            <form class="p-4">
                <div class="form-group">
                    <SelectComponent v-model="data.anio" title="Año:" placeholder="Selecciona..."
                        name="anio" id="anio" class="col-sm-6" :options="YEARS"
                        :optionText="'value'" :optionValue="'value'" />
                    <SelectComponent v-model="data.mes" title="Mes:" placeholder="Selecciona..."
                        name="mes" id="mes" class="col-sm-6" :options="MONTHS"
                        :optionText="'descripcion'" :optionValue="'id'" />
                    <div class="col-sm-6">
                        <label for="nombre-operacion">Factor</label>
                        <input type="number" v-model="data.factor" class="form-control" id="description-position"
                            placeholder="Factor..." autocomplete="off" />
                    </div>
                    <SelectComponent v-model="data.unidad_responsable" title="Unidad Responsable:" placeholder="Selecciona..."
                        name="ur" id="ur" class="col-sm-6" :options="arrayDataUR.data"
                        :optionText="'descripcion'" :optionValue="'clave'" />
                    <SelectComponent v-model="data.departamento" title="Departamento:" placeholder="Selecciona..."
                        name="depto" id="depto" class="col-sm-6" :options="arrayDataDepto.data"
                        :optionText="'descripcion'" :optionValue="'clave'" />
                    <SelectComponent v-model="data.entidad_federativa" title="Entidad Federativa:" placeholder="Selecciona..."
                        name="EF" id="EF" class="col-sm-6" :options="arrayDataEF.data"
                        :optionText="'descripcion'" :optionValue="'clave'" />
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
import { IFactorEscalatoria, defaultValues } from "@/utils/models/factorEscalatoria";
import { YEARS } from "@/utils/constants/exampleYears";
import { MONTHS } from "@/utils/constants/exampleYears";
import SelectComponent from "@/components/SelectComponent.vue";

const viewName = ref("Registrar factor escalatoria");
const { createData, getData, updateData } = usePetition("factor_escalatoria/"); //, updateLevelByArea, getLevelByAreaById
const itemId = ref("");
const showView = ref(false);
var data = reactive<IFactorEscalatoria>(defaultValues);

// selects data
const { arrayData: arrayDataUR, getDatas: getDatasUR } = usePetition("cat_unidad_responsable/");
const { arrayData: arrayDataDepto, getDatas: getDatasDepto } = usePetition("cat_departamento/");
const { arrayData: arrayDataEF, getDatas: getDatasEF } = usePetition("cat_entidad_federativa/");




const handleCancel = () => {
    resetValues();
    router.push({ name: "listar-factor-escalatoria" });
};
const handleSubmit = () => {

    if (itemId.value) {
        updateData({ ...data }).then(() => {
            resetValues();
            router.push({ name: "listar-factor-escalatoria" });
        });
    } else {
        createData({ ...data }).then(() => {
            resetValues();
            router.push({ name: "listar-factor-escalatoria" });
        });
    }

};

const resetValues = () => {
    data.id = null;
    data.anio = null;
    data.mes = null;
    data.factor = null;
    data.pais = null;
    data.unidad_responsable = null
    data.departamento = null
    data.entidad_federativa = null
};

onMounted(async () => {
    await Promise.all([
    getDatasUR({ page: 1, size: 100 }),
    getDatasDepto({ page: 1, size: 100 }),
    getDatasEF({ page: 1, size: 100 })
  ]);
    itemId.value = router.currentRoute.value.params.id?.toString();
    if (itemId.value) {
        viewName.value = "Actualizar tipo de escalatoria";
        getData(itemId.value).then((response) => {
            data.id = itemId.value;
            data.anio = response.anio;
            data.mes = response.mes;
            data.factor = response.factor;
            data.pais = response.pais;
            data.unidad_responsable = arrayDataUR.value.data.find((el: any) => el.id == response.unidad_responsable)?.clave
            data.departamento = arrayDataDepto.value.data.find((el: any) => el.id == response.departamento)?.clave
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