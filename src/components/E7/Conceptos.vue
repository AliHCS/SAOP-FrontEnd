<template>
  <div class="conceptos-container row">
    <div class="col-sm-12">
      <ul class="menu-container">
        <li v-for="option in optionsRef" :key="option.id" class="option">
          <MenuItem :option="option" :toggleSubmenu="selectOption" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import MenuItem from "@/components/E7/SubOpcionesConceptos.vue";
import { IOption, ISuboption } from "@/utils/models/optionsConceptosE7";

const props = defineProps({
  optionsRefProp: {
    type: Array as () => IOption[],
    required: true,
  },
});

const emit = defineEmits(["onAction"]);

const optionsRef = ref<IOption[]>(props.optionsRefProp);

const toggleSubmenu = (option: IOption | ISuboption) => {
  option.open = !option.open;
};

const grupo = ref()

const selectOption = (option: IOption) => {
  if (option.libro) {
    grupo.value = option.libro
  }
  if (option.suboptions) {
    toggleSubmenu(option);
  } else {
    emit("onAction", {...option, grupo: grupo.value});
  }
};
</script>

<style scoped>
.menu-container {
  list-style-type: none;
  padding: 0;
  margin: 0;
  max-height: 600px; /* Establece una altura máxima para el contenedor */
  overflow-y: auto; /* Agrega desplazamiento vertical */
  direction: rtl; /* Establece la dirección del texto de derecha a izquierda */
}
.menu-container::-webkit-scrollbar {
  width: 10px; /* Ancho del scrollbar */
  height: 10px; /* Altura del scrollbar */
}

.menu-container::-webkit-scrollbar-thumb {
  background-color: #888; /* Color del thumb (la barra de desplazamiento) */
  border-radius: 5px; /* Bordes redondeados del thumb */
}

.menu-container::-webkit-scrollbar-track {
  background-color: #f1f1f1; /* Color de la pista (fondo del scrollbar) */
}
.option {
  cursor: pointer;
  padding: 8px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  margin-right: 10px;
  overflow-x: auto; /* Agrega desplazamiento horizontal */
  white-space: nowrap; /* Evita que los elementos se envuelvan a la siguiente línea */
  direction: ltr; /* Restaura la dirección del texto a izquierda a derecha */
}

.option:hover {
  background-color: #e0e0e0;
}

.option:focus {
  outline: none;
}
.conceptos-container {
  margin-bottom: 20px;
}
</style>
@/utils/models/optionsConceptosE7
