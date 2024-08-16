<template>
  <h4 class="view-name">{{ titulo }}</h4>
  <hr class="red" />
  <div class="container">
    <form role="form" @submit.prevent="saveFase">
      <div class="row">
        <InputText
          v-model="data.codigo_postal"
          title="Codigo Postal:"
          placeholder="Codigo Postal"
          name="codigo_postal"
          id="codigo_postal"
          :error="errors"
          class="col-sm-6"
        />
        <InputText
          v-model="data.colonia"
          title="Colonia:"
          placeholder="Colonia"
          name="colonia"
          id="colonia"
          :error="errors"
          class="col-sm-6"
        />
        <InputText
          v-model="data.calle"
          title="Calle:"
          placeholder="Calle"
          name="calle"
          id="calle"
          :error="errors"
          class="col-sm-6"
        />
        <InputText
          v-model="data.numero_exterior"
          title="Num Exterior:"
          placeholder="Num Exterior"
          name="numero_exterior"
          id="numero_exterior"
          :error="errors"
          class="col-sm-6"
        />
      </div>
      <div class="row">
        <InputText
          v-model="data.numero_interior"
          title="Num Interior:"
          placeholder="Num Interior"
          name="numero_interior"
          id="numero_interior"
          :error="errors"
          class="col-sm-6"
        />
        <InputText
          v-model="data.telefono"
          title="Telefono:"
          placeholder="Telefono"
          name="telefono"
          id="telefono"
          :error="errors"
          class="col-sm-6"
        />
        <InputText
          v-model="data.extension"
          title="Extension:"
          placeholder="Extension"
          name="extension"
          id="extension"
          :error="errors"
          class="col-sm-6"
        />
        <SelectComponent
          v-model="data.municipio"
          title="Municipio:"
          placeholder="Municipio"
          name="municipio"
          id="municipio"
          :error="errors"
          class="col-sm-6"
          :options="arrayDataMunicipios.data"
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
import { UbicacionConvocanteValidations } from "@/utils/validations/ubicacionConvocanteValidations";
import usePetition from "@/composables/usePetition";
import { useProcesoContratacionStore } from "@/store/procesoContratacionStore";

import {
  IUbicacionConvocante,
  defaultValues,
} from "@/utils/models/ubicacionConvocante";

const route = useRoute();
const router = useRouter();
const procesoContratacionStore = useProcesoContratacionStore();
const itemId = ref("");
const rowDataId = ref("");

const { updateData, getData, createData } = usePetition(
  "ubicacion_convocante/"
);

const { arrayData: arrayDataMunicipios, searchData: searchDataMunicipios } =
  usePetition("cat_municipio/");

const data = ref<IUbicacionConvocante>(defaultValues);

const { formState, isValid, errors, showErrors } = useForm(
  data.value,
  UbicacionConvocanteValidations
);

const handleCancel = () => {
  resetForm();
  router.push({
    name: "listar-ubicacion_convocante",
    params: { idProceso: procesoContratacionStore.getSelectedRowData.id },
  });
};

async function saveFase() {
  formState.value.procedimiento =
    procesoContratacionStore.getSelectedRowData.id;
  console.log(formState.value);
  if (isValid.value) {
    try {
      if (itemId.value) {
        await updateData(formState.value);
      } else {
        await createData(formState.value);
      }
      resetForm();
      router.push({
        name: "listar-ubicacion_convocante",
        params: { idProceso: procesoContratacionStore.getSelectedRowData.id },
      });
    } catch (error) {}
  } else {
    showErrors();
  }
}

const titulo = ref("Crear Sub-Estatus");

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
  route;
  itemId.value = route.params.id ? route.params.id.toString() : "";
  rowDataId.value = route.params.idProceso
    ? route.params.idProceso.toString()
    : "";
  titulo.value = itemId.value ? "Editar Ubicacion" : "Crear Ubicacion";
  await searchDataMunicipios({
    page: 1,
    search: procesoContratacionStore.getSelectedRowData.lugar_inscripcion,
  });
  arrayDataMunicipios.value.data = sortedByField(
    arrayDataMunicipios.value.data,
    "descripcion"
  );
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
    data.value.id = response.id;

    errors.value = [];
    formState.value = data.value;
  }
  scrollTop();
});
</script>
@/models/institutionalActivity @/utils/validations/cat_tipoProyectoValidations
