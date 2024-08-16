<template>
  <h4 class="view-name">{{ titulo }}</h4>
  <hr class="red" />
  <div class="container">
    <form role="form" @submit.prevent="saveEstatus">
      <div class="col-sm-12">
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
        <InputText
          v-model="data.descripcion"
          title="Descripción del estatus:"
          placeholder="descripcion"
          name="descripcion"
          id="descripcion"
          :error="errors"
          class="col-sm-12"
        />
        <SelectComponent
          v-model="data.fk_proceso"
          title="Proceso:"
          placeholder="Proceso"
          name="fk_proceso"
          id="fk_proceso"
          :error="errors"
          class="col-sm-6"
          :options="arrayDataProceso.data"
          :optionText="'descripcion'"
        />
        <div class="form-group col-sm-4">
          <label for="nombre-operacion">Fecha</label>
          <input
            v-model="data.fecha"
            type="datetime-local"
            class="form-control"
            id="fecha"
            name="fecha"
            placeholder=""
            autocomplete="off"
          />
          <div class="ui basic label pointing red" v-if="errors && errors.fecha">
            {{ errors.fecha }}
          </div
          >
        </div>
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
import SelectComponent from "@/components/SelectComponent.vue"
import InputText from "@/components/InputText.vue"
import { catEstatusValidations } from "@/utils/validations/catEstatusValidations";
import usePetition from "@/composables/usePetition";
import CatEstatus  from "@/utils/models/catEstatusModel";

const route = useRoute();
const router = useRouter();
const itemId = ref("");
const { updateData, getData, createData } = usePetition("cat_estatus/");

const { arrayData: arrayDataProceso, getDatas: getDatasProceso } = usePetition("cat_proceso/");

const data = ref<CatEstatus>({
  clave: "",
  descripcion: "",
  fecha: "",
  fk_proceso: ""
});

const { formState, isValid, errors, showErrors } = useForm(
  data.value,
  catEstatusValidations
);

const handleCancel = () => router.push({ name: "listar-cat-estatus" });

async function saveEstatus() {
  if (isValid.value) {
    try {
      if (itemId.value) {
        await updateData(formState.value);
      } else {
        await createData(formState.value);
      }
      router.push({ name: "listar-cat-estatus" });
    } catch (error) {}
  } else {
    showErrors();
  }
}

const titulo = ref("Crear Estatus");

onMounted(async () => {
  await getDatasProceso( { page: 1, size: 100 } )
  itemId.value = route.params.id ? route.params.id.toString() : "";
  titulo.value = itemId.value ? "Editar Estatus" : "Crear Esatus";
  if (itemId.value) {
    getData(itemId.value)
      .then((response: any) => {
        data.value.fk_proceso = response.fk_proceso;
        data.value.clave = response.clave;
        data.value.descripcion = response.descripcion;
        data.value.fecha = response.fecha;
      })
      .catch(() => {
        router.push({ name: "listar-cat-estatus" });
      });
  }
  scrollTop();
});

</script>
