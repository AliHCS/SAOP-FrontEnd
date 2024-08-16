<template>
    <Transition name="view">
      <div v-if="showView">
        <h4 class="view-name">{{ viewName }}</h4>
        <hr class="red" />
        <CardConfirmComponent title="¿Estás Seguro?" subtitle="El tipo de procedimiento se dará de baja permanentemente."
          text="Verifique la información antes de confirmar la operación." @onConfirm="handleConfirm"
          @onCancel="handleCancel" />
        <form class="mt-4 card p-4">
          <div class="text-center mb-4">Detalle:</div>
          <div class="form-group">
            <label for="nombre-operacion">Clave</label>
            <input type="text" :value="data.clave" class="form-control" id="clave"
              placeholder="" autocomplete="off" disabled />
          </div>
          <div class="form-group">
            <label for="nombre-operacion">Descripción</label>
            <input type="text" :value="data.descripcion_tipo_procedimiento" class="form-control" id="description"
              placeholder="" autocomplete="off" disabled />
          </div>
          <div class="form-group">
            <label for="nombre-operacion">Prefijo </label>
            <input type="text" :value="data.prefijo" class="form-control" id="description-position"
              placeholder="" autocomplete="off" disabled />
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
  import { ITipoProcedimiento, defaultValues } from "@/utils/models/tipoProcedimiento";

  
  const viewName = "Eliminar tipo de procedimiento";
  const { getData, deleteData } = usePetition("cat_tipo_procedimiento/");
  const itemId = ref("");
  const showView = ref(false)
  const data = reactive<ITipoProcedimiento>(defaultValues);

  
  const handleCancel = () => router.push({ name: "listar-tipo-procedimientos" });
  const handleConfirm = () =>
  deleteData(itemId.value).then(() =>
      router.push({ name: "listar-tipo-procedimientos" })
    );
  
  onMounted(() => {
    itemId.value = router.currentRoute.value.params.id?.toString();
    if (itemId.value) {
      getData(itemId.value).then((response) => {
        data.clave = response.clave;
        data.descripcion_tipo_procedimiento = response.descripcion_tipo_procedimiento;
        data.prefijo = response.prefijo;
        showView.value = true
      });
    } else return router.push({ name: "not-found" });
    scrollTop();
  });
  </script>
  <style lang="scss" scoped></style>