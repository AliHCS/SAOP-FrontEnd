<template>
  <div>
    <InputText v-model.trim="data.descripcion" title="Descripción capitulo:" placeholder="Agrega una descripción..."
      name="desc_capitulo" id="desc_capitulo" class="col-sm-12 mt-4" @input="emitData" />
    <SelectComponent v-model="data.anio" title="Año:" placeholder="Selecciona..." name="anio" id="anio" class="col-sm-4"
      :options="years()" :optionText="'year'" @input="emitData" />
    <SelectComponent v-model="data.tipo_escalatoria" title="Escalatoria:" placeholder="Selecciona..." name="escalatoria"
      id="escalatoria" class="col-sm-8" :options="escalatorias" :optionText="'escalatoria'" @input="emitData" />
    <TextAraComponent v-model="data.descripcion_concepto" :title="'Descripción concepto:'"
      :placeholder="'Agrega una descripción...'" :name="'desc_concepto'" :id="'desc_concepto'"
      class="col-sm-12" @input="emitData" />
  </div>
</template>
<script setup lang="ts">
import InputText from "@/components/InputText.vue";
import SelectComponent from "@/components/SelectComponent.vue";
import { ref, onBeforeMount } from "vue";
import { ICapitulo } from "@/utils/models/cat_capitulos";
import TextAraComponent from "@/components/TextAraComponent.vue";

const props = defineProps(["existingData"]);
const data = ref<ICapitulo>({ ...props.existingData });

const emit = defineEmits(["update-data"]);

const emitData = () => {
  // Emitir el evento 'update-data' con una copia de los datos actualizados
  emit("update-data", { ...data.value });
};

const years = () => {
  let years = []
  const currentYear = new Date().getFullYear();
  const startYear = 1970;
  for (let year = currentYear; year >= startYear; year--) {
    years.push({ year: year });
  }
  return years
}
// Lógica para inicializar campos con existingData si está presente
onBeforeMount(() => {
  if (props.existingData) {
    // Inicializa los datos del formulario con los datos existentes
    data.value = { ...props.existingData };
  }
});

const escalatorias = [{ id: 1, escalatoria: 'Terracerias excluye acarreos' }, { id: 2, escalatoria: 'Estructuras y obras de drenaje' }, { id: 3, escalatoria: 'Pavimentos' }, { id: 4, escalatoria: 'Concreto hidraulico' }, { id: 5, escalatoria: 'Acarreos para terraceria y pav.' }, { id: 6, escalatoria: 'Trabajos de supervision' }, { id: 7, escalatoria: 'Emulsion asfaltica' }]

</script>