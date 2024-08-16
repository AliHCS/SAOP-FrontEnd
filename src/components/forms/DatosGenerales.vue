<template>
  <div>
    <div class="row py-3">
      <div
        class="col-md-2 d-flex align-content-center flex-wrap justify-content-end text-right"
      >
        Trabajo
      </div>
      <div class="col-md-2">
        <input
          v-model="data.trabajo"
          type="text"
          class="form-control"
          @keyup.enter="searchTrabajo()"
        />
      </div>
      <div class="col-md-3">
        <input
          v-model="trabajo.descripcion"
          type="text"
          class="form-control"
          disabled
        />
      </div>
      <div class="col-md-1 d-flex align-content-center flex-wrap">
        <i
          class="bi bi-info-circle-fill primary-red--text clickable"
          @click="openModalTrabajos = true"
        ></i>
      </div>
      <div
        class="col-md-4 d-flex align-content-center align-items-center  justify-content-end text-right"
      >
        <div style="white-space: nowrap;" class="pr-4">Clave Folio </div>
        <input v-model="claveFolio" type="text" class="form-control" disabled />
      </div>
    </div>

    <div class="row py-3">
      <div
        class="col-md-2 d-flex align-content-center flex-wrap justify-content-end text-right"
      >
        Área
      </div>
      <div class="col-md-10">
        <select v-model="data.area" class="form-select form-control" disabled>
          <option
            v-for="area in arrayDataArea.data"
            :key="area.id"
            :value="area.id"
          >
            {{ area.nombre }}
          </option>
        </select>
      </div>
    </div>

    <div class="row py-3">
      <div
        class="col-md-2 d-flex align-content-center flex-wrap justify-content-end text-right"
      >
        Tipo contratación
      </div>
      <div class="col-md-4 pr-5">
        <select
          v-model="data.tipo_contratacion"
          class="form-select form-control"
        >
          <option
            v-for="contratacion in arrayDataTipoCont.data"
            :key="contratacion.id"
            :value="contratacion.id"
          >
            {{ contratacion.descripcion_contratacion }}
          </option>
        </select>
      </div>
      <div
        class="col-md-2 d-flex align-content-center flex-wrap justify-content-end text-right"
      >
        Tipo procedimiento
      </div>
      <div class="col-md-4">
        <select
          v-model="data.tipo_procedimiento"
          class="form-select form-control"
        >
          <option
            v-for="procedimiento in arrayDataTipoProced.data"
            :key="procedimiento.id"
            :value="procedimiento.id"
          >
            {{ procedimiento.descripcion_tipo_procedimiento }}
          </option>
        </select>
      </div>
    </div>

    <div class="row py-3">
      <div
        class="col-md-2 d-flex align-content-center flex-wrap justify-content-end text-right"
      >
        Estatus
      </div>
      <div class="col-md-4">
        <select
          v-model="data.estatus_procedimiento"
          class="form-select form-control"
          disabled
        >
          <option
            v-for="estatus in arrayDataEstatus.data"
            :key="estatus.id"
            :value="estatus.id"
          >
            {{ estatus.descripcion }}
          </option>
        </select>
      </div>
      <div
        class="col-md-2 d-flex align-content-center flex-wrap justify-content-end text-right"
      >
        Carácter procedimiento
      </div>
      <div class="col-md-4">
        <select
          v-model="data.caracter_procedimiento"
          class="form-select form-control"
        >
          <option
            v-for="caracter in arrayDataCaracter.data"
            :key="caracter.id"
            :value="caracter.id"
          >
            {{ caracter.caracter_procedimiento }}
          </option>
        </select>
      </div>
    </div>

    <div class="row py-3">
      <div
        class="col-md-2 d-flex align-content-center flex-wrap justify-content-end text-right"
      >
        Subestatus
      </div>
      <div class="col-md-4">
        <select
          v-model="data.subestatus"
          class="form-select form-control"
          disabled
        >
          <option
            v-for="subestatus in arrayDataSubestatus.data"
            :key="subestatus.id"
            :value="subestatus.id"
          >
            {{ subestatus.descripcion_subestatus }}
          </option>
        </select>
      </div>
      <div
        class="col-md-2 d-flex align-content-center flex-wrap justify-content-end text-right"
      >
        Forma procedimiento
      </div>
      <div class="col-md-4">
        <select
          v-model="data.forma_procedimiento"
          class="form-select form-control"
        >
          <option
            v-for="forma in FORMAS_PROCEDIMIENTO"
            :key="forma"
            :value="forma"
          >
            {{ forma }}
          </option>
        </select>
      </div>
    </div>

    <div class="row py-3">
      <div
        class="col-md-2 d-flex align-content-center flex-wrap justify-content-end text-right"
      >
        No. Compranet
      </div>
      <div class="col-md-4">
        <input
          v-model="data.numero_compranet"
          type="text"
          class="form-control"
        />
      </div>
      <div
        class="col-md-2 d-flex align-content-center flex-wrap justify-content-end text-right"
      >
        Plazo procedimiento
      </div>
      <div class="col-md-4">
        <input
          v-model="data.plazo_procedimiento"
          type="text"
          class="form-control"
        />
      </div>
    </div>

    <div class="row py-3">
      <div
        class="col-md-2 d-flex align-content-center flex-wrap justify-content-end text-right"
      >
        Ciclo presupuestal
      </div>
      <div class="col-md-4">
        <input
          v-model="data.ciclo_presupuestal"
          type="text"
          class="form-control"
          disabled
        />
      </div>
      <div
        class="col-md-2 d-flex align-content-center flex-wrap justify-content-end text-right"
      >
        Consecutivo E7
      </div>
      <div class="col-md-4">
        <input
          v-model="data.consecutivo_e7"
          type="text"
          class="form-control"
          disabled
        />
      </div>
    </div>

    <h5 class="text-center">Rango de fechas para los trabajos</h5>

    <div class="row py-3">
      <div
        class="col-md-2 d-flex align-content-center flex-wrap justify-content-end text-right"
      >
        Fecha inicio
      </div>
      <div class="col-md-3">
        <input
          v-model="data.fecha_inicio"
          type="date"
          class="form-control"
          id="precidencial-prioridad"
          placeholder=""
          autocomplete="off"
          @change="updateDiasTrabajados()"
        />
      </div>
      <div
        class="col-md-2 d-flex align-content-center flex-wrap justify-content-end text-right"
      >
        Fecha terminación
      </div>
      <div class="col-md-3">
        <input
          v-model="data.fecha_fin"
          type="date"
          :min="data.fecha_inicio || ''"
          class="form-control"
          id="precidencial-prioridad"
          placeholder=""
          autocomplete="off"
          @change="updateDiasTrabajados()"
        />
      </div>
    </div>

    <div class="row py-3">
      <div
        class="col-md-2 d-flex align-content-center flex-wrap justify-content-end text-right"
      >
        Días de trabajo
      </div>
      <div class="col-md-2">
        <input
          v-model="data.dias_trabajo"
          type="text"
          class="form-control"
          disabled
        />
      </div>
    </div>

    <div class="row py-3">
      <div
        class="col-md-2 d-flex align-content-center flex-wrap justify-content-end text-right"
      >
        Descripción
      </div>
      <div class="col-md-10">
        <textarea v-model="data.descripcion" class="form-control"></textarea>
      </div>
    </div>

    <div class="row py-3">
      <div
        class="col-md-2 d-flex align-content-center flex-wrap justify-content-end text-right"
      >
        Lugar inscripción
      </div>
      <div class="col-md-10">
        <textarea
          v-model="data.lugar_inscripcion"
          class="form-control"
        ></textarea>
      </div>
    </div>
    <div class="modal-footer">
      <button
        type="button"
        class="btn btn-secondary"
        @click="emit('closeModal')"
      >
        Cerrar
      </button>
      <button type="button" class="btn btn-primary active" @click="save()">
        Aceptar
      </button>
    </div>
    <SeleccionarTrabajoModal
      v-if="openModalTrabajos"
      @onCloseModal="openModalTrabajos = false"
      @onSave="addTrabajo"
    />
  </div>
