<template>
  <h4 class="view-name">{{ viewName }}</h4>
  <hr class="red" />
  <CardConfirmComponent
    title="¿Estás Seguro?"
    subtitle="La actividad institucional se dará de baja permanentemente."
    text="Verifique la información antes de confirmar la operación."
    @onConfirm="handleConfirm"
    @onCancel="handleCancel"
  />
  <form class="mt-4 card p-4">
    <div class="text-center mb-4">Detalle:</div>
    <div class="form-group">
      <label for="nombre-operacion">clave</label>
      <input
        type="text"
        :value="data.clave"
        class="form-control"
        id="nombre-operacion"
        placeholder="Introduzca el nombre de la operación"
        autocomplete="off"
        disabled
      />
    </div>
    <div class="form-group">
      <label for="siglas">Descripción</label>
      <input
        type="text"
        :value="data.descripcion"
        class="form-control"
        id="siglas"
        placeholder="Introduzca el nombre de la operación"
        autocomplete="off"
        disabled
      />
    </div>
    <div class="form-check">
      <input
        type="checkbox"
        :checked="data.estatus"
        class="form-check-input"
        id="es-ampliacion"
        disabled
      />
      <label class="form-check-label pl-4" for="es-ampliacion"> Estatus </label>
    </div>
  </form>
</template>
<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import { scrollTop } from "@/utils/helpers/scrollHelper";
import { useRoute, useRouter } from "vue-router";
import CardConfirmComponent from "@/components/CardConfirmComponent.vue";
import usePetition from "@/composables/usePetition";

const itemId = ref<any>({ value: 0 });
const route = useRoute();
const router = useRouter();
const data = reactive({
  descripcion: "",
  estatus: false,
  clave: "",
});
const viewName = "Eliminar Fase";
const { deleteData, getData } = usePetition("cat_fase/");
const handleCancel = () => router.push({ name: "listar-cat_Fase" });
const handleConfirm = () =>
  deleteData(itemId.value).then((response) => {
    if (response) {
      router.push({ name: "listar-cat_Fase" });
    }
  });
onMounted(() => {
  itemId.value = route.params.id;
  if (itemId.value) {
    getData(itemId.value)
      .then((response) => {
        data.descripcion = response.descripcion;
        data.estatus = response.estatus;
        data.clave = response.clave;
      })
      .catch(() => {
        router.push({ name: "listar-cat_Fase" });
      });
  } else {
    return router.push({ name: "not-found" });
  }
  scrollTop();
});
</script>
<style lang="scss" scoped></style>
