<template>
  <div class="form-group">
    <label class="control-label" :for="id">{{ title }}</label>
    <select :disabled="disabled" class="form-select form-control" :value="modelValue" @change="$emit('update:modelValue', ($event.target as HTMLInputElement).value), emit('onChange', modelValue)" :name="name" :id="id" :placeholder="placeholder">
      <option value="">Seleccione</option>
      <option v-for="opt in options" :key="opt.value" :value="optionValue ? opt[optionValue] : opt.id ? opt.id : opt.clave">
        {{ opt[optionText] }}
      </option>
    </select>
    <div class="ui basic label pointing red" v-if="error[name]">
      {{ error[name] }}
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: false,
    default: ""
  },
  placeholder: {
    type: String,
    required: false,
    default: ""
  },
  name: {
    type: String,
    required: false,
    default: ""
  },
  error: {
    type: Object,
    required: false,
    default: {}
  },
  id: {
    type: String,
    required: false,
    default: ""
  },
  modelValue: {
    required: false,
  },
  options: {
    type: Object,
    required: false,
    default: {}
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false
  },
  type: {
    type: String,
    required: false,
    default: "select",
  },
  optionValue: {
    type: String,
    default: null,
    required: false
  },
  optionText: {
    type: String, // Nuevo prop para especificar la propiedad a mostrar
    default: "nombre", // Valor predeterminado: "nombre"
    required: false
  }
});

const emit = defineEmits(['update:modelValue', 'onChange']);
</script>
