<template>
  <h4 class="view-name">{{ viewName }}</h4>
  <hr class="red" />
  <CardConfirmComponent
    title="¿Estás Seguro?"
    subtitle="El proyecto de inversión se dará de baja permanentemente."
    text="Verifique la información antes de confirmar la operación."
    @onConfirm="handleConfirm"
    @onCancel="handleCancel"
  />
  <form class="mt-4 card p-4">
    <div class="text-center mb-4">Detalle:</div>
    <div class="row">
      <InputText
        disabled
        v-model="data.no_solicitud"
        title="Numero de Solicitud:"
        placeholder="Numero de Solicitud"
        name="clave"
        id="clave"
        class="col-sm-6"
      />
      <SelectComponent
        v-model="data.prioridad"
        disabled
        title="Prioridad:"
        placeholder="Prioridad"
        name="prioridad"
        id="prioridad"
        class="col-sm-6"
        :options="arrayDataPrioridad.data"
        :optionText="'descripcion'"
      />
    </div>
    <div class="row">
      <InputText
        v-model="data.clave"
        disabled
        title="Clv Cartera:"
        placeholder="Clv Cartera"
        name="clave"
        id="clave"
        class="col-sm-6"
      />
      <SelectComponent
        v-model="data.factibilidad_obra"
        disabled
        title="Factibilidad de la obra :"
        placeholder="Factibilidad de la obra"
        name="Factibilidad_de_la_obra"
        id="Factibilidad_de_la_obra"
        class="col-sm-6"
        :options="arrayDataFactibilidad.data"
        :optionText="'descripcion'"
      />
    </div>
    <div class="row">
      <SelectComponent
        v-model="data.area"
        disabled
        title="Area:"
        placeholder="Area"
        name="area"
        id="area"
        class="col-sm-12"
        :options="arrayDataArea.data"
        :optionText="'nombre'"
      />
      <SelectComponent
        v-model="data.tipo_proyecto"
        disabled
        title="Tipo de Proyecto:"
        placeholder="Tipo de Proyecto"
        name="tipo_de_proyecto"
        id="tipo_de_proyecto"
        class="col-sm-12"
        :options="arrayDataProyecto.data"
        :optionText="'descripcion'"
      />
      <SelectComponent
        v-model="data.estatus_proyecto"
        disabled
        title="Estatus de Proyecto:"
        placeholder="Estatus de Proyecto"
        name="estatus_de_proyecto"
        id="estatus_de_proyecto"
        class="col-sm-12"
        :options="arrayDataEstatus.data"
        :optionText="'descripcion'"
      />
      <SelectComponent
        v-model="data.cartera_estatus"
        disabled
        title="Estatus:"
        placeholder="Estatus"
        name="estatus"
        id="estatus"
        class="col-sm-12"
        :options="arrayDataEstatus.data"
        :optionText="'descripcion'"
      />
      <InputText
        v-model="data.nombre"
        title="Nombre del Proyecto:"
        disabled
        placeholder="Nombre del Proyecto"
        name="nombre_del_proyecto"
        id="nombre_del_proyecto"
        class="col-sm-12"
      />
    </div>
    <div class="row">
      <TextAraComponent
        v-model="data.descripcion"
        disabled
        :title="'Descripcion:'"
        :placeholder="'Ingresa una descripcion...'"
        :name="'descripcion'"
        :id="'descripcion'"
        class="col-sm-12"
      />
    </div>
    <div class="row">
      <SelectComponent
        v-model="data.pais"
        disabled
        title="Pais:"
        placeholder="Pais"
        name="pais"
        id="pais"
        class="col-sm-6"
        :options="arrayDataPais.data"
        :optionText="'nombre_oficial'"
      />
      <SelectComponent
        v-model="data.entidad_federativa"
        disabled
        title="Entidad Federativa:"
        placeholder="Entidad Federativa"
        name="entidad_federativa"
        id="entidad_federativa"
        class="col-sm-6"
        :options="arrayDataEntidadFederativa.data"
        :optionText="'descripcion'"
      />
    </div>
    <div class="row">
      <SelectComponent
        v-model="data.unidad_responsable"
        disabled
        title="Unidad Responsable:"
        placeholder="Unidad Responsable"
        name="unidad_responsable"
        id="unidad_responsable"
        class="col-sm-12"
        :options="arrayDataUnidadResponsable.data"
        :optionText="'descripcion'"
      />
      <InputText
        v-model="data.municipio"
        disabled
        title="Localizacion/Municipio:"
        placeholder="Localizacion/Municipio"
        name="localizacion_municipio"
        id="localizacion_municipio"
        class="col-sm-12"
      />
      <TextAraComponent
        v-model="data.beneficios"
        disabled
        :title="'Beneficios:'"
        :placeholder="'Ingresa los beneficios...'"
        :name="'beneficios'"
        :id="'beneficios'"
        class="col-sm-12"
      />
    </div>
    <div class="row">
      <div class="form-group col-sm-6">
        <label for="nombre-operacion">Fecha Inicial</label>
        <input
          v-model="data.fecha_inicial"
          type="date"
          class="form-control"
          id="precidencial-prioridad"
          placeholder=""
          autocomplete="off"
          disabled
        />
      </div>
      <div class="form-group col-sm-6">
        <label for="nombre-operacion">Fecha Final</label>
        <input
          v-model="data.fecha_final"
          type="date"
          class="form-control"
          id="precidencial-prioridad"
          placeholder=""
          autocomplete="off"
          disabled
        />
      </div>
      <InputText
        v-model="data.ejercicio_presupuestal"
        disabled
        title="Ejercicio Presupuestal:"
        placeholder="Ejercicio Presupuestal"
        name="ejercicio_presupuestal"
        id="ejercicio_presupuestal"
        class="col-sm-6"
      />
      <SelectComponent
        v-model="data.fase"
        title="Fase:"
        disabled
        placeholder="Fase"
        name="fase"
        id="fase"
        class="col-sm-6"
        :options="arrayDataFase.data"
        :optionText="'descripcion'"
      />
      <TextAraComponent
        v-model="data.comentarios"
        disabled
        :title="'Comentarios:'"
        :placeholder="'Ingresa los beneficios...'"
        :name="'comentarios'"
        :id="'comentarios'"
        class="col-sm-12"
      />
      <InputText
        v-model="data.clave_compromiso"
        disabled
        title="Clave Compromiso:"
        placeholder="Fase"
        name="fase"
        id="fase"
        class="col-sm-12"
      />
      <SelectComponent
        v-model="data.tipo_obra"
        disabled
        title="Tipo de Obra:"
        placeholder="Fase"
        name="fase"
        id="fase"
        class="col-sm-12"
        :options="arrayDataTipoObra.data"
        :optionText="'descripcion'"
      />
    </div>
    <div class="row">
      <SelectComponent
        v-model="data.tipo_documento"
        disabled
        title="Tipo Documento:"
        placeholder="Fase"
        name="fase"
        id="fase"
        class="col-sm-6"
        :options="arrayDataTipoDocumento.data"
        :optionText="'nombre'"
      />
    </div>
  </form>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { scrollTop } from "@/utils/helpers/scrollHelper";
