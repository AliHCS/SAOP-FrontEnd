<template>
    <div
      class="display-4 d-flex icon-actions py-2 col-md-4 d-flex justify-content-end"
    >
      <i
        class="pl-5 ml-2 bi bi-folder-plus"
        @click="emit('registroPropuestas')"
        data-toggle="tooltip"
        data-placement="top"
        title="Registro propuestas"
      ></i>
    </div>
  </template>
  
  <script setup lang="ts">
  const emit = defineEmits([
    "registroPropuestas",
  ]);
  
  </script>
  
  <style lang="scss" scoped>
  .icon-actions i {
    cursor: pointer;
    transition: transform 0.3s, font-size 0.2s;
    opacity: 0.8;
  
    &:hover {
      transform: scale(1.1);
      opacity: 1;
      color: var(--primary-red);
    }
  }
  </style>
  