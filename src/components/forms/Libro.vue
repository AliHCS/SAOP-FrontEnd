<template>
  <div>
    <InputText
      v-model.trim="data.libro"
      title="Libro:"
      placeholder="Libro"
      name="tipo_Publicacion"
      id="tipo_Publicacion"
      class="col-sm-12 mt-4"
      @input="emitData"
    />
    <InputText
      v-model.trim="data.descripcion"
      title="Descripción Libro:"
      placeholder="Descripción"
      name="descripcion_Publicacion"
      id="descripcion_Publicacion"
      class="col-sm-12 mt-4"
      @input="emitData"
    />
  </div>
</template>
<script setup lang="ts">
import InputText from "@/components/InputText.vue";
import { ref, onBeforeMount } from "vue";
import { ILibro } from "@/utils/models/cat_libros";

const props = defineProps(["existingData"]);
const data = ref<ILibro>({ ...props.existingData });
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
