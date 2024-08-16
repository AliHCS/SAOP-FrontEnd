<template>
    <h4 class="view-name">{{ viewName }}</h4>
    <hr class="red" />
    <CardConfirmComponent title="¿Estás Seguro?" subtitle="El trabajo se dará de baja permanentemente."
        text="Verifique la información antes de confirmar la operación." @onConfirm="handleConfirm"
        @onCancel="handleCancel" />
    <form class="mt-4 card p-4">
        <div class="text-center mb-4">Detalle:</div>
        <div class="row info-chip">
            <SelectComponent v-model="data.cartera_proyecto_inversion" disabled title="No. Solicitud:"
                placeholder="Selecciona..." name="cartera_proyecto_inversion" id="cartera_proyecto_inversion"
                class="col-sm-6" :options="arrayDataCartera.data" optionText="no_solicitud" />
            <InputText :disabled="itemId !== ''" v-model="data.presupuesto_egresos_federacion" title="PEF:"
                placeholder="0" name="presupuesto_egresos_federacion" id="presupuesto_egresos_federacion"
                class="col-sm-6" />
        </div>
        <div class="row">
            <SelectComponent v-model="data.pais" disabled title="País:" placeholder="País" name="pais" id="pais"
                class="col-sm-6" :options="arrayDataPais.data" :optionText="'nombre_oficial'" />
            <SelectComponent v-model="data.entidad_federativa" title="Entidad Federativa:" disabled
                placeholder="Entidad Federativa" name="entidad_federativa" id="entidad_federativa" class="col-sm-6"
                :options="arrayDataEntidadFederativa.data" :optionText="'descripcion'" />
        </div>
        <div class="row">
            <SelectComponent v-model="data.departamento" disabled title="Departamento:" placeholder="Selecciona"
                name="pais" id="departamento" class="col-sm-12" :options="arrayDataDepto.data"
                :optionText="'descripcion_corta'" />
        </div>
        <div class="row">
            <TextAraComponent v-model="data.descripcion" disabled title="Descripción de los trabajos:"
                :placeholder="'Descricpion...'" :name="'descripcion'" :id="'descripcion'" class="col-sm-12" />
        </div>
        <div class="row">
            <div class="col-sm-12 px-5 my-3">
                <input type="checkbox" disabled :checked="data.aplica_ruta_tramo_subtramo" class="form-check-input"
                    id="aplica_ruta_tramo_subtramo">
                <label class="pl-5" for="es-ampliacion">
                    Aplica Ruta / Tramo / Subtramo
                </label>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-4">
                <label class="" for="es-ampliacion">
                    Fecha de obra
                </label>
                <input v-model="data.fecha_obra" disabled type="date" class="form-control" id="fecha_obra"
                    name="fecha_obra" placeholder="" autocomplete="off" />
            </div>
            <SelectComponent v-model="data.estatus_trabajo" disabled title="Estatus:" placeholder="Selecciona"
                name="estatus_trabajo" id="estatus_trabajo" class="col-sm-4" :options="arrayDataStatus.data"
                :optionText="'descripcion'" />
            <InputText :disabled="itemId !== ''" v-model.trim="data.numero_obra" title="No. Obra:" placeholder=""
                name="numero_obra" id="numero_obra" class="col-sm-4" />
        </div>
        <div class="row">
            <InputText :disabled="itemId !== ''" v-model.trim="data.meta" title="Meta:" placeholder="0.0" name="meta"
                id="meta" class="col-sm-6" />
            <SelectComponent v-model="data.periodo" disabled title="Periodo:" placeholder="Selecciona" name="periodo"
                id="periodo" class="col-sm-6"
                :options='[{ id: 1, descripcion: "normal" }, { id: 2, descripcion: "secas" }]'
                :optionText="'descripcion'" optionValue="descripcion" />
        </div>
        <div class="row">
            <SelectComponent v-model="data.tipo_trabajo" disabled title="Tipo trabajo:" placeholder="Selecciona"
                name="tipo_trabajo" id="tipo_trabajo" class="col-sm-12" :options="arrayDataTrabajo.data"
                :optionText="'descripcion'" />
        </div>
        <div class="row">
            <SelectComponent v-model="data.tipo_subtrabajo" disabled title="Tipo subtrabajo:" placeholder="Selecciona"
                name="tipo_subtrabajo" id="tipo_subtrabajo" class="col-sm-6" :options="arrayDataSubtrabajo.data"
                :optionText="'descripcion'" />
            <InputText :disabled="itemId !== ''" v-model.trim="data.actividad_prioritaria"
                title="Actividad prioritaria:" placeholder="" name="actividad_prioritaria" id="actividad_prioritaria"
                class="col-sm-6" />
        </div>

        <div class="row my-4">
            <div class="col-sm-4">
                <label class="form-check-label pr-4">Tipo de contratación</label>
            </div>
            <div class="col-sm-8">
                <label class="form-check-label px-5">
                    <input type="radio" disabled name="radio-01" value="unitario" class="form-check-input"
                        v-model="data.tipo_contratacion" />
                    <span class="pl-4">Precio unitario</span>
                </label>
                <label class="form-check-label px-5">
                    <input type="radio" disabled name="radio-01" value="alzado" class="form-check-input"
                        v-model="data.tipo_contratacion" />
                    <span class="pl-4">Precio alzado</span>
                </label>
                <label class="form-check-label px-5">
                    <input type="radio" disabled name="radio-01" value="mixto" class="form-check-input"
                        v-model="data.tipo_contratacion" />
                    <span class="pl-4">Precio mixto</span>
                </label>
            </div>
        </div>
        <div class="row">
            <TextAraComponent v-model="data.ubicacion" disabled title="Ubicación:" :placeholder="'Descricpion...'"
                :name="'ubicacion'" :id="'ubicacion'" class="col-sm-12" />
        </div>
        <div class="row">
            <TextAraComponent v-model="data.observaciones" disabled title="Observaciones:"
                :placeholder="'Descricpion...'" :name="'observaciones'" :id="'observaciones'" class="col-sm-12" />
        </div>
    </form>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { scrollTop } from "@/utils/helpers/scrollHelper";
