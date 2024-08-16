<template>
    <Transition name="view">
      <div v-if="showView">
        <h4 class="view-name">{{ viewName }}</h4>
        <hr class="red" />
        <form class="p-4">
          <div class="form-group" v-if="showKey">
            <label for="nombre-operacion">Clave</label>
            <input
              type="text"
              v-model="data.clave"
              class="form-control"
              id="name-position"
              placeholder="Introduzca la clave"
              autocomplete="off"
            />
            <small
              id="nombre-nivel-small"
              class="form-text text-muted app-validation"
              v-if="errors && errors.clave"
              >{{ errors.clave }}</small
            >
          </div>
          <div class="form-group">
            <label for="nombre-operacion">Nombre</label>
            <input
              type="text"
              v-model="data.nombre"
              class="form-control"
              id="description-position"
              placeholder="Introduzca la descripción"
              autocomplete="off"
            />
            <small
              id="nombre-nivel-small"
              class="form-text text-muted app-validation"
              v-if="errors && errors.nombre"
              >{{ errors.nombre }}</small
            >
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
  import { useLevelsByArea } from "@/composables/useLevelsByArea";
  import { useFormValidation } from "@/composables/useFormValidation";
  import { levelsByAreaValidations } from "@/utils/validations/levelsByAreaValidations";
  import { ILevelByArea, defaultValues } from "@/utils/models/levelByAreaModel";
  
  const viewName = ref("Registrar Nivel por Area");
  const { saveLevelByArea, getLevelByAreaById, updateLevelByArea } = useLevelsByArea(); //, updateLevelByArea, getLevelByAreaById
  const itemId = ref("");
  const showView = ref(false);
   const showKey = ref(true);
  const data = reactive<ILevelByArea>(defaultValues);
  
  const { isValid, errors } = useFormValidation(data, levelsByAreaValidations);
  
  const handleCancel = () => {
    resetValues();
    router.push({ name: "listar-niveles-area" });
  };
  const handleSubmit = () => {
    if (isValid.value) {
      if (itemId.value) {
        updateLevelByArea({ ...data }).then(() => {
          resetValues();
          router.push({ name: "listar-niveles-area" });
        });
      } else {
        saveLevelByArea({ ...data }).then(() => {
          resetValues();
          router.push({ name: "listar-niveles-area" });
        });
      }
    }
  };
  
  const resetValues = () => {
    data.clave = "";
    data.nombre = "";
  };
  
  onMounted(() => {
     itemId.value = router.currentRoute.value.params.id?.toString();
    if (itemId.value) {
      showKey.value = false;
      viewName.value = "Actualizar tipo de obra";
      getLevelByAreaById(itemId.value).then((response) => {
        data.clave = itemId.value;
        data.nombre = response.nombre;
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