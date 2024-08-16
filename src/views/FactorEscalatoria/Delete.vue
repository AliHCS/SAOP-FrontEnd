<template>
    <Transition name="view">
      <div v-if="showView">
        <h4 class="view-name">{{ viewName }}</h4>
        <hr class="red" />
        <CardConfirmComponent title="¿Estás Seguro?" subtitle="El factor escalatoria se dará de baja permanentemente."
          text="Verifique la información antes de confirmar la operación." @onConfirm="handleConfirm"
          @onCancel="handleCancel" />
        <form class="mt-4 card p-4">
          <div class="text-center mb-4">Detalle:</div>
          <div class="form-group">
            <label for="nombre-operacion">Año</label>
            <input type="text" :value="data.anio" class="form-control" id="name-position"
              placeholder="" autocomplete="off" disabled />
          </div>
          <div class="form-group">
            <label for="nombre-operacion">Mes</label>
            <input type="text" :value="data.mes" class="form-control" id="description-position"
              placeholder="" autocomplete="off" disabled />
          </div>
          <div class="form-group">
            <label for="nombre-operacion">Factor</label>
            <input type="text" :value="data.factor" class="form-control" id="description-position"
              placeholder="" autocomplete="off" disabled />
          </div>
          <div class="form-group">
            <label for="nombre-operacion">Unidad responsable</label>
            <input type="text" :value="data.unidad_responsable" class="form-control" id="description-position"
              placeholder="" autocomplete="off" disabled />
          </div>
          <div class="form-group">
            <label for="nombre-operacion">Departamento</label>
            <input type="text" :value="data.departamento" class="form-control" id="description-position"
              placeholder="" autocomplete="off" disabled />
          </div>
          <div class="form-group">
            <label for="nombre-operacion">Entidad federativa</label>
            <input type="text" :value="data.entidad_federativa" class="form-control" id="description-position"
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
  import { IFactorEscalatoria, defaultValues } from "@/utils/models/factorEscalatoria";

  
  const viewName = "Eliminar factor escalatoria";
  const { getData, deleteData } = usePetition("factor_escalatoria/");
  const itemId = ref("");
  const showView = ref(false)
  const data = reactive<IFactorEscalatoria>(defaultValues);

  
  const handleCancel = () => router.push({ name: "listar-factor-escalatoria" });
  const handleConfirm = () =>
  deleteData(itemId.value).then(() =>
      router.push({ name: "listar-factor-escalatoria" })
    );
  
  onMounted(() => {
    itemId.value = router.currentRoute.value.params.id?.toString();
    if (itemId.value) {
      getData(itemId.value).then((response) => {
        data.id = itemId.value;
        data.anio = response.anio;
        data.mes = response.mes;
        data.factor = response.factor;
        data.pais = response.pais;
        data.unidad_responsable = response.unidad_responsable
        data.departamento = response.departamento
        data.entidad_federativa = response.entidad_federativa
        showView.value = true
      });
    } else return router.push({ name: "not-found" });
    scrollTop();
  });
  </script>
  <style lang="scss" scoped></style>