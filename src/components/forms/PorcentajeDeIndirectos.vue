<template>
  <div class="px-5">
    <div class="row">
      <InputText
        v-model="data.indirectos_totales"
        type="number"
        title="Indirectos Totales:"
        placeholder="Indirectos Totales"
        name="indirectos_totales"
        id="indirectos_totales"
        :error="errors"
        class="col-sm-6"
      />
    </div>
    <div class="row">
      <InputText
        v-model="data.monto_propuesta"
        type="number"
        title="Monto Presupuestal:"
        placeholder="Monto Presupuestal"
        name="monto_propuesta"
        id="monto_propuesta"
        :error="errors"
        class="col-sm-6"
      />
    </div>
    <div class="row pb-5">
      <InputText
        v-model="data.puntuacion_economica"
        type="number"
        title="Puntuación  Economica :"
        placeholder="Puntuación  Presupuestal"
        name="puntuacion_economica"
        id="puntuacion_economica"
        :error="errors"
        class="col-sm-6"
      />
      <InputText
        v-model="data.puntuacion_tecnica"
        type="number"
        title="Puntuación  Tecnica :"
        placeholder="Puntuación  Tecnica"
        name="puntuacion_tecnica"
        id="puntuacion_tecnica"
        :error="errors"
        class="col-sm-6"
      />
    </div>
    <div class="row pt-5">
      <InputText
        v-model="data.porcentaje_indirecto"
        type="number"
        title="Porcentaje Indirectos :"
        placeholder="Porcentaje Indirectos"
        name="porcentaje_indirecto"
        id="porcentaje_indirecto"
        :error="errors"
        class="col-sm-6"
      />
      <InputText
        v-model="data.porcentaje_financiamiento"
        type="number"
        title="Porcentaje Financieros :"
        placeholder="Porcentaje Financieros"
        name="porcentaje_financiamiento"
        id="porcentaje_financiamiento"
        :error="errors"
        class="col-sm-6"
      />
    </div>
    <div class="row">
      <InputText
        v-model="data.porcentaje_iva"
        type="number"
        title="Porcentaje IVA :"
        placeholder="Porcentaje IVA"
        name="porcentaje_iva"
        id="porcentaje_iva"
        :error="errors"
        class="col-sm-6"
      />
      <InputText
        v-model="data.porcentaje_utilidad"
        type="number"
        title="Porcentaje Utilidad :"
        placeholder="Porcentaje Utilidad"
        name="porcentaje_utilidad"
        id="porcentaje_utilidad"
        :error="errors"
        class="col-sm-6"
      />
    </div>

    <div class="modal-footer">
      <button
        type="button"
        class="btn btn-secondary"
        @click="emit('returnDatosGenerales')"
      >
        Regresar
      </button>
      <button type="button" class="btn btn-primary active" @click="save">
        Aceptar
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import InputText from "@/components/InputText.vue";
import { IPorcentajeFields } from "@/utils/models/registroParticipantes";
import { HTTP_METHODS } from "@/utils/constants/methodsPetitions";
import usePetition from "@/composables/usePetition";
import { useForm } from "@/composables/useForm";
import { useParticipantesLicitacionStore } from "@/store/participantesLicitacionsStore";
import useAlert from "@/composables/useAlert";
import { porcentajeIndirectoValidations } from "@/utils/validations/porcentajeIndirectosValidations";

const emit = defineEmits(["returnDatosGenerales"]);
const participanteLicitacion = useParticipantesLicitacionStore();
const { showAlertSuccess, showAlertError } = useAlert();

const { customPetition } = usePetition("registro_participante/");

const data = ref<IPorcentajeFields>({
  indirectos_totales: null,
  monto_propuesta: null,
  puntuacion_economica: null,
  puntuacion_tecnica: null,
  porcentaje_financiamiento: null,
  porcentaje_indirecto: null,
  porcentaje_iva: null,
  porcentaje_utilidad: null,
});
const idParticipantes = ref("");

const { formState, isValid, errors, showErrors } = useForm(
  data.value,
  porcentajeIndirectoValidations
);
const save = async () => {
  if (isValid.value) {
    await customPetition(
      HTTP_METHODS.PATCH,
      formState.value,
      `${idParticipantes.value}/`
    )
      .then(() => {
        showAlertSuccess("Datos guardados correctamente");
        emit("returnDatosGenerales");
      })
      .catch((error) => {
        showAlertError(error);
      })
      .finally(() => {});
  } else {
    showErrors();
  }
};

// Lógica para inicializar campos con existingData si está presente
onBeforeMount(async () => {
  participanteLicitacion.setPorcentajeData();
  idParticipantes.value = participanteLicitacion.getSelectedRowData.id ?? "";
  if (idParticipantes.value && !participanteLicitacion.isPorcentajeDataEmpty) {
    await customPetition(
      HTTP_METHODS.GET,
      null,
      `${idParticipantes.value}/`
    ).then((response: IPorcentajeFields) => {
      data.value.indirectos_totales = response.indirectos_totales;
      data.value.monto_propuesta = response.monto_propuesta;
      data.value.puntuacion_economica = response.puntuacion_economica;
      data.value.puntuacion_tecnica = response.puntuacion_tecnica;
      data.value.porcentaje_financiamiento = response.porcentaje_financiamiento;
      data.value.porcentaje_indirecto = response.porcentaje_indirecto;
      data.value.porcentaje_iva = response.porcentaje_iva;
      data.value.porcentaje_utilidad = response.porcentaje_utilidad;
    });
  }
});
</script>
