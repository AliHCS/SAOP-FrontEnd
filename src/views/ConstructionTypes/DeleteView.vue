<template>
  <Transition name="view">
    <div v-if="showView">
      <h4 class="view-name">{{ viewName }}</h4>
      <hr class="red" />
      <CardConfirmComponent title="¿Estás Seguro?" subtitle="El tipo de obra se dará de baja permanentemente."
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
      </form>
    </div>
  </Transition>
</template>
<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import { scrollTop } from "@/utils/helpers/scrollHelper";
import router from "@/router";
import CardConfirmComponent from "@/components/CardConfirmComponent.vue";
import { useConstructionTypes } from "@/composables/useConstructionTypes";

const viewName = "Eliminar tipo de obra";
const { deleteConstructionType, getConstructionTypeById } = useConstructionTypes();
const itemId = ref("");
const showView = ref(false)
const data = reactive({
  clave: "",
  nivel: "",
  descripcion: "",
  base_confianza:0,
  fojaref:0
});

const handleCancel = () => router.push({ name: "listar-tipo-obra" });
const handleConfirm = () =>
deleteConstructionType(itemId.value).then(() =>
    router.push({ name: "listar-tipo-obra" })
  );

onMounted(() => {
  itemId.value = router.currentRoute.value.params.id?.toString();
  if (itemId.value) {
    getConstructionTypeById(itemId.value).then((response) => {
      data.clave = response.clave;
      data.nivel = response.nivel;
      data.descripcion = response.descripcion;
      data.base_confianza = response.base_confianza;
      data.fojaref = response.fojaref;
      showView.value = true
    });
  } else return router.push({ name: "not-found" });
  scrollTop();
});
</script>
<style lang="scss" scoped></style>