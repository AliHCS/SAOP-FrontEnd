<template>
  <h4 class="view-name">{{ titulo }}</h4>
  <hr class="red" />
  <div class="container">
    <form role="form" @submit.prevent="saveFase">
      <div class="row">
        <InputText
          v-model="data.clave"
          title="Clave:"
          placeholder="Clave"
          name="clave"
          id="clave"
          :disabled="itemId !== ''"
          :error="errors"
          class="col-sm-6"
        />
        <SelectComponent
          v-model="data.estatus_subestatus"
          title="Estatus:"
          placeholder="Estatus"
          name="estatus_subestatus"
          id="estatus_subestatus"
          :error="errors"
          class="col-sm-6"
          :options="dataEstatus.data"
          :optionText="'descripcion'"
          :optionValue="'id'"
        />
      </div>
      <div class="row">
        <InputText
          v-model="data.descripcion_subestatus"
          title="Descripción Corta:"
          placeholder="Descripción Corta"
          name="descripcion_subestatus"
          id="descripcion_subestatus"
          :error="errors"
          class="col-sm-6"
        />
        <div class="form-group col-sm-6">
          <label for="nombre-operacion">Fecha</label>
          <input
            v-model="data.fecha_subestatus"
            type="date"
            class="form-control"
            id="fecha"
            name="fecha"
            placeholder=""
            autocomplete="off"
          />
          <small
            id="descripcion-nivel-small"
            class="form-text text-muted app-validation ui basic label pointing red"
            v-if="errors && errors.fecha_subestatus"
            >{{ errors.fecha_subestatus }}</small
          >
        </div>
      </div>
      <div class="row">
        <SelectComponent
          v-model="data.proceso"
          title="Proceso:"
          placeholder="Proceso"
          name="proceso"
          id="proceso"
          :error="errors"
          class="col-sm-6"
          :options="dataProceso.data"
          :optionText="'descripcion'"
          :optionValue="'id'"
        />
        <SelectComponent
          v-model="data.modulo"
          title="Modulo:"
          placeholder="Modulo"
          name="modulo"
          id="modulo"
          :error="errors"
          class="col-sm-6"
          :options="dataModulo.data"
          :optionText="'descripcion'"
          :optionValue="'id'"
        />
      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" @click="handleCancel">
          Cancelar
        </button>
        <button type="submit" class="btn btn-primary">Guardar</button>
      </div>
    </form>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { scrollTop } from "@/utils/helpers/scrollHelper";
import { useRoute, useRouter } from "vue-router";
import { useForm } from "@/composables/useForm";
import { sortedByField } from "@/utils/helpers/formatDataHelper";
import InputText from "@/components/InputText.vue";
import SelectComponent from "@/components/SelectComponent.vue";
import { cat_subEstatusValidations } from "@/utils/validations/cat_subEstatusValidations";
import usePetition from "@/composables/usePetition";
import { ICatSubEstatus, defaultValues } from "@/utils/models/cat_subEstatus";

const route = useRoute();
const router = useRouter();
const itemId = ref("");
const { updateData, getData, createData } = usePetition("cat_subestatus/");
const { arrayData: dataEstatus, getDatas: getDatasEstatus } =
  usePetition("cat_estatus/");
const { arrayData: dataProceso, getDatas: getDatasProceso } =
  usePetition("cat_proceso/");
const { arrayData: dataModulo, getDatas: getDatasModulos } =
  usePetition("cat_modulo/");

const data = ref<ICatSubEstatus>(defaultValues);

const { formState, isValid, errors, showErrors } = useForm(
  data.value,
  cat_subEstatusValidations
);

const handleCancel = () => {
  resetForm();
  router.push({ name: "listar-cat_subEstatus" });
};

async function saveFase() {
  if (isValid.value) {
    try {
      if (itemId.value) {
        await updateData(formState.value);
      } else {
        await createData(formState.value);
      }
      resetForm();
      router.push({ name: "listar-cat_subEstatus" });
    } catch (error) {}
  } else {
    showErrors();
  }
}

const titulo = ref("Crear Sub-Estatus");

const resetForm = () => {
  data.value.clave = "";
  data.value.descripcion_subestatus = "";
  data.value.estatus_subestatus = "";
  data.value.fecha_subestatus = "";
  data.value.modulo = "";
  data.value.proceso = "";
};

onMounted(async () => {
  itemId.value = route.params.id ? route.params.id.toString() : "";
  titulo.value = itemId.value ? "Editar Sub-Estatus" : "Crear Sub-Estatus";

  await Promise.all([
    getDatasEstatus({ page: 1, size: 100 }),
    getDatasProceso({ page: 1, size: 100 }),
    getDatasModulos({ page: 1, size: 100 }),
  ]);
  dataEstatus.value.data = sortedByField(dataEstatus.value.data, "descripcion");
  dataProceso.value.data = sortedByField(dataProceso.value.data, "descripcion");
  dataModulo.value.data = sortedByField(dataModulo.value.data, "descripcion");
  if (itemId.value) {
    const response = await getData(itemId.value);
    data.value.clave = response.clave;
    data.value.descripcion_subestatus = response.descripcion_subestatus;
    data.value.estatus_subestatus = response.estatus_subestatus_id;
    data.value.fecha_subestatus = response.fecha_subestatus;
    data.value.modulo = response.modulo_id;
    data.value.proceso = response.proceso_id;
    data.value.id = itemId.value;
    errors.value = [];
    formState.value = data.value;
  }
  scrollTop();
});
</script>
@/models/institutionalActivity @/utils/validations/cat_tipoProyectoValidations
