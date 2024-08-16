<template>
  <div class="form-group">
    <label class="control-label" :for="id">{{ title }}</label>
    <textarea
      :disabled="disabled"
      class="form-control"
      :value="modelValue"
      @input="handleInput"
      :name="name"
      :id="id"
      :placeholder="placeholder"
    ></textarea>
    <div class="ui basic label pointing red" v-if="error[name]">{{ error[name] }}</div>
  </div>
</template>

<script setup lang="ts">
defineProps({
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
    default: () => ({}),
  },
  id: {
    type: String,
    required: false,
    default: "",
  },
  modelValue: {
    type: String,
    required: false,
    default: "",
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const emit = defineEmits(['update:modelValue']);

const handleInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement;
  if (target) {
    emit('update:modelValue', target.value);
  }
};
</script>
