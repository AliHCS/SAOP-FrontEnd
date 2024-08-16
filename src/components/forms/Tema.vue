<template>
  <div>
    <InputText
      v-model.trim="data.tema"
      title="Tema:"
      placeholder="Tema"
      name="tipo_Publicacion"
      id="tipo_Publicacion"
      class="col-sm-12 mt-4"
      @input="emitData"
    />
    <InputText
      v-model.trim="data.descripcion"
      title="Descripción Tema:"
      placeholder="Descripción"
      name="descripcion_Publicacion"
      id="descripcion_Publicacion"
      class="col-sm-12 mt-4"
      @input="emitData"
    />
  </div>
</template>
<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import InputText from "@/components/InputText.vue";
import { ITema } from "@/utils/models/cat_temas";

const props = defineProps(["existingData"]);
const data = ref<ITema>({ ...props.existingData });

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
