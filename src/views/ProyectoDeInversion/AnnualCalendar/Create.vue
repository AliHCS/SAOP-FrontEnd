<template>
  <h4 class="view-name">{{ titulo }}</h4>
  <hr class="red" />
  <div class="container">
    <form role="form" @submit.prevent="saveForm">
      <div class="row justify-content-center">
        <div class="col-md-4 col-sm-12">
          <InputText
            title="No. Solicitud:"
            placeholder="No. Solicitud"
            name="clave"
            id="clave"
          />
        </div>
        <div class="col-md-4 col-sm-12">
          <InputText
            title="Clave del Proyecto:"
            placeholder="Clave"
            name="descripcion"
            id="descripcion"
          />
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-md-6 col-sm-12">
          <SelectComponent
            title="Año Base:"
            placeholder="Seleccione..."
            name="anio_base"
            id="anio_base"
            class="mb-5"
            :options="YEARS"
            :optionText="'value'"
          />
          <SelectComponent
            title="Origen Recursos:"
            placeholder="Seleccione..."
            name="anio_base"
            id="anio_base"
            class="mb-5"
            :options="YEARS"
            :optionText="'value'"
          />
          <InputText
            :title="titleRadius"
            placeholder="1.000"
            name="descripcion"
            id="descripcion"
            type="number"
          />
        </div>
      </div>
      <div class="modal-footer mt-3">
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
import { useRoute, useRouter } from "vue-router";
import InputText from "@/components/InputText.vue";
import SelectComponent from "@/components/SelectComponent.vue";
import { YEARS } from "@/utils/constants/exampleYears";
/* import usePetition from "@/composables/usePetition"; */

const route = useRoute();
const router = useRouter();
const itemId = ref("");

const titleRadius = ref(""); // Define as a ref directly

switch (route.query.selectedRadius) {
  case "1":
    titleRadius.value = "RECURSOS";
    break;
  case "2":
    titleRadius.value = "METAS";
    break;
  case "3":
    titleRadius.value = "COSTOS ANUALES";
    break;
  case "4":
    titleRadius.value = "BENEFICIOS ANUALES";
    break;
  default:
    titleRadius.value = "ERROR";
}
/* const readOnlyView = ref(false) */

/* const data = ref<ProyectoDeInversion>({
  clave: "",
}); */

/* const { formState, isValid, errors, showErrors } = useForm(
  data.value,
  proyectoDeInversionValidations
); */

const handleCancel = () =>
  router.push({ name: "calendario-anual-proyecto_de_inversion" });

async function saveForm() {
  /*   if (isValid.value) { */
  try {
    if (itemId.value) {
      /*  await updateFromData(formData, itemId.value);
       router.push({ name: "listar-proyecto_de_inversion" }); */
    } else {
      /*  await createFromData(formData);
       router.push({ name: "listar-proyecto_de_inversion" }); */
    }
  } catch (error) {}
}

const titulo = ref("Crear Calendario Anual");

onMounted(() => {
  itemId.value = route.params.id ? route.params.id.toString() : "";
  if (itemId.value) {
    titulo.value = "Editar Calendario Anual";
  }
  /*  const currentYear = new Date().getFullYear();
   data.value.ejercicio_presupuestal = currentYear.toString();
   readOnlyView.value = route.name === 'ver-proyecto_de_inversion' ? true : false
   itemId.value = route.params.id ? route.params.id.toString() : "";
   titulo.value = itemId.value
     ? "Editar Proyecto de Inversión"
     : "Crear Proyecto de Inversión";
   if (itemId.value) {
     getData(itemId.value)
       .then((response: any) => {
         data.value.clave = response.clave;
       })
       .catch(() => {
         router.push({ name: "listar-proyecto_de_inversion" });
       });
   }
   getDatasPrioridad({ page: 1, size: 100 });

   scrollTop(); */
});
</script>
@/models/institutionalActivity @/utils/validations/cat_tipoProyectoValidations
