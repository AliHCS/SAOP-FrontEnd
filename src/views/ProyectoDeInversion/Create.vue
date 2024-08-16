<template>
  <h4 class="view-name">{{ titulo }}</h4>
  <hr class="red" />
  <div class="container">
    <form role="form" @submit.prevent="saveProyectoDeInversion">
      <div class="row">
        <InputText
          :disabled="itemId !== '' || readOnlyView === true"
          v-model.trim="data.no_solicitud"
          title="Número de Solicitud:"
          placeholder="Número de Solicitud"
          name="no_solicitud"
          id="no_solicitud"
          :error="errors"
          class="col-sm-6"
        />
        <SelectComponent
        :disabled="readOnlyView === true"
          v-model="data.prioridad"
          title="Prioridad:"
          placeholder="Prioridad"
          name="prioridad"
          id="prioridad"
          :error="errors"
          class="col-sm-6"
          :options="arrayDataPrioridad.data"
          :optionText="'descripcion'"
        />
      </div>
      <div class="row">
        <InputText
        :disabled="readOnlyView === true"
          v-model="data.clave"
          title="Clv Cartera:"
          placeholder="Clv Cartera"
          name="clave"
          id="clave"
          :error="errors"
          class="col-sm-6"
        />
        <SelectComponent
        :disabled="readOnlyView === true"
          v-model="data.factibilidad_obra"
          title="Factibilidad de la obra :"
          placeholder="Factibilidad de la obra"
          name="factibilidad_obra"
          id="factibilidad_obra"
          :error="errors"
          class="col-sm-6"
          :options="arrayDataFactibilidad.data"
          :optionText="'descripcion'"
        />
      </div>
      <div class="row">
        <SelectComponent
        :disabled="readOnlyView === true"
          v-model="data.area"
          title="Área:"
          placeholder="Área"
          name="area"
          id="area"
          :error="errors"
          class="col-sm-12"
          :options="arrayDataArea.data"
          :optionText="'nombre'"
        />
        <SelectComponent
        :disabled="readOnlyView === true"
          v-model="data.tipo_proyecto"
          title="Tipo de Proyecto:"
          placeholder="Tipo de Proyecto"
          name="tipo_proyecto"
          id="tipo_proyecto"
          :error="errors"
          class="col-sm-12"
          :options="arrayDataProyecto.data"
          :optionText="'descripcion'"
        />
        <SelectComponent
          :disabled="itemId !== ''|| readOnlyView === true"
          v-model="data.estatus_proyecto"
          title="Estatus de Proyecto:"
          placeholder="Estatus de Proyecto"
          name="estatus_proyecto"
          id="estatus_proyecto"
          :error="errors"
          class="col-sm-12"
          :options="arrayDataEstatus.data"
          :optionText="'descripcion'"
        />
        <SelectComponent
        :disabled="readOnlyView === true"
          v-model="data.cartera_estatus"
          title="Estatus:"
          placeholder="Estatus"
          name="cartera_estatus"
          id="cartera_estatus"
          :error="errors"
          class="col-sm-12"
          :options="arrayDataEstatus.data"
          :optionText="'descripcion'"
        />
        <InputText
        :disabled="readOnlyView === true"
          v-model="data.nombre"
          title="Nombre del Proyecto:"
          placeholder="Nombre del Proyecto"
          name="nombre"
          id="nombre"
          :error="errors"
          class="col-sm-12"
        />
      </div>
      <div class="row">
        <TextAraComponent
        :disabled="readOnlyView === true"
          v-model="data.descripcion"
          :title="'Descripción:'"
          :placeholder="'Ingresa una descripción...'"
          :name="'descripcion'"
          :error="errors"
          :id="'descripcion'"
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
          :error="errors"
          class="col-sm-6"
          :options="arrayDataPais.data"
          :optionText="'nombre_oficial'"
        />
        <SelectComponent
        :disabled="readOnlyView === true"
          v-model="data.entidad_federativa"
          title="Entidad Federativa:"
          placeholder="Entidad Federativa"
          name="entidad_federativa"
          id="entidad_federativa"
          :error="errors"
          class="col-sm-6"
          :options="arrayDataEntidadFederativa.data"
          :optionText="'descripcion'"
        />
      </div>
      <div class="row">
        <SelectComponent
        :disabled="readOnlyView === true || itemId !== ''"
          v-model="data.unidad_responsable"
          title="Unidad Responsable:"
          placeholder="Unidad Responsable"
          name="unidad_responsable"
          id="unidad_responsable"
          :error="errors"
          class="col-sm-12"
          :options="arrayDataUnidadResponsable.data"
          :optionText="'descripcion'"
        />
        <InputText
        :disabled="readOnlyView === true"
          v-model="data.municipio"
          title="Localización/Municipio:"
          placeholder="Localización/Municipio"
          name="municipio"
          id="municipio"
          :error="errors"
          class="col-sm-12"
        />
        <TextAraComponent
        :disabled="readOnlyView === true"
          v-model="data.beneficios"
          :title="'Beneficios:'"
          :placeholder="'Ingresa los beneficios...'"
          :name="'beneficios'"
          :error="errors"
          :id="'beneficios'"
          class="col-sm-12"
        />
      </div>
      <div class="row">
        <div class="form-group col-sm-6">
          <label for="nombre-operacion">Fecha Inicial</label>
          <input
          :disabled="readOnlyView === true"
            v-model="data.fecha_inicial"
            type="date"
            class="form-control"
            id="fecha_inicial"
            name="fecha_inicial"
            placeholder=""
            autocomplete="off"
          />
          <small
            id="descripcion-nivel-small"
            class="form-text text-muted app-validation"
            v-if="errors && errors.fecha_inicial"
            >{{ errors.fecha_inicial }}</small
          >
        </div>
        <div class="form-group col-sm-6">
          <label for="nombre-operacion">Fecha Final</label>
          <input
          :disabled="readOnlyView === true"
            v-model="data.fecha_final"
            type="date"
            class="form-control"
            id="fecha_final"
            placeholder=""
            autocomplete="off"
          />
          <small
            id="descripcion-nivel-small"
            class="form-text text-muted app-validation"
            v-if="errors && errors.fecha_final"
            >{{ errors.fecha_final }}</small
          >
        </div>
        <InputText
        :disabled="readOnlyView === true"
          v-model="data.ejercicio_presupuestal"
          title="Ejercicio Presupuestal:"
          placeholder="Ejercicio Presupuestal"
          name="ejercicio_presupuestal"
          id="ejercicio_presupuestal"
          :error="errors"
          class="col-sm-6"
        />
        <SelectComponent
        :disabled="readOnlyView === true"
          v-model="data.fase"
          title="Fase:"
          placeholder="Fase"
          name="fase"
          id="fase"
          :error="errors"
          class="col-sm-6"
          :options="arrayDataFase.data"
          :optionText="'descripcion'"
        />
        <TextAraComponent
        :disabled="readOnlyView === true"
          v-model="data.comentarios"
          :title="'Comentarios:'"
          :placeholder="'Ingresa los beneficios...'"
          :name="'comentarios'"
          :error="errors"
          :id="'comentarios'"
          class="col-sm-12"
        />
        <InputText
        :disabled="readOnlyView === true"
          v-model="data.clave_compromiso"
          title="Clave Compromiso:"
          placeholder="Clave Compromiso"
          name="clave_compromiso"
          id="clave_compromiso"
          :error="errors"
          class="col-sm-12"
        />
        <SelectComponent
        :disabled="readOnlyView === true"
          v-model="data.tipo_obra"
          title="Tipo de Obra:"
          placeholder="Tipo de Obra"
          name="tipo_obra"
          id="tipo_obra"
          :error="errors"
          class="col-sm-12"
          :options="arrayDataTipoObra.data"
          :optionText="'descripcion'"
        />
      </div>
      <div class="row">
        <div class="form-group col-sm-6">
          <label for="nombre-operacion">Anexar Documentos</label>
        </div>
      </div>
      <div class="row">
        <SelectComponent
        :disabled="readOnlyView === true"
          v-model="data.tipo_documento"
          title="Tipo Documento:"
          placeholder="Tipo Documento"
          name="tipo_documento"
          id="tipo_documento"
          :error="errors"
          class="col-sm-6"
          :options="arrayDataTipoDocumento.data"
          :optionText="'nombre'"
          />
        <div class="form-group col-sm-6">
          <label for="nombre-operacion">Documento</label>
          <input
          :disabled="readOnlyView === true"
            data.documento
            type="file"
            class="form-control"
            id="precidencial-prioridad"
            placeholder=""
            autocomplete="off"
            ref="fileInput"
            accept="application/pdf, image/*"
            @change="handleFileUpload"
          />
          <small class="form-text text-muted" v-if="fileName">{{
            fileName[fileName.length - 1]
          }}</small>
          <small
            id="descripcion-nivel-small"
            class="form-text text-muted app-validation"
            v-if="errors && errors.fecha_prioridad"
            >{{ errors.fecha_prioridad }}</small
          >
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" @click="handleCancel">
          Cancelar
        </button>
        <button type="submit" class="btn btn-primary" :disabled=" Object.keys(errors).length !== 0 || readOnlyView === true ">Guardar</button>
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
import SelectComponent from "@/components/SelectComponent.vue";
import TextAraComponent from "@/components/TextAraComponent.vue";
import { proyectoDeInversionValidations } from "@/utils/validations/proyectoDeInversionValidations";
import usePetition from "@/composables/usePetition";
import ProyectoDeInversion from "@/utils/models/ProyectoDeInversion";
import { simpleDate } from "@/utils/helpers/dateHelper";

