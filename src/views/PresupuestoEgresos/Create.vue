<template>
  <h4 class="view-name">{{ titulo }}</h4>
  <hr class="red" />
  <div class="container">
    <form role="form" @submit.prevent="saveProyectoDeInversion">
      <div class="row">
        <InputText
          :disabled="itemId !== ''"
          v-model.trim="data.noSolicitud"
          title="Número de Solicitud:"
          placeholder="Número de Solicitud"
          name="no_solicitud"
          id="no_solicitud"
          class="col-sm-12"
        />
      </div>
      <div class="row">
        <SelectComponent
          :disabled="true"
          v-model="data.pais"
          title="País:"
          placeholder="País"
          name="pais"
          id="pais"
          class="col-sm-4"
          :options="arrayDataPais.data"
          :optionText="'nombre_oficial'"
        />
        <SelectComponent
          v-model="data.entidad"
          title="Entidad Federativa:"
          placeholder="Entidad Federativa"
          name="entidad_federativa"
          id="entidad_federativa"
          class="col-sm-4"
          :options="arrayDataEntidadFederativa.data"
          :optionText="'descripcion'"
        />
        <SelectComponent
          v-model="data.estatus"
          title="Estatus:"
          placeholder="Estatus"
          name="cartera_estatus"
          id="cartera_estatus"
          class="col-sm-4"
          :options="arrayDataEstatus.data"
          :optionText="'descripcion'"
        />
      </div>
      <div class="row">
        <div class="form-group col-sm-4">
          <label for="nombre-operacion">Fecha</label>
          <input
            v-model="data.fecha"
            type="date"
            class="form-control"
            id="fecha_inicial"
            name="fecha_inicial"
            placeholder=""
            autocomplete="off"
          />
          <!-- <small
            id="descripcion-nivel-small"
            class="form-text text-muted app-validation"
            v-if="errors && errors.fecha_inicial"
            >{{ errors.fecha_inicial }}</small
          > -->
        </div>
        <InputText
          v-model="data.meta"
          title="Meta:"
          placeholder="Meta"
          name="municipio"
          id="municipio"
          class="col-sm-4"
        />
        <InputText
          v-model="data.ubicacion"
          title="Ubicación:"
          placeholder="Ubicación"
          name="municipio"
          id="municipio"
          class="col-sm-4"
        />
      </div>
      <div class="row">
        <TextAraComponent
          v-model="data.descripcionPEF"
          :title="'Descripción:'"
          :placeholder="'Ingresa una descripción...'"
          :name="'descripcion'"
          :id="'descripcion'"
          class="col-sm-12"
        />
      </div>
      <div class="row">
        <TextAraComponent
          v-model="data.beneficios"
          :title="'Beneficios:'"
          :placeholder="'Ingresa los beneficios...'"
          :name="'beneficios'"
          :id="'beneficios'"
          class="col-sm-12"
        />
        <TextAraComponent
          v-model="data.impactoAmbiental"
          :title="'Impacto Ambiental:'"
          :placeholder="'Ingresa el impacto ambiental...'"
          :name="'beneficios'"
          :id="'beneficios'"
          class="col-sm-12"
        />
        <TextAraComponent
          v-model="data.transitoEsperado"
          title="Transito esperado:"
          :placeholder="'Ingresa el transito esperado...'"
          :name="'beneficios'"
          :id="'beneficios'"
          class="col-sm-12"
        />
        <!--           :error="errors" -->
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" @click="handleCancel">
          Cancelar
        </button>
        <button type="submit" class="btn btn-primary">
          <!-- :disabled="Object.keys(errors).length !== 0" -->
          Guardar
        </button>
      </div>
    </form>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { scrollTop } from "@/utils/helpers/scrollHelper";
import { useRoute, useRouter } from "vue-router";
/* import { useForm } from "@/composables/useForm"; */
import InputText from "@/components/InputText.vue";
import SelectComponent from "@/components/SelectComponent.vue";
import TextAraComponent from "@/components/TextAraComponent.vue";
import usePetition from "@/composables/usePetition";
/* import { simpleDate } from "@/utils/helpers/dateHelper"; */

const route = useRoute();
const router = useRouter();
const itemId = ref("");
/* const readOnlyView = ref(false); */
const { getData , createData, updateData } = usePetition(
  "presupuesto_egresos_federacion/"
); 

//Consultas para los selects
const { arrayData: arrayDataEstatus, getDatas: getDatasEstatus } =
  usePetition("cat_estatus/");
const { arrayData: arrayDataPais, getDatas: getDatasPais } =
  usePetition("cat_pais/");
const {
  arrayData: arrayDataEntidadFederativa,
  getDatas: getDatasEntidadFederativa,
} = usePetition("cat_entidad_federativa/");

interface MiInterfaz {
  entidad?: string | undefined;
  pais?: string | undefined;
  estatus?: string | undefined;
  meta?: string | undefined;
  noSolicitud?: number | string | undefined;
  clavePEF?: string | undefined;
  descripcionPEF?: string | undefined;
  ubicacion?: string | undefined;
  beneficios?: string | undefined;
  transitoEsperado?: string | undefined;
  impactoAmbiental?: string | undefined;
  longitud?: number | string | undefined;
  fecha?: string | undefined; // Cambiado a string para ser compatible con input type="date"
}

const data = ref<MiInterfaz>({
  entidad: "",
  noSolicitud: "",
  clavePEF: "",
  descripcionPEF: "",
  ubicacion: "",
  beneficios: "",
  transitoEsperado: "",
  impactoAmbiental: "",
  longitud: "",
  fecha: "",
  pais: "1",
});

/* const { formState, isValid, errors, showErrors } = useForm(
  data.value,
  proyectoDeInversionValidations
); */

const handleCancel = () => router.push({ name: "listar-presupuestoEgreso" });

async function saveProyectoDeInversion() {
  /* if (isValid.value) { */
  try {
    // Agregar campos del formulario
    if (itemId.value) {
      await updateData({ ...data.value, id: itemId.value });
      router.push({ name: "listar-presupuestoEgreso" });
    } else {
      await createData({...data.value});
      router.push({ name: "listar-presupuestoEgreso" });
    }
  } catch (error) {}
} /* else {
    showErrors();
  }
} */

const titulo = ref("Crear Presupuesto de Egreso de la Federación");

onMounted(() => {
  itemId.value = route.params.id ? route.params.id.toString() : "";
  titulo.value = itemId.value
    ? "Editar Presupuesto de Egreso de la Federación"
    : "Crear Presupuesto de Egreso de la Federación";
  if (itemId.value) {
    getData(itemId.value)
      .then((response: any) => {
        data.value.entidad = response.entidad;
        data.value.pais = response.pais;
        data.value.estatus = response.estatus;
        data.value.meta = response.meta;
        data.value.noSolicitud = response.noSolicitud;
        data.value.clavePEF = response.clavePEF;
        data.value.descripcionPEF = response.descripcionPEF;
        data.value.ubicacion = response.ubicacion;
        data.value.beneficios = response.beneficios;
        data.value.transitoEsperado = response.transitoEsperado;
        data.value.impactoAmbiental = response.impactoAmbiental;
        data.value.longitud = response.longitud;
        data.value.fecha = response.fecha;
      })
      .catch(() => {
        router.push({ name: "listar-proyecto_de_inversion" });
      }); 
  }
  getDatasEstatus({ page: 1, size: 100 });
  getDatasPais({ page: 1, size: 100 });
  getDatasEntidadFederativa({ page: 1, size: 100 });
  scrollTop();
});
</script>
@/models/institutionalActivity @/utils/validations/cat_tipoProyectoValidations
