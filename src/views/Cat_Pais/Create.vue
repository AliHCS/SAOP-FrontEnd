<template>
  <h4 class="view-name">{{ titulo }}</h4>
  <hr class="red" />
  <div class="container">
    <form role="form" @submit.prevent="savePais">
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
        v-model="data.nombre_oficial"
        title="Nombre:"
        placeholder="Nombre"
        name="nombre_oficial"
        id="nombre_oficial"
        :error="errors"
      />
      <InputText
        v-model="data.capital"
        title="Capital:"
        placeholder="Capital"
        name="capital"
        id="capital"
        :error="errors"
      />
      <InputText
        v-model="data.tipo_gobierno"
        title="Tipo de Gobierno:"
        placeholder="Tipo de Gobierno"
        name="tipo_gobierno"
        id="tipo_gobierno"
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
import { cat_paisValidations } from "@/utils/validations/cat_PaisValidations";
import usePetition from "@/composables/usePetition";
import CatPais from "@/utils/models/cat_pais";

const route = useRoute();
const router = useRouter();
const itemId = ref("");
const { updateData, getData, createData } = usePetition("cat_pais/");

const data = ref<CatPais>({
  clave: "",
    nombre_oficial: "",
    capital: "",
    tipo_gobierno: "",
});

const { formState, isValid, errors, showErrors } = useForm(
  data.value,
  cat_paisValidations
);

const handleCancel = () => router.push({ name: "listar-cat_Pais" });

async function savePais() {
  if (isValid.value) {
    try {
      if (itemId.value) {
        await updateData(formState.value);
      } else {
        await createData(formState.value);
      }
      router.push({ name: "listar-cat_Pais" });
    } catch (error) {}
  } else {
    showErrors();
  }
}

const titulo = ref("Crear Pais");

onMounted(() => {
  itemId.value = route.params.id ? route.params.id.toString() : "";
  titulo.value = itemId.value ? "Editar Pais" : "Crear Pais";
  if (itemId.value) {
    getData(itemId.value)
      .then((response: any) => {
        data.value.nombre_oficial = response.nombre_oficial;
        data.value.clave = response.clave;
        data.value.capital = response.capital;
        data.value.tipo_gobierno = response.tipo_gobierno;
      })
      .catch(() => {
        router.push({ name: "listar-cat_Pais" });
      });
  }
  scrollTop();
});
</script>
@/models/institutionalActivity @/utils/validations/cat_tipoProyectoValidations
