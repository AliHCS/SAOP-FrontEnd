<template>
  <div
    class="display-4 d-flex icon-actions py-2 col-md-4 d-flex justify-content-end"
  >
    <i
      class="pl-5 ml-2 bi bi-file-earmark-check-fill"
      @click="emit('asignaE7')"
      data-toggle="tooltip"
      data-placement="top"
      title="Asigna E7"
    ></i>
    <i
      class="pl-5 ml-2 bi bi-pencil-square"
      @click="emit('publicacion')"
      data-toggle="tooltip"
      data-placement="top"
      title="Publicación"
    ></i>
    <i
      class="pl-5 ml-2 bi bi-geo-alt-fill"
      @click="emit('ubicacion')"
      data-toggle="tooltip"
      data-placement="top"
      title="Ubicación"
    ></i>
    <i
      class="pl-5 ml-2 bi bi-person-plus-fill"
      @click="emit('participantes')"
      data-toggle="tooltip"
      data-placement="top"
      title="Registro de participantes"
      :class="{'disabled': props.disabledParticipantes}"
    ></i>
    <i
      class="pl-5 ml-2 bi bi-file-plus-fill"
      @click="emit('documentacion')"
      data-toggle="tooltip"
      data-placement="top"
      title="Documentacion del Procedimiento"
    ></i>
    <i
      class="pl-5 ml-2 bi bi-card-checklist"
      @click="emit('eventos')"
      data-toggle="tooltip"
      data-placement="top"
      title="Eventos del procedimiento"
    ></i>
  </div>
</template>

<script setup lang="ts">
// import { useProcesoContratacionStore } from "@/store/procesoContratacionStore";

const props = defineProps({
  disabledParticipantes: Boolean,
});

const emit = defineEmits([
  "asignaE7",
  "publicacion",
  "ubicacion",
  "participantes",
  "documentacion",
  "eventos"
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
.disabled {
  opacity: 0.5 !important;
  pointer-events: none;
}
</style>
