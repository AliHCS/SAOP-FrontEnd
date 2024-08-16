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
          </div>
          <div class="form-group">
            <label for="nombre-operacion">Unidad</label>
            <input
              type="text"
              v-model="data.unidad"
              class="form-control"
              id="unidad"
              placeholder="Introduzca la unidad"
              autocomplete="off"
            />
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
  import usePetition from "@/composables/usePetition";
  import { IUnidadMedida, defaultValues } from "@/utils/models/unidadMedida";
  
  const viewName = ref("Registrar unidad de medida");
  const { createData, getData, updateData } = usePetition("cat_unidad_medida/");
  const itemId = ref("");
  const showView = ref(false);
   const showKey = ref(true);
  const data = reactive<IUnidadMedida>(defaultValues);
    
  const handleCancel = () => {
    resetValues();
    router.push({ name: "listar-unidad-medida" });
  };
  const handleSubmit = () => {
   
      if (itemId.value) {
        updateData({ ...data }).then(() => {
          resetValues();
          router.push({ name: "listar-unidad-medida" });
        });
      } else {
        createData({ ...data }).then(() => {
          resetValues();
          router.push({ name: "listar-unidad-medida" });
        });
      }
    
  };
  
  const resetValues = () => {
    data.clave = "";
    data.descripcion = "";
    data.unidad = ""
  };
  
  onMounted(() => {
     itemId.value = router.currentRoute.value.params.id?.toString();
    if (itemId.value) {
      showKey.value = false;
      viewName.value = "Actualizar unidad de medida";
      getData(itemId.value).then((response) => {
        data.clave = itemId.value;
        data.descripcion = response.descripcion;
        data.unidad = response.unidad;
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