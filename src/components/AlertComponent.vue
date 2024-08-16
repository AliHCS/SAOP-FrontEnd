<template>
  <div class="alert mb-8" :class="`alert-${props.type}`" role="alert">
    <h4 class="alert-heading">{{ props.title }}</h4>
    <hr />
    <slot name="body"></slot>
    <button
      v-if="props.showButton"
      type="button"
      class="btn btn-sm"
      :class="` btn-${props.type}`"
      @click="handleButtonClick"
    >
      {{ props.textButton }}
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true,
    default: "",
  },
  type: {
    type: String,
    required: false,
    default: "success",
  },
  textButton: {
    type: String,
    required: false,
    default: "Aceptar",
  },
  showButton: {
    type: Boolean,
    required: false,
    default: true,
  },
});

const emit = defineEmits(["onConfirm"]);

const handleButtonClick = () => {
  emit("onConfirm");
};
</script>
