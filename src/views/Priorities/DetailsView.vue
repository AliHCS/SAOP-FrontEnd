<template>
  <Transition name="view">
    <div v-if="showView">
      <h4 class="view-name">{{ viewName }}</h4>
      <hr class="red" />
      <form class="p-4">
        <div class="form-group" v-if="showKey">
          <label for="nombre-operacion">Clave</label>
          <input type="text" v-model="data.clave" class="form-control" id="clave-prioridad"
            placeholder="Introduzca la clave" autocomplete="off" />
          <small id="descripcion-nivel-small" class="form-text text-muted app-validation" v-if="errors && errors.clave">{{
            errors.clave }}</small>
        </div>
        <div class="form-group">
          <label for="nombre-operacion">Descripción</label>
          <input type="text" v-model="data.descripcion" class="form-control" id="description-prioridad"
            placeholder="Introduzca la descripción" autocomplete="off" />
          <small id="descripcion-nivel-small" class="form-text text-muted app-validation"
            v-if="errors && errors.descripcion">{{ errors.descripcion }}</small>
        </div>
        <div class="form-group">
          <label for="nombre-operacion">Presidencial</label>
          <input type="text" v-model="data.presidencial" class="form-control" id="precidencial-prioridad"
            placeholder="Introduzca la descripción" autocomplete="off" />
          <small id="descripcion-nivel-small" class="form-text text-muted app-validation"
            v-if="errors && errors.descripcion">{{ errors.descripcion }}</small>
        </div>
        <div class="form-select">
          <label for="nombre-operacion">Tipo de prioridad</label>
          <select v-model="data.tipo_prioridad" class="custom-select form-control">
            <option disabled value="">Selecciona...</option>
            <option v-for="(option, i) in priorities" :key="i" :value="i">
              {{ option }}
            </option>
          </select>
          <small id="descripcion-nivel-small" class="form-text text-muted app-validation"
            v-if="errors && errors.descripcion">{{ errors.descripcion }}</small>
        </div>
        <div class="form-group">
          <label for="nombre-operacion">Normal</label>
          <input type="text" v-model="data.normal" class="form-control" id="precidencial-prioridad"
            placeholder="" autocomplete="off" />
          <small id="descripcion-nivel-small" class="form-text text-muted app-validation"
            v-if="errors && errors.normal">{{ errors.normal }}</small>
        </div>
        <div class="form-group">
          <label for="nombre-operacion">Fecha</label>
          <input type="date" v-model="data.fecha_prioridad" class="form-control" id="precidencial-prioridad"
            placeholder="" autocomplete="off" />
          <small id="descripcion-nivel-small" class="form-text text-muted app-validation"
            v-if="errors && errors.fecha_prioridad">{{ errors.fecha_prioridad }}</small>
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
import { usePriorities } from "@/composables/usePriorities";
import { useFormValidation } from "@/composables/useFormValidation";
import { constructionTypesValidations } from "@/utils/validations/constructionTypesValidations";
import { IPriority, defaultValues } from "@/utils/models/priorityModel";
import { priorities } from "@/utils/constants/priorities"

const viewName = ref("Registrar Prioridad");
const { savePriority, getPriorityById, updatePriority } = usePriorities(); //, updateConstructionType, getConstructionTypeById
const itemId = ref("");
const showView = ref(true);//false
const showKey = ref(true);
const data = reactive<IPriority>(defaultValues);

const { isValid, errors } = useFormValidation(data, constructionTypesValidations);

const handleCancel = () => {
  resetValues();
  router.push({ name: "listar-prioridades" });
};
const handleSubmit = () => {
  if (isValid.value) {
    if (itemId.value) {
      updatePriority({ ...data }).then(() => {
        resetValues();
        router.push({ name: "listar-prioridades" });
      });
    } else {
      savePriority({ ...data }).then(() => {
        resetValues();
        router.push({ name: "listar-prioridades" });
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
    viewName.value = "Actualizar Prioridad";
    getPriorityById(itemId.value).then((response) => {
      data.clave = itemId.value;
      data.descripcion = response.descripcion;
      data.presidencial = response.presidencial;
      data.tipo_prioridad = response.tipo_prioridad;
      data.normal = response.normal;
      data.fecha_prioridad = response.fecha_prioridad;
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