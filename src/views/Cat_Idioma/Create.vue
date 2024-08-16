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
        <InputText
          v-model="data.descripcion"
          title="Descripción:"
          placeholder="Descripción "
          name="descripcion_subestatus"
          id="descripcion_subestatus"
          :error="errors"
          class="col-sm-6"
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
import InputText from "@/components/InputText.vue";
import { cat_idiomaValidations } from "@/utils/validations/cat_IdiomaValidations";
import usePetition from "@/composables/usePetition";
import { ICatIdioma, defaultValues } from "@/utils/models/cat_idioma";

const route = useRoute();
const router = useRouter();
const itemId = ref("");
const { updateData, getData, createData } = usePetition("cat_idioma/");

const data = ref<ICatIdioma>(defaultValues);

const { formState, isValid, errors, showErrors } = useForm(
  data.value,
  cat_idiomaValidations
);

const handleCancel = () => {
  resetForm();
  router.push({ name: "listar-cat_idioma" });
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
      router.push({ name: "listar-cat_idioma" });
    } catch (error) {}
  } else {
    showErrors();
  }
}

const titulo = ref("Crear Idioma");

const resetForm = () => {
  data.value.clave = "";
  data.value.descripcion = "";
};

onMounted(async () => {
  itemId.value = route.params.id ? route.params.id.toString() : "";
  titulo.value = itemId.value ? "Editar Idioma" : "Crear Idioma";
  if (itemId.value) {
    const response = await getData(itemId.value);
    data.value.clave = response.clave;
    data.value.descripcion = response.descripcion;
    data.value.id = itemId.value;
    errors.value = [];
    formState.value = data.value;
  }
  scrollTop();
});
</script>
@/models/institutionalActivity @/utils/validations/cat_tipoProyectoValidations