</template>
<script setup lang="ts">
import { ref, onBeforeMount, onMounted, computed } from "vue";
import { IDatosGenerales } from "@/utils/models/datosGenerales";
import usePetition from "@/composables/usePetition";
import SeleccionarTrabajoModal from "@/components/E7/SeleccionarTrabajoModal.vue";
import { FORMAS_PROCEDIMIENTO } from "@/utils/constants/formasProcedimiento.ts";

const emit = defineEmits(["save", "closeModal"]);

const { arrayData: trabajos } = usePetition("trabajo/");
const { getDatas: getDatasCartera, arrayData: proyectos } = usePetition(
  "cartera_proyectos_inversion/"
);
const { arrayData: arrayDataArea, getDatas: getDatasArea } =
  usePetition("cat_nivel_area/");
const { arrayData: arrayDataTipoCont, getDatas: getDatasTipoCont } =
  usePetition("cat_tipo_contratacion/");
const { arrayData: arrayDataTipoProced, getDatas: getDatasTipoProced } =
  usePetition("cat_tipo_procedimiento/");
const { arrayData: arrayDataEstatus, getDatas: getDatasEstatus } =
  usePetition("cat_estatus/");
const { arrayData: arrayDataSubestatus, getDatas: getDatasSubestatus } =
  usePetition("cat_subestatus/");
const { arrayData: arrayDataCaracter, getDatas: getDatasCaracter } =
  usePetition("cat_caracter_procedimiento/");
const { createData } = usePetition("procedimiento_contratacion/");
const { getDatas: getDatasEntidadFederativa, arrayData: entidades } =
  usePetition("cat_entidad_federativa/");

const props = defineProps(["existingData"]);

const data = ref<IDatosGenerales>({ ...props.existingData });
const trabajo: any = ref({});
const openModalTrabajos = ref(false);

