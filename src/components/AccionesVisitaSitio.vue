<template>
    <div
      class="display-4 d-flex icon-actions py-2 col-md-4 d-flex justify-content-end"
    >
      <i
        class="pl-5 ml-2 bi bi-printer"
        @click="emit('imprimir')"
        data-toggle="tooltip"
        data-placement="top"
        title="Imprimir"
      ></i>
      <i
        class="pl-5 ml-2 bi bi-file-text"
        @click="emit('reporte')"
        data-toggle="tooltip"
        data-placement="top"
        title="Reporte"
      ></i>
    </div>
  </template>
  
  <script setup lang="ts">
  
  const emit = defineEmits([
    "imprimir",
    "reporte"
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
  