const route = useRoute();
const router = useRouter();
const itemId = ref("");
const readOnlyView = ref(false)
const { getData, createFromData, updateFromData } = usePetition(
  "cartera_proyectos_inversion/"
);

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
  pais: 1,
  entidad_federativa: "",
  fase: "",
  tipo_obra: "",
  tipo_documento: "",
  unidad_responsable: "",
  area: "",
  documento: null,
});

const { formState, isValid, errors, showErrors } = useForm(
  data.value,
  proyectoDeInversionValidations
);

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length) {
    data.value.documento = target.files[0];
  }
};
const handleCancel = () =>
  router.push({ name: "listar-proyecto_de_inversion" });

async function saveProyectoDeInversion() {
  if (isValid.value) {
    try {
      const formData = new FormData();
      // Agregar campos del formulario
      formData.append("clave", formState.value.clave);
      formData.append("no_solicitud", formState.value.no_solicitud.toString());
      formData.append("nombre", formState.value.nombre);
      formData.append("descripcion", formState.value.descripcion);
      formData.append("municipio", formState.value.municipio);
      formData.append("beneficios", formState.value.beneficios);
      formData.append("fecha_inicial", formState.value.fecha_inicial);
      formData.append("fecha_final", formState.value.fecha_final);
      formData.append(
        "ejercicio_presupuestal",
        formState.value.ejercicio_presupuestal.toString()
      );
      formData.append("comentarios", formState.value.comentarios);
      formData.append("clave_compromiso", formState.value.clave_compromiso);
      formData.append("factibilidad_obra", formState.value.factibilidad_obra);
      formData.append("prioridad", formState.value.prioridad);
      formData.append("tipo_proyecto", formState.value.tipo_proyecto);
      formData.append("estatus_proyecto", formState.value.estatus_proyecto);
      formData.append("cartera_estatus", formState.value.cartera_estatus);
      formData.append("pais", formState.value.pais);
      formData.append("entidad_federativa", formState.value.entidad_federativa);
      formData.append("fase", formState.value.fase);
      formData.append("tipo_obra", formState.value.tipo_obra);
      formData.append("tipo_documento", formState.value.tipo_documento);
      formData.append("unidad_responsable", formState.value.unidad_responsable);
      formData.append("area", formState.value.area);

      if (data.value.documento instanceof File) {
        formData.append("documento", formState.value.documento);
      }

      if (itemId.value) {
        if (fileName) {
          delete data.value.documento;
        }
        await updateFromData(formData, itemId.value);
        router.push({ name: "listar-proyecto_de_inversion" });
      } else {
        await createFromData(formData);
        router.push({ name: "listar-proyecto_de_inversion" });
      }
    } catch (error) {}
  } else {
    showErrors();
  }
}

const titulo = ref("Crear Proyecto de Inversión");
const fileName = ref("");

onMounted(() => {
  const currentYear = new Date().getFullYear();
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
        fileName.value = response.documento.split("/");
        data.value.tipo_obra = response.tipo_obra;
        data.value.tipo_documento = response.tipo_documento;
      })
      .catch(() => {
        router.push({ name: "listar-proyecto_de_inversion" });
      });
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
@/models/institutionalActivity @/utils/validations/cat_tipoProyectoValidations
