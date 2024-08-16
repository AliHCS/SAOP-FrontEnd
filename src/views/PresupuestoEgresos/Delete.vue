<template>
  <h4 class="view-name">{{ viewName }}</h4>
  <hr class="red" />
  <CardConfirmComponent
    title="¿Estás Seguro?"
    subtitle="El Presupuesto de Egreso de la Federación se dará de baja permanentemente."
    text="Verifique la información antes de confirmar la operación."
    @onConfirm="handleConfirm"
    @onCancel="handleCancel"
  />
  <form class="mt-4 card p-4">
    <div class="text-center mb-4">Detalle:</div>
    <div class="row">
      <InputText
        disabled
        v-model="data.noSolicitud"
        title="Numero de Solicitud:"
        placeholder="Numero de Solicitud"
        name="clave"
        id="clave"
        class="col-sm-6"
      />
      <SelectComponent
        v-model="data.pais"
        disabled
        title="País:"
        placeholder="País"
        name="pais"
        id="pais"
        class="col-sm-6"
        :options="arrayDataPais.data"
        :optionText="'nombre_oficial'"
      />
    </div>
    <div class="row">
      <SelectComponent
        v-model="data.entidad"
        disabled
        title="Entidad Federativa:"
        placeholder="Entidad Federativa"
        name="entidad_federativa"
        id="entidad_federativa"
        class="col-sm-6"
        :options="arrayDataEntidadFederativa.data"
        :optionText="'descripcion'"
      />
      <SelectComponent
        v-model="data.estatus"
        disabled
        title="Estatus:"
        placeholder="Estatus"
        name="cartera_estatus"
        id="cartera_estatus"
        class="col-sm-6"
        :options="arrayDataEstatus.data"
        :optionText="'descripcion'"
      />
    </div>
    <div class="row">
      <div class="form-group col-sm-6">
        <label for="nombre-operacion">Fecha Inicial</label>
        <input
          v-model="data.fecha"
          type="date"
          class="form-control"
          id="precidencial-prioridad"
          placeholder=""
          autocomplete="off"
          disabled
        />
      </div>
      <InputText
        v-model="data.meta"
        disabled
        title="Meta:"
        placeholder="Meta"
        name="meta"
        id="meta"
        class="col-sm-6"
      />
      <InputText
        v-model="data.ubicacion"
        disabled
        title="Ubicación:"
        placeholder="Ubicación"
        name="ubicacion"
        id="ubicacion"
        class="col-sm-12"
      />
      <TextAraComponent
        disabled
        v-model="data.descripcionPEF"
        :title="'Descripción:'"
        :placeholder="'Ingresa una descripción...'"
        :name="'descripcion'"
        :id="'descripcion'"
        class="col-sm-12"
      />
      <TextAraComponent
        disabled
        v-model="data.beneficios"
        :title="'Beneficios:'"
        :placeholder="'Ingresa los beneficios...'"
        :name="'beneficios'"
        :id="'beneficios'"
        class="col-sm-12"
      />
    </div>
    <div class="row">
      <TextAraComponent
        disabled
        v-model="data.impactoAmbiental"
        :title="'Impacto Ambiental:'"
        :placeholder="'Ingresa el impacto ambiental...'"
        :name="'beneficios'"
        :id="'beneficios'"
        class="col-sm-12"
      />
    </div>
    <div class="row">
      <TextAraComponent
        disabled
        v-model="data.transitoEsperado"
        title="Transito esperado:"
        :placeholder="'Ingresa el transito esperado...'"
        :name="'beneficios'"
        :id="'beneficios'"
        class="col-sm-12"
      />
    </div>
  </form>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { scrollTop } from "@/utils/helpers/scrollHelper";
/* import ProyectoDeInversion from "@/utils/models/ProyectoDeInversion"; */
import { useRoute, useRouter } from "vue-router";
import CardConfirmComponent from "@/components/CardConfirmComponent.vue";
import usePetition from "@/composables/usePetition";
/* import { simpleDate } from "@/utils/helpers/dateHelper"; */
import InputText from "@/components/InputText.vue";
import SelectComponent from "@/components/SelectComponent.vue";
import TextAraComponent from "@/components/TextAraComponent.vue";

const itemId = ref<any>({ value: 0 });
const route = useRoute();
const router = useRouter();
/* const data = ref<ProyectoDeInversion>({
  clave: "",
  no_solicitud: "",
  nombre: "",
  descripcion: "",
  municipio: "",
  beneficios: "",
  fecha_inicial: "",
  fecha_final: "",
  ejercicio_presupuestal: "",
  comentarios: "",
  clave_compromiso: "",
  factibilidad_obra: "",
  prioridad: "",
  tipo_proyecto: "",
  estatus_proyecto: "",
  cartera_estatus: "",
  pais: "",
  entidad_federativa: "",
  fase: "",
  tipo_obra: "",
  tipo_documento: "",
  unidad_responsable: "",
  area: "",
  documento: null,
}); */
const viewName = "Eliminar Presupuesto de Egreso de la Federación";
/* const { deleteData, getData } = usePetition("cartera_proyectos_inversion/"); */
const handleCancel = () => router.push({ name: "listar-presupuestoEgreso" });
const handleConfirm = () => {
  router.push({ name: "listar-presupuestoEgreso" });
};
/* deleteData(itemId.value).then((response) => {
    if (response) {
      router.push({ name: "listar-proyecto_de_inversion" });
    }
  }); */

