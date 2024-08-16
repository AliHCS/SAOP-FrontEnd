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
import { useFeasibility } from "@/composables/useFeasibility";
import { useFormValidation } from "@/composables/useFormValidation";
import { feasibilityValidations } from "@/utils/validations/feasibilityValidations";
import { IFeasibility, defaultValues } from "@/utils/models/feasibilityModel";

const viewName = ref("Registrar Estatus de Proyecto");
const { saveFeasibility, getFeasibilityById, updateFeasibility } = useFeasibility(); 
const itemId = ref("");
const showView = ref(false);
const showKey = ref(true);
const data = reactive<IFeasibility>(defaultValues);

const { isValid, errors } = useFormValidation(data, feasibilityValidations);

const handleCancel = () => {
  resetValues();
  router.push({ name: "listar-factibilidad-obra" });
};
const handleSubmit = () => {
  if (isValid.value) {
    if (itemId.value) {
      updateFeasibility({ ...data }).then(() => {
        resetValues();
        router.push({ name: "listar-factibilidad-obra" });
      });
    } else {
      saveFeasibility({ ...data }).then(() => {
        resetValues();
        router.push({ name: "listar-factibilidad-obra" });
      });
    }
  }
};

const resetValues = () => {
  data.clave = "";
  data.descripcion = "";
};

onMounted(() => {
  itemId.value = router.currentRoute.value.params.id?.toString();
  if (itemId.value) {
    showKey.value = false;
    viewName.value = "Actualizar Factibilidad de Obra";
    getFeasibilityById(itemId.value).then((response) => {
      data.clave = itemId.value;
      data.descripcion = response.descripcion;
      showView.value = true;
    });
  } else {
    resetValues()
    showView.value = true;
  }
  scrollTop();
});
</script>
<style lang="scss" scoped></style>