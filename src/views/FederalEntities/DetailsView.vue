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
          <label for="nombre-operacion">Descripción corta</label>
          <input type="text" v-model="data.descripcion_corta" class="form-control" id="description-prioridad"
            placeholder="Introduzca la descripción corta" autocomplete="off" />
          <small id="descripcion_corta-nivel-small" class="form-text text-muted app-validation"
            v-if="errors && errors.descripcion_corta">{{ errors.descripcion_corta }}</small>
        </div>
        <div class="form-group">
          <label for="nombre-operacion">Descripción capital</label>
          <input type="text" v-model="data.descripcion_capital" class="form-control" id="precidencial-prioridad"
            placeholder="Introduzca la descripción de capital" autocomplete="off" />
          <small id="descripcion-nivel-small" class="form-text text-muted app-validation"
            v-if="errors && errors.descripcion_capital">{{ errors.descripcion_capital }}</small>
        </div>
        <div class="form-group">
          <label for="nombre-operacion">Región</label>
          <input type="text" v-model="data.region" class="form-control" id="precidencial-prioridad"
            placeholder="Introduzca la región" autocomplete="off" />
          <small id="descripcion-nivel-small" class="form-text text-muted app-validation"
            v-if="errors && errors.region">{{ errors.region }}</small>
        </div>
        <div class="form-group">
          <label for="nombre-operacion">Meso región</label>
          <input type="text" v-model="data.meso_region" class="form-control" id="precidencial-prioridad"
            placeholder="Introduzca meso región" autocomplete="off" />
          <small id="descripcion-nivel-small" class="form-text text-muted app-validation"
            v-if="errors && errors.meso_region">{{ errors.meso_region }}</small>
        </div>
        <div class="form-select">
          <label for="nombre-operacion">País</label>
          <select v-model="data.pais" class="custom-select form-control">
            <option disabled value="0">Selecciona...</option>
            <option v-for="(option, i) in paises.data" :key="i" :value="option.id">
              {{ option.nombre_oficial }}
            </option>
          </select>
          <small id="descripcion-nivel-small" class="form-text text-muted app-validation"
            v-if="errors && errors.pais">{{ errors.pais }}</small>
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
import { useFederalEntities } from "@/composables/useFederalEntities";
import { useFormValidation } from "@/composables/useFormValidation";
import { federalEntitiesValidations } from "@/utils/validations/federalEntitiesValidations";
import { IFederalEntity, defaultValues } from "@/utils/models/federalEntityModel";
import usePetition from "@/composables/usePetition";

const viewName = ref("Registrar Entidad Federativa");
const { saveFederalEntity, getFederalEntityById, updateFederalEntity } = useFederalEntities(); //, updateConstructionType, getConstructionTypeById
const { arrayData: paises, getDatas } = usePetition("cat_pais/");
const itemId = ref("");
const showView = ref(false);
const showKey = ref(true);
const data = reactive<IFederalEntity>(defaultValues);

const { isValid, errors } = useFormValidation(data, federalEntitiesValidations);

const handleCancel = () => {
  resetValues();
  router.push({ name: "listar-entidad-federativa" });
};
const handleSubmit = () => {
  if (isValid.value) {
    if (itemId.value) {
      updateFederalEntity({ ...data }).then(() => {
        resetValues();
        router.push({ name: "listar-entidad-federativa" });
      });
    } else {
      saveFederalEntity({ ...data }).then(() => {
        resetValues();
        router.push({ name: "listar-entidad-federativa" });
      });
    }
  }
};

const resetValues = () => {
  data.clave = "";
  data.descripcion = "";
  data.descripcion_corta = "";
  data.descripcion_capital = "";
  data.region = 0;
  data.meso_region = 0;
  data.pais = 0;
};

onMounted(() => {
  getDatas({ page: 1 })
  itemId.value = router.currentRoute.value.params.id?.toString();
  if (itemId.value) {
    showKey.value = false;
    viewName.value = "Actualizar Entidad Federativa";
    getFederalEntityById(itemId.value).then((response) => {
      data.clave = itemId.value;
      data.descripcion = response.descripcion;
      data.descripcion_corta = response.descripcion_corta;
      data.descripcion_capital = response.descripcion_capital;
      data.region = response.region;
      data.meso_region = response.meso_region;
      data.pais = response.pais;
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