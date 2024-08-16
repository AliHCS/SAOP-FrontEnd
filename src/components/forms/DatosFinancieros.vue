<template>
    <div>
        <h4 class="view-name">{{ viewName }}</h4>
        <hr class="red">
        <div class="row app-options-bar">
            <div class="d-flex align-items-center buttons-component align-items-center">
                <div class="col-md-8">
                    <button title="Limpiar campos" @click="resetForm()" class="dt-button btn btn-primary active mr-4" type="button" :disabled="readOnlyView">
                        <i class="bi bi-eraser-fill"></i>
                    </button>
                    <span v-if="readOnlyView">
                        <button title="Cancelar" class="btn btn-secondary mr-4" type="button" :disabled="!readOnlyView"
                            v-if="props.data" @click="handleCancel()">
                            <span><b>Cancelar</b></span>
                        </button>
                        <button title="Crear" class="dt-button btn btn-primary active" type="button"
                            :disabled="!readOnlyView" v-if="props.data" @click="readOnlyView = false">
                            <span><b>Editar</b></span>
                        </button>
                    </span>
                </div>
                <AccionesCartera />
            </div>
        </div>
        <div class="d-flex">
            <div class="col-6">
                <SelectComponent :disabled="readOnlyView === true" v-model="data.anio_base" title="Año Base:"
                    placeholder="Seleccione..." name="anio_base" id="anio_base" :error="errors" class="col-sm-12 mb-5"
                    :options="YEARS" :optionText="'value'" />

                <strong class="px-4" style="font-size: 2rem;">Montos de Inversión</strong>

                <InputText :disabled="readOnlyView" v-model.trim="data.financiamiento_adicional"
                    title="Financiamiento Adicional:" placeholder="0.00" name="financiamiento_adicional"
                    id="financiamiento_adicional" :error="errors" class="col-sm-12 mt-4" />
                <InputText :disabled="readOnlyView" v-model.trim="data.inversion_total" title="Inversión Total:"
                    placeholder="0.00" name="inversion_total" id="inversion_total" :error="errors" class="col-sm-12" />
                <InputText :disabled="readOnlyView" v-model.trim="data.gastos_de_estimaciones_operacionales"
                    title="Gastos de Estimaciones Operacionales:" placeholder="0.00"
                    name="gastos_de_estimaciones_operacionales" id="gastos_de_estimaciones_operacionales" :error="errors"
                    class="col-sm-12" />
                <InputText :disabled="readOnlyView" v-model.trim="data.otros_costos" title="Otros Costos:"
                    placeholder="0.00" name="otros_costos" id="otros_costos" :error="errors" class="col-sm-12" />
                <InputText :disabled="readOnlyView" v-model.trim="data.valor_presente_neto" title="Valor Presente Neto:"
                    placeholder="0.00" name="valor_presente_neto" id="valor_presente_neto" :error="errors"
                    class="col-sm-12" />
                <InputText :disabled="readOnlyView" v-model.trim="data.costo_anual_equivalente"
                    title="Costo Anual Equivalente:" placeholder="0.00" name="costo_anual_equivalente"
                    id="costo_anual_equivalente" :error="errors" class="col-sm-12" />
                <InputText :disabled="readOnlyView" v-model.trim="data.aportacion_estatal" title="Aportación Estatal:"
                    placeholder="0.00" name="aportacion_estatal" id="aportacion_estatal" :error="errors"
                    class="col-sm-12" />
            </div>
            <div class="d-flex flex-column col-6">
                <strong style="font-size: 2rem;">Indicadores Financieros</strong>
                <InputText :disabled="readOnlyView" v-model.trim="data.tasa_interna_de_retorno"
                    title="Tasa Interna de Retorno:" placeholder="0.00" name="tasa_interna_de_retorno"
                    id="tasa_interna_de_retorno" :error="errors" class="mt-5" />
                <InputText :disabled="readOnlyView" v-model.trim="data.tasa_de_rendimiento_inmediata"
                    title="Tasa de Rendimiento Inmediata:" placeholder="0.00" name="tasa_de_rendimiento_inmediata"
                    id="tasa_de_rendimiento_inmediata" :error="errors" />
                <InputText :disabled="readOnlyView" v-model.trim="data.tasa_de_descuento" title="Tasa de Descuento:"
                    placeholder="0.00" name="tasa_de_descuento" id="tasa_de_descuento" :error="errors" />

                <div class="text-right pr-2 flex-grow-1 mt-5" v-if="!readOnlyView">
                    <button type="button" class="btn btn-secondary mr-4" @click="handleCancel">
                        Cancelar
                    </button>
                    <button title="Crear" class="dt-button btn btn-primary active btn-crear" type="button"
                        @click="handleSubmit()">
                        <span v-if="props.data"><b>Guardar</b></span>
                        <span v-else><i class="bi bi-plus"></i> <b>Crear</b></span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, reactive, watch } from "vue";
