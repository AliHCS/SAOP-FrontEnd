<template>
  <Transition name="view">
    <div v-if="showView">
      <h4 class="view-name">{{ viewName }}</h4>
      <hr class="red" />
      <CardConfirmComponent
        title="¿Estás Seguro?"
        subtitle="El participante se dará de baja permanentemente."
        text="Verifique la información antes de confirmar la operación."
        @onConfirm="handleConfirm"
        @onCancel="handleCancel"
      />
      <form class="mt-4 card p-4">
        <div class="text-center mb-4">Detalle:</div>
        <div class="form-group">
          <label for="nombre-operacion">id</label>
          <input
            type="text"
            :value="data.id"
            class="form-control"
            id="name-position"
            placeholder=""
            autocomplete="off"
            disabled
          />
        </div>
        <div class="form-group">
          <label for="nombre-operacion">Fecha inscripción</label>
          <input
            type="text"
            :value="data.fecha_inscripcion"
            class="form-control"
            id="description-position"
            placeholder=""
            autocomplete="off"
            disabled
          />
        </div>
        <div class="form-group">
          <label for="nombre-operacion">Monto </label>
          <input
            type="text"
            :value="data.monto_propuesta"
            class="form-control"
            id="description-position"
            placeholder=""
            autocomplete="off"
            disabled
          />
        </div>
        <div class="form-group">
          <label for="nombre-operacion">Lugar inscripción</label>
          <input
            type="text"
            :value="data.lugar_inscripcion"
            class="form-control"
            id="description-position"
            placeholder=""
            autocomplete="off"
            disabled
          />
        </div>
        <div class="form-group">
          <label for="nombre-operacion">Posición </label>
          <input
            type="text"
            :value="data.posicion_concurso"
            class="form-control"
            id="description-position"
            placeholder=""
            autocomplete="off"
            disabled
          />
        </div>
        <div class="form-group">
          <label for="nombre-operacion">Comentarios </label>
          <input
            type="text"
            :value="data.comentarios"
            class="form-control"
            id="description-position"
            placeholder=""
            autocomplete="off"
            disabled
          />
        </div>
        <div class="form-group">
          <label for="nombre-operacion">Porcentaje financiamiento </label>
          <input
            type="text"
            :value="data.porcentaje_financiamiento"
            class="form-control"
            id="description-position"
            placeholder=""
            autocomplete="off"
            disabled
          />
        </div>
        <div class="form-group">
          <label for="nombre-operacion">Porcentaje indirecto </label>
          <input
            type="text"
            :value="data.porcentaje_indirecto"
            class="form-control"
            id="description-position"
            placeholder=""
            autocomplete="off"
            disabled
          />
        </div>
        <div class="form-group">
          <label for="nombre-operacion">Porcentaje utilidad </label>
          <input
            type="text"
            :value="data.porcentaje_utilidad"
            class="form-control"
            id="description-position"
            placeholder=""
            autocomplete="off"
            disabled
          />
        </div>
        <div class="form-group">
          <label for="nombre-operacion">Indirectos totales </label>
          <input
            type="text"
            :value="data.indirectos_totales"
            class="form-control"
            id="description-position"
            placeholder=""
            autocomplete="off"
            disabled
          />
        </div>
        <div class="form-group">
          <label for="nombre-operacion">Solvente </label>
          <input
            type="text"
            :value="data.solvente"
            class="form-control"
            id="description-position"
            placeholder=""
            autocomplete="off"
            disabled
          />
        </div>
        <div class="form-group">
          <label for="nombre-operacion">Puntuación técnica </label>
          <input
            type="text"
            :value="data.puntuacion_tecnica"
            class="form-control"
            id="description-position"
            placeholder=""
            autocomplete="off"
            disabled
          />
        </div>
        <div class="form-group">
          <label for="nombre-operacion">Puntuación económica </label>
          <input
            type="text"
            :value="data.puntuacion_economica"
            class="form-control"
            id="description-position"
            placeholder=""
            autocomplete="off"
            disabled
          />
        </div>
        <div class="form-group">
          <label for="nombre-operacion">Porcentaje iva </label>
          <input
            type="text"
            :value="data.porcentaje_iva"
            class="form-control"
            id="description-position"
            placeholder=""
            autocomplete="off"
            disabled
          />
        </div>
        <div class="form-group">
          <label for="nombre-operacion">Ganador de propuesta </label>
          <input
            type="text"
            :value="data.ganador_propuesta ? 'Si' : 'No'"
            class="form-control"
            id="description-position"
            placeholder=""
            autocomplete="off"
            disabled
          />
        </div>
        <div class="form-group">
          <label for="nombre-operacion">Hora inscripción </label>
          <input
            type="text"
            :value="data.hora_inscripcion"
            class="form-control"
            id="description-position"
            placeholder=""
            autocomplete="off"
            disabled
          />
        </div>
        <div class="form-group">
          <label for="nombre-operacion">Procedimiento contratación</label>
          <input
            type="text"
            :value="data.procedimiento_contratacion"
            class="form-control"
            id="description-position"
            placeholder=""
            autocomplete="off"
            disabled
          />
        </div>
        <div class="form-group">
          <label for="nombre-operacion">Proveedor</label>
          <input
            type="text"
            :value="data.proveedor"
            class="form-control"
            id="description-position"
            placeholder=""
            autocomplete="off"
            disabled
          />
        </div>
        <div class="form-group">
          <label for="nombre-operacion">Módulo</label>
          <input
            type="text"
            :value="data.modulo"
            class="form-control"
            id="description-position"
            placeholder=""
            autocomplete="off"
            disabled
          />
        </div>
        <div class="form-group">
          <label for="nombre-operacion">Proceso</label>
          <input
            type="text"
            :value="data.proceso"
            class="form-control"
            id="description-position"
            placeholder=""
            autocomplete="off"
            disabled
          />
        </div>
        <div class="form-group">
          <label for="nombre-operacion">Estatus participante</label>
          <input
            type="text"
            :value="data.estatus_registro_participante"
            class="form-control"
            id="description-position"
            placeholder=""
            autocomplete="off"
            disabled
          />
        </div>
      </form>
    </div>
  </Transition>
