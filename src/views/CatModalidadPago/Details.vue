<template>
    <Transition name="view">
      <div v-if="showView">
        <h4 class="view-name">{{ viewName }}</h4>
        <hr class="red" />
        <form class="p-4" @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="nombre-operacion">Clave</label>
            <input
              :disabled="!showKey"
              type="text"
              v-model="data.clave"
              class="form-control"
              id="name-position"
              placeholder="Introduzca la clave"
              autocomplete="off"
            />
          </div>
          <div class="form-group">
            <label for="nombre-operacion">Descripción</label>
            <input
              type="text"
              v-model="data.descripcion_modalidad_pago"
              class="form-control"
              id="description-position"
              placeholder="Introduzca la descripción"
              autocomplete="off"
            />
          </div>
          <div class="modal-footer p-0 mt-5">
            <button type="button" class="btn btn-secondary" @click="handleCancel">
              Cancelar
            </button>
            <button type="submit" class="btn btn-primary">
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
  import { ICatModalidadPago, defaultValues } from "@/utils/models/catModalidadPago";
  
  const viewName = ref("Registrar modalidad de pago");
  const { createData, getData, updateData } = usePetition("cat_modalidad_pago/");
  const itemId = ref("");
  const showView = ref(false);
   const showKey = ref(true);
  const data = reactive<ICatModalidadPago>(defaultValues);
    
  const handleCancel = () => {
    resetValues();
    router.push({ name: "listar-cat-modalidad-pago" });
  };
  const handleSubmit = () => {
      if (itemId.value) {
        updateData({ ...data }).then(() => {
          resetValues();
          router.push({ name: "listar-cat-modalidad-pago" });
        });
      } else {
        createData({ ...data }).then(() => {
          resetValues();
          router.push({ name: "listar-cat-modalidad-pago" });
        });
      }
    
  };
  
  const resetValues = () => {
    data.clave = "";
    data.descripcion_modalidad_pago = "";
  };
  
  onMounted(() => {
     itemId.value = router.currentRoute.value.params.id?.toString();
    if (itemId.value) {
      showKey.value = false;
      viewName.value = "Actualizar modalidad de pago";
      getData(itemId.value).then((response) => {
        data.clave = itemId.value;
        data.descripcion_modalidad_pago = response.descripcion_modalidad_pago;
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