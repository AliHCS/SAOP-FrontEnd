<template>
  <h4 class="view-name">{{ viewName }}</h4>
  <hr class="red" />
  <CardConfirmComponent
    title="¿Estás Seguro?"
    subtitle="La Ubicacion de la Convocante se dará de baja permanentemente."
    text="Verifique la información antes de confirmar la operación."
    @onConfirm="handleConfirm"
    @onCancel="handleCancel"
  />
  <form class="mt-4 card p-4">
    <div class="text-center mb-4">Detalle:</div>
    <div class="row">
      <div class="form-group col-sm-6">
        <label for="nombre-operacion">ID</label>
        <input
          type="text"
          :value="data.id"
          class="form-control"
          id="nombre-operacion"
          placeholder="Introduzca el nombre de la operación"
          autocomplete="off"
          disabled
        />
      </div>
      <div class="form-group col-sm-6">
        <label for="siglas">Calle</label>
        <input
          type="text"
          :value="data.calle"
          class="form-control"
          id="siglas"
          placeholder="Introduzca el nombre de la operación"
          autocomplete="off"
          disabled
        />
      </div>
      <div class="form-group col-sm-6">
        <label for="siglas">No. Exterior</label>
        <input
          type="text"
          :value="data.numero_exterior"
          class="form-control"
          id="siglas"
          placeholder="Introduzca el nombre de la operación"
          autocomplete="off"
          disabled
        />
      </div>
      <div class="form-group col-sm-6">
        <label for="siglas">No. Interior</label>
        <input
          type="text"
          :value="data.numero_interior"
          class="form-control"
          id="siglas"
          placeholder="Introduzca el nombre de la operación"
          autocomplete="off"
          disabled
        />
      </div>
    </div>
    <div class="row">
      <div class="form-group col-sm-6">
        <label for="siglas">Colonia</label>
        <input
          type="text"
          :value="data.colonia"
          class="form-control"
          id="siglas"
          placeholder="Introduzca el nombre de la operación"
          autocomplete="off"
          disabled
        />
      </div>
      <div class="form-group col-sm-6">
        <label for="siglas">Codigo Postal</label>
        <input
          type="text"
          :value="data.codigo_postal"
          class="form-control"
          id="siglas"
          placeholder="Introduzca el nombre de la operación"
          autocomplete="off"
          disabled
        />
      </div>
      <div class="form-group col-sm-6">
        <label for="siglas">Telefono</label>
        <input
          type="text"
          :value="data.telefono"
          class="form-control"
          id="siglas"
          placeholder="Introduzca el nombre de la operación"
          autocomplete="off"
          disabled
        />
      </div>
      <div class="form-group col-sm-6">
        <label for="siglas">Extension</label>
        <input
          type="text"
          :value="data.extension"
          class="form-control"
          id="siglas"
          placeholder="Introduzca el nombre de la operación"
          autocomplete="off"
          disabled
        />
      </div>
    </div>
    <div class="row">
      <!-- Municipio -->
      <div class="form-group col-sm-6">
        <label for="municipio">Municipio</label>
        <input
          type="text"
          :value="data.municipio"
          class="form-control"
          id="municipio"
          placeholder="Introduzca el municipio"
          autocomplete="off"
          disabled
        />
      </div>
      <!-- procedimiento -->
      <div class="form-group col-sm-6">
        <label for="municipio">Procedimiento</label>
        <input
          type="text"
          :value="data.procedimiento"
          class="form-control"
          id="municipio"
          placeholder="Introduzca el municipio"
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
import {
  IUbicacionConvocante,
  defaultValues,
} from "@/utils/models/ubicacionConvocante";
import { useProcesoContratacionStore } from "@/store/procesoContratacionStore";

const itemId = ref<any>({ value: 0 });
const route = useRoute();
const router = useRouter();
const procesoContratacionStore = useProcesoContratacionStore();

const data = ref<IUbicacionConvocante>(defaultValues);

const viewName = "Eliminar Ubicacion de la Convocante";
const { deleteData, getData } = usePetition("ubicacion_convocante/");
const handleCancel = () => {
  resetForm();
  router.push({
    name: "listar-ubicacion_convocante",
    params: { idProceso: procesoContratacionStore.getSelectedRowData.id },
  });
};
const handleConfirm = () =>
  deleteData(itemId.value).then((response) => {
    if (response) {
      resetForm();
      router.push({
        name: "listar-ubicacion_convocante",
        params: { idProceso: procesoContratacionStore.getSelectedRowData.id },
      });
    }
  });

const resetForm = () => {
  data.value.calle = null;
  data.value.numero_exterior = null;
  data.value.numero_interior = null;
  data.value.colonia = null;
  data.value.codigo_postal = null;
  data.value.extension = null;
  data.value.telefono = null;
  data.value.municipio = null;
};
onMounted(async () => {
  if (procesoContratacionStore.isSelectedRowDataEmpty) {
    router.push({ name: "listar-procedimiento-contrataciones" });
  }
  itemId.value = route.params.id.toString();
  if (itemId.value) {
    const response = await getData(itemId.value);
    data.value.calle = response.calle;
    data.value.numero_exterior = response.numero_exterior;
    data.value.numero_interior = response.numero_interior;
    data.value.colonia = response.colonia;
    data.value.codigo_postal = response.codigo_postal;
    data.value.extension = response.extension;
    data.value.telefono = response.telefono;
    data.value.municipio = response.municipio.id;
    data.value.procedimiento = response.procedimiento.forma_procedimiento;
    data.value.id = response.id;
  } else {
    return router.push({ name: "not-found" });
  }
  scrollTop();
});
</script>
<style lang="scss" scoped></style>