import ProyectoDeInversion from "@/utils/models/ProyectoDeInversion";
import { useRoute, useRouter } from "vue-router";
import CardConfirmComponent from "@/components/CardConfirmComponent.vue";
import usePetition from "@/composables/usePetition";
import { simpleDate } from "@/utils/helpers/dateHelper";
import InputText from "@/components/InputText.vue";
import SelectComponent from "@/components/SelectComponent.vue";
import TextAraComponent from "@/components/TextAraComponent.vue";

const itemId = ref<any>({ value: 0 });
const route = useRoute();
const router = useRouter();
const data = ref<ProyectoDeInversion>({
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
});
const viewName = "Eliminar Proyecto de Inversión";
const { deleteData, getData } = usePetition("cartera_proyectos_inversion/");
const handleCancel = () =>
  router.push({ name: "listar-proyecto_de_inversion" });
const handleConfirm = () =>
  deleteData(itemId.value).then((response) => {
    if (response) {
      router.push({ name: "listar-proyecto_de_inversion" });
    }
  });

//Consultas para los selects
const { arrayData: arrayDataPrioridad, getDatas: getDatasPrioridad } =
  usePetition("cat_prioridad/");
const { arrayData: arrayDataFactibilidad, getDatas: getDatasFactibilidad } =
  usePetition("cat_factibilidad/");
const { arrayData: arrayDataArea, getDatas: getDatasArea } =
  usePetition("cat_nivel_area/");
const { arrayData: arrayDataProyecto, getDatas: getDatasProyecto } =
  usePetition("cat_tipo_proyecto/");
const { arrayData: arrayDataEstatus, getDatas: getDatasEstatus } =
  usePetition("cat_estatus/");
const { arrayData: arrayDataPais, getDatas: getDatasPais } =
  usePetition("cat_pais/");
const {
  arrayData: arrayDataEntidadFederativa,
  getDatas: getDatasEntidadFederativa,
} = usePetition("cat_entidad_federativa/");
const {
  arrayData: arrayDataUnidadResponsable,
  getDatas: getDatasUnidadResponsable,
} = usePetition("cat_unidad_responsable/");
const { arrayData: arrayDataFase, getDatas: getDatasFase } =
  usePetition("cat_fase/");
const { arrayData: arrayDataTipoObra, getDatas: getDatasTipoObra } =
  usePetition("cat_tipo_obra/");
const { arrayData: arrayDataTipoDocumento, getDatas: getDatasTipoDocumento } =
  usePetition("cat_tipo_documento/");

onMounted(() => {
  itemId.value = route.params.id;
  if (itemId.value) {
    getData(itemId.value)
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
      });
  } else {
    return router.push({ name: "not-found" });
  }
  getDatasPrioridad({ page: 1, size: 100 });
  getDatasFactibilidad({ page: 1, size: 100 });
  getDatasArea({ page: 1, size: 100 });
  getDatasProyecto({ page: 1, size: 100 });
  getDatasEstatus({ page: 1, size: 100 });
  getDatasPais({ page: 1, size: 100 });
  getDatasEntidadFederativa({ page: 1, size: 100 });
  getDatasUnidadResponsable({ page: 1, size: 100 });
  getDatasFase({ page: 1, size: 100 });
  getDatasTipoObra({ page: 1, size: 100 });
  getDatasTipoDocumento({ page: 1, size: 100 });
  scrollTop();
});
</script>
<style lang="scss" scoped></style>