import AccionesCartera from '@/components/AccionesCarteraPoyectos.vue'
import SelectComponent from "@/components/SelectComponent.vue";
import InputText from "@/components/InputText.vue";
import { useForm } from "@/composables/useForm";
import { financialDataValidations } from "@/utils/validations/financialDataValidations";
import { IFinancialData, defaultValues } from "@/utils/models/financialDataModel";
import usePetition from "@/composables/usePetition";
//TODO YEARS will be replaced with data from DB
import { YEARS } from "@/utils/constants/exampleYears";


const props = defineProps({
    idRow: {
        type: String,
    },
    data: {
        type: Object
    }
})

const viewName = 'Datos Financieros'
const readOnlyView = ref(false)

const { createData, updateData } = usePetition("informacion_financiera/");

var data = reactive<IFinancialData>(defaultValues);
const { formState, isValid, errors, showErrors } = useForm(data, financialDataValidations);
const itemId = ref("");

const handleSubmit = async () => {
    data.cartera_proyecto_inversion = props.idRow!!
    if (isValid.value) {
        if (itemId.value) {
            await updateData({ ...data }).then(() => {
                setTimeout(() => {
                    window.location.reload()
                }, 1500);
            });
        } else {
            await createData(formState.value).then(() => {
                setTimeout(() => {
                    window.location.reload()
                }, 1500);
            });
        }
    } else {
        showErrors();
    }
};

const handleCancel = () => window.location.reload()

const updateFormData = () => {
    resetForm()
    readOnlyView.value = false
    if (props.data && !props.data.loading) {
        data.id = props.data.cartera_proyecto_inversion
        data.anio_base = props.data.anio_base
        data.financiamiento_adicional = props.data.financiamiento_adicional
        data.inversion_total = props.data.inversion_total
        data.gastos_de_estimaciones_operacionales = props.data.gastos_de_estimaciones_operacionales
        data.otros_costos = props.data.otros_costos
        data.valor_presente_neto = props.data.valor_presente_neto
        data.costo_anual_equivalente = props.data.costo_anual_equivalente
        data.aportacion_estatal = props.data.aportacion_estatal
        data.tasa_interna_de_retorno = props.data.tasa_interna_de_retorno
        data.tasa_de_rendimiento_inmediata = props.data.tasa_de_rendimiento_inmediata
        data.tasa_de_descuento = props.data.tasa_de_descuento
        itemId.value = props.data.cartera_proyecto_inversion
        readOnlyView.value = true
    }
}

const resetForm = () => {
    data.anio_base = null
    data.financiamiento_adicional = null
    data.inversion_total = null
    data.gastos_de_estimaciones_operacionales = null
    data.otros_costos = null
    data.valor_presente_neto = null
    data.costo_anual_equivalente = null
    data.aportacion_estatal = null
    data.tasa_interna_de_retorno = null
    data.tasa_de_rendimiento_inmediata = null
    data.tasa_de_descuento = null
}

watch(
    () => props.data,
    () => {
        updateFormData()
    },
    {
        deep: true,
    }
);
</script>