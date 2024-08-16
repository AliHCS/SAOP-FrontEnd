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
import { cat_tipoProyectoValidations } from "@/utils/validations/cat_tipoProyectoValidations";
import usePetition from "@/composables/usePetition";
import CatTipoProyeto from "@/utils/models/cat_tipoProyecto";

const route = useRoute();
const router = useRouter();
const itemId = ref("");
const { updateData, getData, createData } = usePetition("cat_tipo_proyecto/");

const data = ref<CatTipoProyeto>({
  clave: "",
  descripcion: "",
});

const { formState, isValid, errors, showErrors } = useForm(
  data.value,
  cat_tipoProyectoValidations
);

const handleCancel = () => router.push({ name: "listar-cat_tipoProyecto" });

async function saveTipoProyecto() {
  if (isValid.value) {
    try {
      if (itemId.value) {
        await updateData(formState.value);
      } else {
        await createData(formState.value);
      }
      router.push({ name: "listar-cat_tipoProyecto" });
    } catch (error) {}
  } else {
    showErrors();
  }
}

const titulo = ref("Crear Tipo Proyecto");

onMounted(() => {
  itemId.value = route.params.id ? route.params.id.toString() : "";
  titulo.value = itemId.value ? "Editar Tipo Proyecto" : "Crear Tipo Proyecto";
  if (itemId.value) {
    getData(itemId.value)
      .then((response: any) => {
        data.value.descripcion = response.descripcion;
        data.value.clave = response.clave;
      })
      .catch(() => {
        router.push({ name: "listar-cat_tipoProyecto" });
      });
  }
  scrollTop();
});
</script>
@/models/institutionalActivity @/utils/validations/cat_tipoProyectoValidations
