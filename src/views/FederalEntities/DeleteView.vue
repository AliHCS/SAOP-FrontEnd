<template>
  <Transition name="view">
    <div v-if="showView">
      <h4 class="view-name">{{ viewName }}</h4>
      <hr class="red" />
      <CardConfirmComponent title="¿Estás Seguro?" subtitle="La entidad federativa se dará de baja permanentemente."
        text="Verifique la información antes de confirmar la operación." @onConfirm="handleConfirm"
        @onCancel="handleCancel" />
      <form class="mt-4 card p-4">
        <div class="text-center mb-4">Detalle:</div>
        <div class="form-group">
          <label for="nombre-operacion">Clave</label>
          <input type="text" :value="data.clave" class="form-control" id="name-position"
            autocomplete="off" disabled />
        </div>
        <div class="form-group">
          <label for="nombre-operacion">Descripción</label>
          <input type="text" :value="data.descripcion" class="form-control" id="description-position"
            autocomplete="off" disabled />
        </div>
        <div class="form-group">
          <label for="nombre-operacion">Descripción corta</label>
          <input type="text" :value="data.descripcion_corta" class="form-control" id="description-position"
            autocomplete="off" disabled 
          />
        </div>
        <div class="form-group">
          <label for="nombre-operacion">Descripción capital</label>
          <input type="text" :value="data.descripcion_capital" class="form-control" id="description-position"
            autocomplete="off" disabled 
          />
        </div>
        <div class="form-group">
          <label for="nombre-operacion">Región</label>
          <input type="text" :value="data.region" class="form-control" id="description-position"
            autocomplete="off" disabled 
          />
        </div>
        <div class="form-group">
          <label for="nombre-operacion">Meso región</label>
          <input type="text" :value="data.meso_region" class="form-control" id="description-position"
            autocomplete="off" disabled 
          />
        </div>
        <div class="form-group">
          <label for="nombre-operacion">País</label>
          <input type="text" :value="data.pais" class="form-control" id="description-position"
            autocomplete="off" disabled 
          />
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
import { useFederalEntities } from "@/composables/useFederalEntities";
import { IFederalEntity, defaultValues } from "@/utils/models/federalEntityModel";
import usePetition from "@/composables/usePetition";

const viewName = "Eliminar tipo de obra";
const { deleteFederalEntity, getFederalEntityById } = useFederalEntities();
const itemId = ref("");
const showView = ref(false)
const data = reactive<IFederalEntity>(defaultValues);

const { arrayData: paises, getDatas } = usePetition("cat_pais/");

const handleCancel = () => router.push({ name: "listar-entidad-federativa" });
const handleConfirm = () =>
deleteFederalEntity(itemId.value).then(() =>
    router.push({ name: "listar-entidad-federativa" })
  );

onMounted(() => {
  getDatas({ page: 1 })
  itemId.value = router.currentRoute.value.params.id?.toString();
  if (itemId.value) {
    getFederalEntityById(itemId.value).then((response) => {
      data.clave = response.clave;
      data.descripcion = response.descripcion;
      data.descripcion_corta = response.descripcion_corta;
      data.descripcion_capital = response.descripcion_capital;
      data.region = response.region;
      data.meso_region = response.meso_region;
      let pais:any = paises.value.data.find((pais:any) => response.pais == pais.id)
      data.pais = pais ? pais.nombre_oficial : '-'
      showView.value = true
    });
  } else return router.push({ name: "not-found" });
  scrollTop();
});
</script>
<style lang="scss" scoped></style>