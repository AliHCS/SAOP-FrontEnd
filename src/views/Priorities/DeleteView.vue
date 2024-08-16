<template>
  <Transition name="view">
    <div v-if="showView">
      <h4 class="view-name">{{ viewName }}</h4>
      <hr class="red" />
      <CardConfirmComponent title="¿Estás Seguro?" subtitle="La prioridad se dará de baja permanentemente."
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
          <label for="nombre-operacion">Presidencial</label>
          <input type="text" :value="data.presidencial" class="form-control" id="description-position"
            autocomplete="off" disabled 
          />
        </div>
        <div class="form-group">
          <label for="nombre-operacion">Tipo de prioridad</label>
          <input type="text" :value="data.tipo_prioridad" class="form-control" id="description-position"
            autocomplete="off" disabled 
          />
        </div>
        <div class="form-group">
          <label for="nombre-operacion">Normal</label>
          <input type="text" :value="data.normal" class="form-control" id="description-position"
            autocomplete="off" disabled 
          />
        </div>
        <div class="form-group">
          <label for="nombre-operacion">Fecha</label>
          <input type="text" :value="data.fecha_prioridad" class="form-control" id="description-position"
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
import { usePriorities } from "@/composables/usePriorities";

const viewName = "Eliminar tipo de obra";
const { deletePriority, getPriorityById } = usePriorities();
const itemId = ref("");
const showView = ref(false)
const data = reactive({
  clave: "",
  descripcion: "",
  presidencial: "",
  tipo_prioridad:"",
  fecha_prioridad:"",
  normal:""
});

const handleCancel = () => router.push({ name: "listar-prioridades" });
const handleConfirm = () =>
deletePriority(itemId.value).then(() =>
    router.push({ name: "listar-prioridades" })
  );

onMounted(() => {
  itemId.value = router.currentRoute.value.params.id?.toString();
  if (itemId.value) {
    getPriorityById(itemId.value).then((response) => {
      data.clave = response.clave;
      data.presidencial = response.presidencial;
      data.descripcion = response.descripcion;
      data.tipo_prioridad = response.tipo_prioridad;
      data.normal = response.normal;
      data.fecha_prioridad = response.fecha_prioridad;
      showView.value = true
    });
  } else return router.push({ name: "not-found" });
  scrollTop();
});
</script>
<style lang="scss" scoped></style>