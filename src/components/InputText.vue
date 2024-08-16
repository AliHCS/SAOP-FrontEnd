<template>
  <div
    :class="type == 'text' || type == 'number' ? 'form-group' : 'form-check'"
  >
    <label
      v-if="type == 'text' || type == 'number'"
      class="control-label"
      :for="id"
      >{{ title }}</label
    >
    <input
      :class="
        type == 'text' || type == 'number' ? 'form-control' : 'form-check-input'
      "
      :placeholder="placeholder"
      :value="type !== 'checkbox' ? modelValue : undefined"
      @input="handleInput"
      :name="name"
      :id="id"
      :type="type"
      :disabled="disabled"
      :checked="type === 'checkbox' ? !!modelValue : undefined"
    />
    <label
      v-if="type == 'checkbox'"
      class="form-check-label pl-4"
      for="nombre"
      >{{ title }}</label
    >
    <div class="ui basic label pointing red" v-if="error[name]">
      {{ error[name] }}
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: false,
    default: "",
  },
  placeholder: {
    type: String,
    required: false,
    default: "",
  },
  name: {
    type: String,
    required: false,
    default: "",
  },
  error: {
    type: Object,
    required: false,
    default: {},
  },
  id: {
    type: String,
    required: false,
    default: "",
  },
  modelValue: {
    required: false,
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
  type: {
    type: String,
    required: false,
    default: "text",
  },
  checked: {
    type: Boolean,
    required: false,
    default: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  let value: any = target.value;

  if (props.type === "number") {
    value = target.valueAsNumber || 0; // Convierte el valor a número
  } else if (props.type === "checkbox") {
    value = target.checked; // Convierte el valor a booleano
  }

  emit("update:modelValue", value);
};
</script>
