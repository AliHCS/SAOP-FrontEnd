<template>
  <Transition name="view">
    <div v-if="showView">
      <h4 class="view-name">{{ viewName }}</h4>
      <hr class="red" />
      <form class="p-4">
        <div class="form-group" v-if="showKey">
          <label for="nombre-operacion">Clave</label>
          <input type="text" v-model="data.clave" class="form-control" 
            placeholder="Introduzca la clave" autocomplete="off" />
          <small class="form-text text-muted app-validation" v-if="errors && errors.clave">{{
            errors.clave }}</small>
        </div>
        <div class="form-group">
          <label for="nombre-operacion">Descripción</label>
          <input type="text" v-model="data.descripcion" class="form-control" 
            placeholder="Introduzca la descripción" autocomplete="off" />
          <small class="form-text text-muted app-validation"
            v-if="errors && errors.descripcion">{{ errors.descripcion }}</small>
        </div>
        <div class="form-group">
          <label for="nombre-operacion">Fecha</label>
          <input type="date" v-model="data.fecha" class="form-control" 
            placeholder="" autocomplete="off" />
          <small class="form-text text-muted app-validation"
            v-if="errors && errors.fecha">{{ errors.fecha }}</small>
        </div>
        <div class="form-group">
          <label for="nombre-operacion">Proceso</label>
          <input type="text" v-model="data.fk_proceso" class="form-control" 
            placeholder="Introduzca la descripción" autocomplete="off" />
          <small class="form-text text-muted app-validation"
            v-if="errors && errors.fk_proceso">{{ errors.fk_proceso }}</small>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="handleCancel">
            Cancelar
          </button>
          <button type="button" @click="handleSubmit" class="btn btn-primary">
            Guardar
          </button>
        </div>
      </form>
    </div>
  </Transition>
</template>
<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import { scrollTop } from "@/utils/helpers/scrollHelper";
import router from "@/router";
import { useStatus } from "@/composables/useStatus";
import { useFormValidation } from "@/composables/useFormValidation";
import { statusValidations } from "@/utils/validations/statusValidations";
import { IStatus, defaultValues } from "@/utils/models/statusModel";
import {simpleDate} from "@/utils/helpers/dateHelper"

const viewName = ref("Registrar Estatus de Proyecto");
const { saveStatus, getStatusById, updateStatus } = useStatus(); 
const itemId = ref("");
const showView = ref(false);
const showKey = ref(true);
const data = reactive<IStatus>(defaultValues);

const { isValid, errors } = useFormValidation(data, statusValidations);

const handleCancel = () => {
  resetValues();
  router.push({ name: "listar-estatus-proyecto" });
};
const handleSubmit = () => {
  if (isValid.value) {
    if (itemId.value) {
      updateStatus({ ...data }).then(() => {
        resetValues();
        router.push({ name: "listar-estatus-proyecto" });
      });
    } else {
      saveStatus({ ...data }).then(() => {
        resetValues();
        router.push({ name: "listar-estatus-proyecto" });
      });
    }
  }
};

const resetValues = () => {
  data.clave = "";
  data.descripcion = "";
  data.fecha = "";
  data.fk_proceso = 0;
};

onMounted(() => {
  itemId.value = router.currentRoute.value.params.id?.toString();
  if (itemId.value) {
    showKey.value = false;
    viewName.value = "Actualizar Estatus de Proyecto";
    getStatusById(itemId.value).then((response) => {
      data.clave = itemId.value;
      data.descripcion = response.descripcion;
      data.fecha = simpleDate(response.fecha);
      data.fk_proceso = response.fk_proceso;
      showView.value = true;
    });
  } else {
    showView.value = true;
    resetValues()
  }
  scrollTop();
});
</script>
<style lang="scss" scoped></style>