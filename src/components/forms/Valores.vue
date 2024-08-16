<template>
    <div>
        <InputText v-model.trim="data.valor" title="Valor:" placeholder="Ingresa un valor..." name="valor" id="valor"
            class="col-sm-12 mt-4" @input="emitData" />
        <SelectComponent v-model="data.nivel_etiqueta" title="Siguiente etiqueta:" placeholder="Selecciona..." optionValue="id"
            name="siguiente_etiqueta" id="siguiente_etiqueta" class="col-sm-12 mt-4" :options="etiquetas"
            :optionText="'etiqueta'" @input="emitData" />
        <SelectComponent v-model="data.unidad" title="Unidad:" placeholder="Selecciona..." name="unidad" id="unidad"
            class="col-sm-12 mt-4" :options="unidades" optionValue="id" :optionText="'unidad'" @input="emitData" />
        <TextAraComponent v-model="data.descripcion_concepto_total" :title="'Descripción concepto:'"
            :placeholder="'Agrega una descripción...'" :name="'desc_concepto_total'" :id="'desc_concepto_total'" class="col-sm-12"
            @input="emitData" />
    </div>
</template>
<script setup lang="ts">
import InputText from "@/components/InputText.vue";
import { ref, onBeforeMount } from "vue";
import { IValor } from "@/utils/models/cat_valor";
import SelectComponent from "@/components/SelectComponent.vue";
import TextAraComponent from "@/components/TextAraComponent.vue";

const props = defineProps(["existingData", "dataIds"]);
const data = ref<IValor>({ ...props.existingData });

const emit = defineEmits(["update-data"]);

const emitData = () => {
    // Emitir el evento 'update-data' con una copia de los datos actualizados
    emit("update-data", { ...data.value, ...props.dataIds, vista: "vista" });
};
// Lógica para inicializar campos con existingData si está presente
onBeforeMount(() => {
    if (props.existingData) {
        // Inicializa los datos del formulario con los datos existentes
        data.value = { ...props.existingData };
    }
});
const etiquetas = [{ id: 1, etiqueta: 'Este es el último nivel' }]
const unidades = [{ id: 1, unidad: 'Metro' }, { id: 2, unidad: 'Kilómetro' }, { id: 3, unidad: 'Metro cuadrado' }, { id: 4, unidad: 'Hectárea' }, { id: 5, unidad: 'Metro cúbico' }, { id: 6, unidad: 'Litro' }, { id: 7, unidad: 'Kilogramo' }]
</script>