</template>
<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import { scrollTop } from "@/utils/helpers/scrollHelper";
import router from "@/router";
import CardConfirmComponent from "@/components/CardConfirmComponent.vue";
import usePetition from "@/composables/usePetition";
import {
  IRegistroParticipante,
  defaultValues,
} from "@/utils/models/registroParticipante";

const viewName = "Eliminar participante";
const { getData, deleteData } = usePetition("registro_participante/");
const itemId = ref("");
const showView = ref(false);
const data = reactive<IRegistroParticipante>(defaultValues);

const handleCancel = () =>
  router.push({
    name: "listar-registro-participantes",
    params: { idProceso: itemId.value },
  });
const handleConfirm = () =>
  deleteData(itemId.value).then(() =>
    router.push({
      name: "listar-registro-participantes",
      params: { idProceso: itemId.value },
    })
  );

onMounted(() => {
  itemId.value = router.currentRoute.value.params.idProceso?.toString();
  if (itemId.value) {
    getData(itemId.value).then((response) => {
      data.id = response.id || '-';
      data.fecha_inscripcion = response.fecha_inscripcion || '-';
      data.monto_propuesta = response.monto_propuesta || '-';
      data.lugar_inscripcion = response.lugar_inscripcion || '-';
      data.posicion_concurso = response.posicion_concurso || '-';
      data.comentarios = response.comentarios || '-';
      data.porcentaje_financiamiento = response.porcentaje_financiamiento || '-';
      data.porcentaje_indirecto = response.porcentaje_indirecto || '-';
      data.porcentaje_utilidad = response.porcentaje_utilidad || '-';
      data.indirectos_totales = response.indirectos_totales || '-';
      data.solvente = response.solvente || '-';
      data.puntuacion_tecnica = response.puntuacion_tecnica || '-';
      data.puntuacion_economica = response.puntuacion_economica || '-';
      data.porcentaje_iva = response.porcentaje_iva || '-';
      data.ganador_propuesta = response.ganador_propuesta || '-';
      data.hora_inscripcion = response.hora_inscripcion || '-';
      data.procedimiento_contratacion = response.procedimiento_contratacion || '-';
      data.proveedor = response.proveedor || '-';
      data.modulo = response.modulo || '-';
      data.proceso = response.proceso || '-';
      data.estatus_registro_participante = response.estatus_registro_participante || '-';

      showView.value = true;
    });
  } else return router.push({ name: "not-found" });
  scrollTop();
});
</script>
<style lang="scss" scoped></style>
