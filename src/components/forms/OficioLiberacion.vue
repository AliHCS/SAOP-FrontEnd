<template>
  <div>
    <h4 class="view-name">{{ viewName }}</h4>
    <hr class="red" />
    <div class="row app-options-bar">
      <div
        class="d-flex align-items-center buttons-component align-items-center"
      >
        <div class="col-md-8">
          <button
            title="Limpiar campos"
            @click="resetForm()"
            class="dt-button btn btn-primary active mr-4"
            type="button"
            :disabled="readOnlyView"
          >
            <i class="bi bi-eraser-fill"></i>
          </button>
          <span v-if="readOnlyView">
            <button
              title="Cancelar"
              class="btn btn-secondary mr-4"
              type="button"
              v-if="props.datosOficioLiberacion"
              @click="handleCancel()"
            >
              <span><b>Cancelar</b></span>
            </button>
            <button
              title="Crear"
              class="dt-button btn btn-primary active"
              type="button"
              :disabled="!readOnlyView"
              @click="changeStatusForm"
            >
              <span><b>Editar</b></span>
            </button>
          </span>
        </div>
      </div>
    </div>
    <div class="d-flex">
      <div class="d-flex flex-column col-6">
        <InputText
          v-model="datosOficioLiberacion.oficio"
          title="Oficio:"
          name="oficio"
          placeholder="# Oficio"
          id="oficio"
          :error="errors"
          class="mt-5"
        />
        <div class="form-group">
          <label for="nombre-operacion">Fecha Oficio</label>
          <input
            v-model="datosOficioLiberacion.fecha_oficio"
            type="date"
            class="form-control"
            id="fecha_oficio"
            name="fecha_oficio"
            placeholder=""
            autocomplete="off"
          />
          <div
            class="ui basic label pointing red"
            v-if="errors && errors.fecha_oficio"
          >
            {{ errors.fecha_oficio }}
          </div>
        </div>
        <InputText
          title="Página de oficio:"
          v-model="datosOficioLiberacion.pagina_oficio"
          placeholder="Página de oficio"
          name="pagina_oficio"
          id="pagina_oficio"
          :error="errors"
        />

        <div class="text-right pr-2 flex-grow-1 mt-5">
          <button
            type="button"
            class="btn btn-secondary mr-4"
            @click="handleCancel"
          >
            Cancelar
          </button>
          <button
            title="Guardar"
            class="dt-button btn btn-primary active btn-crear"
            type="button"
            @click="handleSubmit()"
          >
            <span><b>Guardar</b></span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import InputText from "@/components/InputText.vue";
import { useForm } from "@/composables/useForm";
import { HTTP_METHODS } from "@/utils/constants/methodsPetitions";
import { oficioLiberacionValidations } from "@/utils/validations/oficioLiberacionValidations";
import { IOficioLiberacionData } from "@/utils/models/oficioLiberacionModel";
import usePetition from "@/composables/usePetition";
import useAlert from "@/composables/useAlert";

const { showAlertSuccess } = useAlert();

const props = defineProps({
  idRow: {
    type: String,
  },
  datosOficioLiberacion: {
    type: Object as () => IOficioLiberacionData,
    required: false,
    default: {},
  },
  loading: {
    type: Boolean,
  },
});

const viewName = "Oficio de liberación";
const readOnlyView = ref(false);

const changeStatusForm = () => {
  readOnlyView.value = !readOnlyView.value;
  console.log(readOnlyView.value);
};

const { customPetition: updateOficio } = usePetition(
  "procedimiento_contratacion/"
);

const { isValid, errors, showErrors } = useForm(
  props.datosOficioLiberacion,
  oficioLiberacionValidations
);

const handleSubmit = async () => {
  if (isValid.value) {
    updateOficio(
      HTTP_METHODS.PATCH,
      { ...props.datosOficioLiberacion },
      `${props.idRow}/oficio_liberacion/`
    ).then(() => {
      showAlertSuccess("Información guardada correctamente");
      handleCancel();
    });
  } else {
    showErrors();
  }
};

const handleCancel = () => window.location.reload();

const resetForm = () => {
  console.log("reset");
  props.datosOficioLiberacion.oficio = "";
  props.datosOficioLiberacion.fecha_oficio = "";
  props.datosOficioLiberacion.pagina_oficio = "";
};
</script>
