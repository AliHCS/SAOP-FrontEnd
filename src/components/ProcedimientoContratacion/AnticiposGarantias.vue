<template>
  <div v-if="!loading">
    <div class="row px-3 mt-5 mb-3 py-2">
      <div class="col-sm-3">Anticipo Material</div>
      <div class="col-sm-4">
        <label class="form-check-label px-5">
          <input
            v-model="data.anticipo_material"
            type="radio"
            :disabled="!editing"
            name="anticipo_material"
            :value="true"
            class="form-check-input"
          />
          <span class="pl-4">Si</span>
        </label>
        <label class="form-check-label px-5">
          <input
            v-model="data.anticipo_material"
            type="radio"
            :disabled="!editing"
            name="anticipo_material"
            :value="false"
            class="form-check-input"
          />
          <span class="pl-4">No</span>
        </label>
      </div>
      <div class="col-sm-3 text-right">Porcentaje Anticipo Material</div>
      <div class="col-sm-2">
        <input
          v-model="data.porcentaje_anticipo_material"
          :disabled="!editing"
          type="number"
          class="form-control"
          :min="0"
          :max="100"
        />
      </div>
    </div>
    <div class="row px-3 mt-5 mb-3 py-2">
      <div class="col-sm-3">Anticipo Inicio de Trabajo</div>
      <div class="col-sm-4">
        <label class="form-check-label px-5">
          <input
            v-model="data.anticipo_inicio_de_trabajo"
            type="radio"
            :disabled="!editing"
            name="anticipo_inicio_trabajo"
            :value="true"
            class="form-check-input"
          />
          <span class="pl-4">Si</span>
        </label>
        <label class="form-check-label px-5">
          <input
            v-model="data.anticipo_inicio_de_trabajo"
            type="radio"
            name="anticipo_inicio_trabajo"
            :disabled="!editing"
            :value="false"
            class="form-check-input"
          />
          <span class="pl-4">No</span>
        </label>
      </div>
      <div class="col-sm-3 text-right">Porcentaje Anticipo Trabajo</div>
      <div class="col-sm-2">
        <input
          v-model="data.porcentaje_anticipo_inicio_de_trabajo"
          type="text"
          :disabled="!editing"
          class="form-control"
        />
      </div>
    </div>
    <div class="row px-3 mt-5 mb-3 py-2">
      <div class="col-sm-3">Garantías</div>
      <div class="col-sm-4">
        <label class="form-check-label px-5">
          <input
            v-model="data.garantias"
            type="radio"
            :disabled="!editing"
            name="garantias"
            :value="true"
            class="form-check-input"
          />
          <span class="pl-4">Si</span>
        </label>
        <label class="form-check-label px-5">
          <input
            v-model="data.garantias"
            type="radio"
            :disabled="!editing"
            name="garantias"
            :value="false"
            class="form-check-input"
          />
          <span class="pl-4">No</span>
        </label>
      </div>
      <div class="col-sm-3 text-right">Porcentaje Garantías</div>
      <div class="col-sm-2">
        <input
          v-model="data.porcentaje_garantias"
          type="text"
          class="form-control"
          :disabled="!editing"
        />
      </div>
    </div>
    <div class="text-right mt-5 py-4">
      <button
        v-if="editing"
        type="button"
        class="btn btn-secondary"
        @click="editing = false"
      >
        Cancelar
      </button>
      <button
        type="button"
        class="btn btn-primary active ml-4"
        @click="editing ? save() : (editing = true)"
      >
        {{ editing ? "Aceptar" : "Editar" }}
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, watch } from "vue";
import usePetition from "@/composables/usePetition";
import { HTTP_METHODS } from "@/utils/constants/methodsPetitions";
import {
  IAnticiposGarantias,
  defaultValues,
} from "@/utils/models/anticiposGarantias";
import useAlert from "@/composables/useAlert";

const { showAlertSuccess } = useAlert();

const {
  customPetition: crearAnticiposGarantias,
  customPetition: getAnticiposGarantias,
} = usePetition("procedimiento_contratacion/");

const props = defineProps({
  procedimiento: String,
});

var data = reactive<IAnticiposGarantias>(defaultValues);
const loading = ref(false);
const editing = ref(false);

const save = () => {
  crearAnticiposGarantias(
    HTTP_METHODS.PATCH,
    { ...data },
    `${props.procedimiento}/anticipos_ganancias/`
  ).then(() => {
    showAlertSuccess("Datos guardados correctamente");
    editing.value = false;
  });
};

watch(
  () => props.procedimiento,
  () => {
    if (!props.procedimiento) return;
    loading.value = true;
    editing.value = false;
    getAnticiposGarantias(
      HTTP_METHODS.GET,
      {},
      `${props.procedimiento}/anticipos_ganancias/`
    )
      .then((res) => {
        data = res;
      })
      .finally(() => (loading.value = false));
  },
  {
    deep: true,
  }
);
</script>
