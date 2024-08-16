<template>
  <input
    type="text"
    class="form-control"
    :value="modelValue"
    @input="
      $emit('update:modelValue', ($event.target as HTMLInputElement)?.value)
    "
    @copy="$event.preventDefault()"
    @paste="$event.preventDefault()"
    @cut="$event.preventDefault()"
    :class="{ 'input-error': modelValue === '' }"
    @blur="handleBlur"
  />
</template>

<script setup lang="ts">
const { modelValue } = defineProps({
  modelValue: {
    type: String,
    default: "",
    required: true,
  },
});

const handleBlur = (event: any) => {
  const trimmedValue = event.target.value.trim();
  emit("update:modelValue", trimmedValue);
};

const emit = defineEmits(["update:modelValue"]);
</script>

<style scoped>
.input-error {
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px #d0021ac0;
}
</style>
