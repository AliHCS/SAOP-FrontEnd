<template>
    <Transition name="view">
      <div v-if="showView">
        <h4 class="view-name">{{ viewName }}</h4>
        <hr class="red" />
        <CardConfirmComponent title="¿Estás Seguro?" subtitle="La unidad de medida se dará de baja permanentemente."
          text="Verifique la información antes de confirmar la operación." @onConfirm="handleConfirm"
          @onCancel="handleCancel" />
        <form class="mt-4 card p-4">
          <div class="text-center mb-4">Detalle:</div>
          <div class="form-group">
            <label for="nombre-operacion">Clave</label>
            <input type="text" :value="data.clave" class="form-control" id="name-position"
              placeholder="Introduzca el nombre de la operación" autocomplete="off" disabled />
          </div>
          <div class="form-group">
            <label for="nombre-operacion">Descripción</label>
            <input type="text" :value="data.descripcion" class="form-control" id="description-position"
              placeholder="Introduzca el nombre de la operación" autocomplete="off" disabled />
          </div>
          <div class="form-group">
            <label for="nombre-operacion">Unidad</label>
            <input type="text" :value="data.unidad" class="form-control" id="description-position"
              placeholder="Introduzca el nombre de la operación" autocomplete="off" disabled />
          </div>
        </form>
      </div>
    </Transition>
  </template>
  <script setup lang="ts">
  import { reactive, ref, onMounted } from "vue";
  import { scrollTop } from "@/utils/helpers/scrollHelper";
  import router from "@/router";
  import CardConfirmComponent from "@/components/CardConfirmComponent.vue";
  import usePetition from "@/composables/usePetition";
  
  const viewName = "Eliminar unidad de medida";
  const { getData, deleteData } = usePetition("cat_unidad_medida/");
  const itemId = ref("");
  const showView = ref(false)
  const data = reactive({
    clave: "",
    descripcion: "",
    unidad: ""
  });
  
  const handleCancel = () => router.push({ name: "listar-unidad-medida" });
  const handleConfirm = () =>
  deleteData(itemId.value).then(() =>
      router.push({ name: "listar-unidad-medida" })
    );
  
  onMounted(() => {
    itemId.value = router.currentRoute.value.params.id?.toString();
    if (itemId.value) {
      getData(itemId.value).then((response) => {
        data.clave = response.clave;
        data.descripcion = response.descripcion;
        data.unidad = response.unidad;
        showView.value = true
      });
    } else return router.push({ name: "not-found" });
    scrollTop();
  });
  </script>
  <style lang="scss" scoped></style>