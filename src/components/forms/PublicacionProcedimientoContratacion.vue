<template>
  <div>
    <h5 class="text-center">Rango de fechas para los trabajos</h5>

    <div class="row py-3">
      <div
        class="col-md-2 d-flex align-content-center flex-wrap justify-content-end text-right"
      >
        Fecha inicio
      </div>
      <div class="col-md-8 d-flex">
        <input
          v-model="data.fecha_programada"
          type="date"
          class="form-control"
          id="precidencial-prioridad"
          placeholder=""
          autocomplete="off"
          @change="updateTextDate"
        />
        <input
          v-model="textDate"
          type="text"
          class="form-control flex-grow-1 flex-shrink-0"
          id="precidencial-prioridad"
          placeholder=""
          autocomplete="off"
          readonly
        />
      </div>
    </div>

    <div class="row py-3">
      <div
        class="col-md-2 d-flex align-content-center flex-wrap justify-content-end text-right"
      >
        Hora
      </div>
      <div class="col-md-8 d-flex">
        <input
          v-model="hora"
          type="number"
          class="form-control me-2"
          placeholder="HH"
          min="0"
          max="23"
          @change="updateHoraProgramada"
        />
        <input
          v-model="minutos"
          type="number"
          class="form-control"
          placeholder="MM"
          min="0"
          max="59"
          @change="updateHoraProgramada"
        />
      </div>
    </div>

    <div class="modal-footer">
      <button
        type="button"
        class="btn btn-secondary"
        @click="emit('closeModal')"
      >
        Cerrar
      </button>
      <button type="button" class="btn btn-primary active" @click="save()">
        Aceptar
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
/* import usePetition from "@/composables/usePetition"; */
import {
  IPublicacionProcedimientoContratacion,
  defaultValues,
} from "@/utils/models/PublicacionProcedimientoContratacion";

const emit = defineEmits(["save", "closeModal"]);

const data = ref<IPublicacionProcedimientoContratacion>(defaultValues);

const textDate = ref<string | null>(null);
const hora = ref<number | null>(null);
const minutos = ref<number | null>(null);

const updateTextDate = () => {
  if (data.value.fecha_programada) {
    const date = new Date(data.value.fecha_programada);
    textDate.value = date.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } else {
    textDate.value = null;
  }
};

const updateHoraProgramada = () => {
  if (hora.value !== null && minutos.value !== null) {
    data.value.hora_programada = `${String(hora.value).padStart(
      2,
      "0"
    )}:${String(minutos.value).padStart(2, "0")}`;
  } else {
    data.value.hora_programada = null;
  }
};

const save = () => {
  console.log(data.value);
  emit("closeModal", true);
};

onMounted(() => {});
</script>
