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
              id="descripcion-nivel-small"
              class="form-text text-muted app-validation"
              v-if="errors && errors.clave"
              >{{ errors.clave }}</small
            >
          </div>
          <div class="form-group">
            <label for="nombre-operacion">Descripción</label>
            <input
              type="text"
              v-model="data.descripcion"
              class="form-control"
              id="description-position"
              placeholder="Introduzca la descripción"
              autocomplete="off"
            />
            <small
              id="descripcion-nivel-small"
              class="form-text text-muted app-validation"
              v-if="errors && errors.descripcion"
              >{{ errors.descripcion }}</small
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
  import { useConstructionTypes } from "@/composables/useConstructionTypes";
  import { useFormValidation } from "@/composables/useFormValidation";
  import { constructionTypesValidations } from "@/utils/validations/constructionTypesValidations";
  import { IConstructionType, defaultValues } from "@/utils/models/constructionTypeModel";
  
  const viewName = ref("Registrar Tipo de Obra");
  const { saveConstructionType, getConstructionTypeById, updateConstructionType } = useConstructionTypes(); //, updateConstructionType, getConstructionTypeById
  const itemId = ref("");
  const showView = ref(true);//false
   const showKey = ref(true);
  const data = reactive<IConstructionType>(defaultValues);
  
  const { isValid, errors } = useFormValidation(data, constructionTypesValidations);
  
  const handleCancel = () => {
    resetValues();
    router.push({ name: "listar-tipo-obra" });
  };
  const handleSubmit = () => {
    if (isValid.value) {
      if (itemId.value) {
        updateConstructionType({ ...data }).then(() => {
          resetValues();
          router.push({ name: "listar-tipo-obra" });
        });
      } else {
        saveConstructionType({ ...data }).then(() => {
          resetValues();
          router.push({ name: "listar-tipo-obra" });
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
      viewName.value = "Actualizar tipo de obra";
      getConstructionTypeById(itemId.value).then((response) => {
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