//Consultas para los selects
const { arrayData: arrayDataPais, getDatas: getDatasPais } =
  usePetition("cat_pais/");
const {
  arrayData: arrayDataEntidadFederativa,
  getDatas: getDatasEntidadFederativa,
} = usePetition("cat_entidad_federativa/");
const { arrayData: arrayDataEstatus, getDatas: getDatasEstatus } =
  usePetition("cat_estatus/");
/* const { arrayData: arrayDataPrioridad, getDatas: getDatasPrioridad } =
  usePetition("cat_prioridad/");
const { arrayData: arrayDataFactibilidad, getDatas: getDatasFactibilidad } =
  usePetition("cat_factibilidad/");
const { arrayData: arrayDataArea, getDatas: getDatasArea } =
  usePetition("cat_nivel_area/");
const { arrayData: arrayDataProyecto, getDatas: getDatasProyecto } =
  usePetition("cat_tipo_proyecto/");
const {
  arrayData: arrayDataUnidadResponsable,
  getDatas: getDatasUnidadResponsable,
} = usePetition("cat_unidad_responsable/");
const { arrayData: arrayDataFase, getDatas: getDatasFase } =
  usePetition("cat_fase/");
const { arrayData: arrayDataTipoObra, getDatas: getDatasTipoObra } =
  usePetition("cat_tipo_obra/");
const { arrayData: arrayDataTipoDocumento, getDatas: getDatasTipoDocumento } =
  usePetition("cat_tipo_documento/"); */

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
});

onMounted(() => {
  itemId.value = route.params.id;
  if (itemId.value) {
    data.value.beneficios = "Beneficios de ejemplo";
    data.value.noSolicitud = "123";
    data.value.pais = "1";
    data.value.entidad = "2";
    data.value.estatus = "13";
    data.value.meta = "Meta de ejemplo";
    data.value.fecha = "2024-01-24";
    data.value.ubicacion = "Ubicación de ejemplo";
    data.value.descripcionPEF = "Descripción PEF de ejemplo";
    data.value.impactoAmbiental = "Impacto Ambiental de ejemplo";
    data.value.transitoEsperado = "Tránsito Esperado de ejemplo";
    data.value.longitud = "Longitud de ejemplo";
    /* getData(itemId.value)
      .then((response) => {
        data.value.clave = response.clave;
        data.value.no_solicitud = response.no_solicitud;
        data.value.prioridad = response.prioridad;
        data.value.factibilidad_obra = response.factibilidad_obra;
        data.value.area = response.area;
        data.value.tipo_proyecto = response.tipo_proyecto;
        data.value.estatus_proyecto = response.estatus_proyecto;
        data.value.cartera_estatus = response.cartera_estatus;
        data.value.nombre = response.nombre;
        data.value.descripcion = response.descripcion;
        data.value.pais = response.pais;
        data.value.entidad_federativa = response.entidad_federativa;
        data.value.unidad_responsable = response.unidad_responsable;
        data.value.municipio = response.municipio;
        data.value.beneficios = response.beneficios;
        data.value.fecha_final = simpleDate(response.fecha_final);
        data.value.fecha_inicial = simpleDate(response.fecha_inicial);
        data.value.ejercicio_presupuestal = response.ejercicio_presupuestal;
        data.value.comentarios = response.comentarios;
        data.value.clave_compromiso = response.clave_compromiso;
        data.value.fase = response.fase;
        data.value.documento = response.documento;
        data.value.tipo_obra = response.tipo_obra;
        data.value.tipo_documento = response.tipo_documento;
      })
      .catch(() => {
        router.push({ name: "listar-proyecto_de_inversion" });
      }); */
  } /* else {
    return router.push({ name: "not-found" });
} */
  getDatasPais({ page: 1, size: 100 });
  getDatasEntidadFederativa({ page: 1, size: 100 });
  getDatasEstatus({ page: 1, size: 100 });
  /* getDatasPrioridad({ page: 1, size: 100 });
  getDatasFactibilidad({ page: 1, size: 100 });
  getDatasArea({ page: 1, size: 100 });
  getDatasProyecto({ page: 1, size: 100 });
  getDatasUnidadResponsable({ page: 1, size: 100 });
  getDatasFase({ page: 1, size: 100 });
  getDatasTipoObra({ page: 1, size: 100 });
  getDatasTipoDocumento({ page: 1, size: 100 }); */
  scrollTop();
});
</script>
<style lang="scss" scoped></style>
