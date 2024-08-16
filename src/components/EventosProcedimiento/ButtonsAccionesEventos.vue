<template>
    <div
      class="display-4 d-flex icon-actions py-2 col-md-4 d-flex justify-content-end"
    >
      <i
        class="pl-5 ml-2 bi bi-image-alt"
        @click="emit('visitaSitio')"
        data-toggle="tooltip"
        data-placement="top"
        title="Visita al sitio"
      ></i>
      <i
        class="pl-5 ml-2 bi bi bi-people-fill"
        @click="emit('juntaAclaracion')"
        data-toggle="tooltip"
        data-placement="top"
        title="Junta de aclaraciones"
      ></i>
      <i
        class="pl-5 ml-2 bi bi-journal-check"
        @click="emit('actoRecepcion')"
        data-toggle="tooltip"
        data-placement="top"
        title="Acto recepción y apertuera de propuestas"
      ></i>
    </div>
  </template>
  
  <script setup lang="ts">
  // import { useProcesoContratacionStore } from "@/store/procesoContratacionStore";
  // const procesoContratacionStore = useProcesoContratacionStore();
  // const registro = procesoContratacionStore.getSelectedRowData
  const emit = defineEmits([
    "visitaSitio",
    "juntaAclaracion",
    "actoRecepcion",
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
  