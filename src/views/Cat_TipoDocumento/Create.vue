<template>
  <h4 class="view-name">{{ titulo }}</h4>
  <hr class="red" />
  <div class="container">
    <form role="form" @submit.prevent="saveTipoProyecto">
      <InputText
        :disabled="itemId !== ''"
        v-model="data.clave"
        title="Clave:"
        placeholder="Clave"
        name="clave"
        id="clave"
        :error="errors"
      />
      <InputText
        v-model="data.nombre"
        title="Tipo Documento:"
        placeholder="Tipo"
        name="tipo"
        id="tipo"
        :error="errors"
      />
      <InputText
        v-model="data.descripcion"
        title="Descripción:"
        placeholder="Descripción"
        name="descripcion"
        id="descripcion"
        :error="errors"
      />
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
import { cat_tipoDocumentoValidations } from "@/utils/validations/cat_tipoDocumentoValidations";
import usePetition from "@/composables/usePetition";
import CatTipoDocumento from "@/utils/models/cat_tipoDocumento";

const route = useRoute();
const router = useRouter();
const itemId = ref("");
const { updateData, getData, createData } = usePetition("cat_tipo_documento/");

const data = ref<CatTipoDocumento>({
  clave: "",
  nombre: "",
  descripcion: "",
});

const { formState, isValid, errors, showErrors } = useForm(
  data.value,
  cat_tipoDocumentoValidations
);

const handleCancel = () => router.push({ name: "listar-cat_tipoDocumento" });

async function saveTipoProyecto() {
  if (isValid.value) {
    try {
      if (itemId.value) {
        await updateData(formState.value);
      } else {
        await createData(formState.value);
      }
      router.push({ name: "listar-cat_tipoDocumento" });
    } catch (error) {}
  } else {
    showErrors();
  }
}

const titulo = ref("Crear Tipo Documento");

onMounted(() => {
  itemId.value = route.params.id ? route.params.id.toString() : "";
  titulo.value = itemId.value
    ? "Editar Tipo Documento"
    : "Crear Tipo Documento";
  if (itemId.value) {
    getData(itemId.value)
      .then((response: any) => {
        data.value.descripcion = response.descripcion;
        data.value.nombre = response.nombre;
        data.value.clave = response.clave;
      })
      .catch(() => {
        router.push({ name: "listar-cat_tipoDocumento" });
      });
  }
  scrollTop();
});
</script>
@/models/institutionalActivity @/utils/validations/cat_tipoDocumentoValidations
