<template>
  <Transition name="view">
    <div v-if="showView">
      <h4 class="view-name">{{ viewName }}</h4>
      <hr class="red" />
      <form class="p-4" @submit.prevent="handleSubmit">
        <div>
          <div class="form-group">
            <label for="nombre-operacion">Clave</label>
            <input type="text" v-model="data.clave" class="form-control" id="name-position" :disabled="!showKey"
              placeholder="Introduzca la clave" autocomplete="off" />
          </div>
          <div class="form-group">
            <label for="nombre-operacion">Descripción</label>
            <input type="text" v-model="data.descripcion" class="form-control" id="description-position"
              placeholder="Introduzca la descripción" autocomplete="off" />
          </div>
          <SelectComponent v-model="data.modulo" title="Modulo:" placeholder="Selecciona..." name="modulo" id="modulo"
            :options="arrayDataCatModulo.data" optionText="descripcion" optionValue="id" />
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
import { ICatProceso, defaultValues } from "@/utils/models/catProceso";
import SelectComponent from "@/components/SelectComponent.vue";

// selects data
const { arrayData: arrayDataCatModulo, getDatas: getDatasCatModulo } = usePetition("cat_modulo/");
// get data
const { createData, getData, updateData } = usePetition("cat_proceso/");

const viewName = ref("Registrar proceso");
const itemId = ref("");
const showView = ref(false);
const showKey = ref(true);
const data = reactive<ICatProceso>(defaultValues);


const handleCancel = () => {
  resetValues();
  router.push({ name: "listar-cat-proceso" });
};
const handleSubmit = () => {
  if (itemId.value) {
    updateData({ ...data }).then(() => {
      resetValues();
      router.push({ name: "listar-cat-proceso" });
    });
  } else {
    createData({ ...data }).then(() => {
      resetValues();
      router.push({ name: "listar-cat-proceso" });
    });
  }

};

const resetValues = () => {
  data.clave = "";
  data.descripcion = "";
  data.modulo = null;
  data.modulo_descripcion = "";

};

onMounted(async () => {
  await getDatasCatModulo({ page: 1, size: 100 })
  itemId.value = router.currentRoute.value.params.id?.toString();
  if (itemId.value) {
    showKey.value = false;
    viewName.value = "Actualizar proceso";
    getData(itemId.value).then((response) => {
      data.clave = itemId.value;
      data.descripcion = response.descripcion;
      data.modulo = arrayDataCatModulo.value.data.find((el: any) => el.id == response.modulo)?.id;
      data.modulo_descripcion = response.modulo_descripcion;
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