import { useRoute, useRouter } from "vue-router";
import CardConfirmComponent from "@/components/CardConfirmComponent.vue";
import usePetition from "@/composables/usePetition";
import InputText from "@/components/InputText.vue";
import SelectComponent from "@/components/SelectComponent.vue";
import TextAraComponent from "@/components/TextAraComponent.vue";
import { ITrabajos, defaultValues } from "@/utils/models/trabajos";

const itemId = ref<any>({ value: 0 });
const route = useRoute();
const router = useRouter();

const { getData, deleteData } = usePetition("trabajo/");

const viewName = "Eliminar Trabajo";
const handleCancel = () => router.push({ name: "listar-trabajos" });
const handleConfirm = () =>
    deleteData(itemId.value).then((response) => {
        if (response) {
            router.push({ name: "listar-trabajos" });
        }
    })


//Consultas para los selects
const { arrayData: arrayDataCartera, getDatas: getDatasCartera } = usePetition("cartera_proyectos_inversion/");
const {
    arrayData: arrayDataEntidadFederativa,
    getDatas: getDatasEntidadFederativa,
} = usePetition("cat_entidad_federativa/");
const { arrayData: arrayDataPais, getDatas: getDatasPais } =
    usePetition("cat_pais/");
const { arrayData: arrayDataDepto, getDatas: getDatasDepto } =
    usePetition("cat_departamento/");
const { arrayData: arrayDataStatus, getDatas: getDatasStatus } =
    usePetition("cat_estatus/");
const { arrayData: arrayDataTrabajo, getDatas: getDatasTrabajo } =
    usePetition("cat_tipo_trabajo/");
const { arrayData: arrayDataSubtrabajo, getDatas: getDatasSubtrabajo } =
    usePetition("cat_tipo_subtrabajo/");
const data = ref<ITrabajos>(defaultValues);

onMounted(async () => {
    itemId.value = route.params.id;
    if (itemId.value) {
        getData(itemId.value)
            .then((response: any) => {
                data.value.cartera_proyecto_inversion = response.cartera_proyecto_inversion
                data.value.presupuesto_egresos_federacion = response.presupuesto_egresos_federacion
                data.value.pais = response.pais
                data.value.entidad_federativa = response.entidad_federativa
                data.value.departamento = response.departamento
                data.value.descripcion = response.descripcion
                data.value.aplica_ruta_tramo_subtramo = response.aplica_ruta_tramo_subtramo
                data.value.fecha_obra = response.fecha_obra
                data.value.estatus_trabajo = response.estatus
                data.value.numero_obra = response.numero_obra
                data.value.meta = response.meta
                data.value.periodo = response.periodo
                data.value.tipo_trabajo = response.tipo_trabajo
                data.value.tipo_subtrabajo = response.tipo_subtrabajo
                data.value.actividad_prioritaria = response.actividad_prioritaria
                data.value.tipo_contratacion = response.tipo_contratacion
                data.value.ubicacion = response.ubicacion
                data.value.observaciones = response.observaciones
            })
            .catch(() => {
                router.push({ name: "listar-trabajos" });
            });
    }
    getDatasCartera({ page: 1, size: 100 });
    getDatasEntidadFederativa({ page: 1, size: 100 });
    getDatasPais({ page: 1, size: 100 });
    getDatasDepto({ page: 1, size: 100 });
    getDatasStatus({ page: 1, size: 100 });
    getDatasTrabajo({ page: 1, size: 100 });
    getDatasSubtrabajo({ page: 1, size: 100 });
    /* else {
      return router.push({ name: "not-found" });
  } */

    scrollTop();
});
</script>
<style lang="scss" scoped></style>