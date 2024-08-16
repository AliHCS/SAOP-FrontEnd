<template>
  <div>
    <InputText
      v-model.trim="data.descripcion"
      title="Descripción:"
      placeholder="Ingresa una descripción..."
      name="tipo_Titulo"
      id="tipo_Titulo"
      class="col-sm-12 mt-4"
      @input="emitData"
    />
  </div>
</template>
<script setup lang="ts">
import InputText from "@/components/InputText.vue";
import { ref, onBeforeMount } from "vue";
import { ITitulo } from "@/utils/models/cat_titulos";

const props = defineProps(["existingData"]);
const data = ref<ITitulo>({ ...props.existingData });

const emit = defineEmits(["update-data"]);

const emitData = () => {
  // Emitir el evento 'update-data' con una copia de los datos actualizados
  emit("update-data", { ...data.value });
};
// Lógica para inicializar campos con existingData si está presente
onBeforeMount(() => {
  if (props.existingData) {
    // Inicializa los datos del formulario con los datos existentes
    data.value = { ...props.existingData };
  }
});
</script>