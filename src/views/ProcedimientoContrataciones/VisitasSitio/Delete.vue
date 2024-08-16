<template>
    <Transition name="view">
      <div v-if="showView">
        <h4 class="view-name">{{ viewName }}</h4>
        <hr class="red" />
        <CardConfirmComponent title="¿Estás Seguro?" subtitle="La visita a sitio se dará de baja permanentemente."
          text="Verifique la información antes de confirmar la operación." @onConfirm="handleConfirm"
          @onCancel="handleCancel" />
        <form class="mt-4 card p-4">
          <div class="text-center mb-4">Detalle:</div>
          <div class="form-group">
            <label for="nombre-operacion">ID</label>
            <input type="text" :value="data.id" class="form-control" id="name-position"
              placeholder="" autocomplete="off" disabled />
          </div>
          <div class="form-group">
            <label for="nombre-operacion">Folio</label>
            <input type="text" :value="data.folio" class="form-control" id="description-position"
              placeholder="" autocomplete="off" disabled />
          </div>
          <div class="form-group">
            <label for="nombre-operacion">Evento </label>
            <input type="text" :value="data.evento" class="form-control" id="description-position"
              placeholder="" autocomplete="off" disabled />
          </div>
          <div class="form-group">
            <label for="nombre-operacion">Empresa</label>
            <input type="text" :value="data.nombre_empresa" class="form-control" id="description-position"
              placeholder="" autocomplete="off" disabled />
          </div>
          <div class="form-group">
            <label for="nombre-operacion">Representante empresa</label>
            <input type="text" :value="data.representante_empresa" class="form-control" id="description-position"
              placeholder="" autocomplete="off" disabled />
          </div>
          <div class="form-group">
            <label for="nombre-operacion">Cargo representante</label>
            <input type="text" :value="data.cargo_representante" class="form-control" id="description-position"
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
  import { IVisitaSitio, defaultValues } from "@/utils/models/visitaSitio";

  
  const viewName = "Eliminar visita a sitio";
  const { getData, deleteData } = usePetition("visita_sitio/");
  const itemId = ref("");
  const showView = ref(false)
  const data = reactive<IVisitaSitio>(defaultValues);

  
  const handleCancel = () => router.push({ name: "listar-visitas-sitio" });
  const handleConfirm = () =>
  deleteData(itemId.value).then(() =>
      router.push({ name: "listar-visitas-sitio" })
    );
  
  onMounted(() => {
    itemId.value = router.currentRoute.value.params.id?.toString();
    if (itemId.value) {
      getData(itemId.value).then((response) => {
        data.id = response.id;
        data.evento = response.evento;
        data.folio = response.folio;
        data.nombre_empresa = response.nombre_empresa
        data.representante_empresa = response.representante_empresa
        data.cargo_representante = response.cargo_representante
        showView.value = true
      });
    } else return router.push({ name: "not-found" });
    scrollTop();
  });
  </script>
  <style lang="scss" scoped></style>