const searchTrabajo = () => {
  const trabajoEncontrado: any = ref({});
  trabajoEncontrado.value = trabajos.value.data.find(
    (tp: any) => tp.id == trabajo.value.id
  );
  let proyecto = proyectos.value.data.find(
    (proyecto: any) =>
      trabajoEncontrado.value.cartera_proyecto_inversion == proyecto.id
  );
  //trabajo.entidad_federativa_desc = entidad ? entidad.descripcion_corta : "";
  trabajoEncontrado.value.cartera_proyecto_inversion_desc = proyecto
    ? proyecto.nombre
    : "";
  trabajoEncontrado.value.no_solicitud = proyecto ? proyecto.no_solicitud : "";
  trabajoEncontrado.value.proyecto = proyecto ? proyecto.nombre : "";
  trabajoEncontrado.value.id_proyecto = proyecto ? proyecto.id : "";
  trabajoEncontrado.value.unidad_responsable = proyecto
    ? proyecto.unidad_responsable
    : "";
  trabajoEncontrado.value.estatus_trabajo = "LIBERADO";
  addTrabajo(trabajoEncontrado);
};

const addTrabajo = (data: any) => {
  trabajo.value = data.value;
  getTrabajoData();
};

const save = () => {
  createData({ ...data.value, folio: claveFolio.value }).then(() => {
    emit("closeModal",true);
  });
};

const getTrabajoData = () => {
  let proyecto = proyectos.value.data.find(
    (proyecto: any) => trabajo.value.cartera_proyecto_inversion == proyecto.id
  );
  let area = arrayDataArea.value.data.find(
    (area: any) => area.nombre == proyecto.area
  );
  let estatus = arrayDataEstatus.value.data.find(
    (estaus: any) => estaus.descripcion == proyecto.estatus_proyecto
  );
  let subestatus = arrayDataSubestatus.value.data.find(
    (subestatus: any) => subestatus.estatus_subestatus_id == estatus.id && subestatus.proceso_id == estatus.fk_proceso
    );
  data.value.trabajo = trabajo.value.id;
  data.value.area = area ? area.id : null;
  data.value.estatus_procedimiento = estatus ? estatus.id : null;
  data.value.subestatus = subestatus ? subestatus.id : null;
  data.value.ciclo_presupuestal = currentYear.value
  data.value.consecutivo_e7 = 0;
};

const updateDiasTrabajados = () => {
  const fechaInicio = new Date(data.value.fecha_inicio + "");
  const fechaFin = new Date(data.value.fecha_fin + "");
  let totalDias = 0;

  if (!isNaN(fechaInicio.getTime()) && !isNaN(fechaFin.getTime())) {
    const diferenciaEnMilisegundos = fechaFin.getTime() - fechaInicio.getTime();
    totalDias = diferenciaEnMilisegundos / (1000 * 60 * 60 * 24);
  }
  data.value.dias_trabajo = totalDias > 0 ? totalDias : 0;
};

const currentYear = computed(() => {
  const currentDate = new Date();
  return currentDate.getFullYear();
})

const claveFolio = computed(() => {
  if (!data.value.tipo_procedimiento) return ""
  const claveSct = "009";
  const entidad = entidades.value.data.find((e:any) => e.descripcion_corta == trabajo.value.entidad_federativa_desc) //TODO esto despues se debe tomar del inicio de sesíon, directamente del user ya que la clave generada puede no coincidir
  const claveEntidad = entidad ? entidad.region+entidad.meso_region : ''
  let tipoProcedimiento = arrayDataTipoProced.value.data.find(
    (tp: any) => tp.id == data.value.tipo_procedimiento
  );
  tipoProcedimiento = tipoProcedimiento
    ? tipoProcedimiento.prefijo.toUpperCase()
    : "";
  if (tipoProcedimiento == "L" || tipoProcedimiento == "LY")
    tipoProcedimiento = "LY-";
  else if (tipoProcedimiento == "I" || tipoProcedimiento == "IY")
    tipoProcedimiento = "IY-";
  else if (tipoProcedimiento == "A" || tipoProcedimiento == "AW")
    tipoProcedimiento = "AW-";
  else tipoProcedimiento = "";

  return `${tipoProcedimiento}${claveSct}-000${claveEntidad}-N0${data.value.tipo_procedimiento}${entidad.id}-${currentYear.value}`
});

onMounted(() => {
  getDatasArea({ page: 1, size: 100 });
  getDatasTipoCont({ page: 1, size: 100 });
  getDatasTipoProced({ page: 1, size: 100 });
  getDatasEstatus({ page: 1, size: 100 });
  getDatasSubestatus({ page: 1, size: 100 });
  getDatasCaracter({ page: 1, size: 100 });
  getDatasCartera({ page: 1, size: 100 });
  getDatasEntidadFederativa({ page: 1, size: 100 });
});

// Lógica para inicializar campos con existingData si está presente
onBeforeMount(() => {
  // if (props.existingData) {
  //     data.value = { ...props.existingData };
  // }
});
</script>
