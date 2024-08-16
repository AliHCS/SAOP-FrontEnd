<template>
  <h4 class="view-name">{{ viewName }}</h4>
  <hr class="red" />
  <CardConfirmComponent
    title="¿Estás Seguro?"
    subtitle="La moneda se dará de baja permanentemente."
    text="Verifique la información antes de confirmar la operación."
    @onConfirm="handleConfirm"
    @onCancel="handleCancel"
  />
  <form class="mt-4 card p-4">
    <div class="text-center mb-4">Detalle:</div>
    <div class="row">
      <div class="form-group col-sm-6">
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
      <div class="form-group col-sm-6">
        <label for="siglas">Descripción Corta</label>
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
    </div>
  </form>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { scrollTop } from "@/utils/helpers/scrollHelper";
import { useRoute, useRouter } from "vue-router";
import CardConfirmComponent from "@/components/CardConfirmComponent.vue";
import usePetition from "@/composables/usePetition";
import { ICatMoneda, defaultValues } from "@/utils/models/cat_moneda";

const itemId = ref<any>({ value: 0 });
const route = useRoute();
const router = useRouter();
const data = ref<ICatMoneda>(defaultValues);

const viewName = "Eliminar Moneda";
const { deleteData, getData } = usePetition("cat_moneda/");
const handleCancel = () => router.push({ name: "listar-cat_moneda" });
const handleConfirm = () =>
  deleteData(itemId.value).then((response) => {
    if (response) {
      router.push({ name: "listar-cat_moneda" });
    }
  });

onMounted(async () => {
  itemId.value = route.params.id.toString();
  if (itemId.value) {
    const response = await getData(itemId.value);
    data.value.clave = response.clave;
    data.value.descripcion = response.descripcion;

    data.value.id = itemId.value;
  } else {
    return router.push({ name: "not-found" });
  }
  scrollTop();
});
</script>
<style lang="scss" scoped></style>
