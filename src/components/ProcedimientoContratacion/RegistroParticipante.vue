<template>
  <div v-if="!loading">
    <div class="row px-3 mt-2 mb-3 py-2 align-items-center">
      <div class="col-sm-3 text-right">Folio</div>
      <div class="col-sm-2">
        <input
          disabled
          v-model="procedimiento.id"
          type="text"
          class="form-control"
        />
      </div>
      <div class="col-sm-3 text-right">Folio procedimiento</div>
      <div class="col-sm-4">
        <input
          disabled
          v-model="procedimiento.folio"
          type="text"
          class="form-control"
        />
      </div>
    </div>

    <div class="row px-3 mt-2 mb-3 py-2 align-items-center">
      <div class="col-sm-3 text-right">Proveedor</div>
      <div class="col-sm-2 text-right">
        <input
          v-model="proveedorSeleccionado.id"
          type="text"
          class="form-control"
        />
      </div>
      <div class="col-sm-6 text-right">
        <input
          disabled
          v-model="proveedorSeleccionado.nombre"
          type="text"
          class="form-control"
        />
      </div>
      <div class="col-md-1 d-flex align-content-center flex-wrap">
        <i
          class="bi bi-info-circle-fill primary-red--text clickable"
          @click="openModalProveedor = true"
        ></i>
      </div>
    </div>
    <div class="row px-3 mt-2 mb-3 py-2 align-items-center">
      <div class="col-sm-3 text-right">Lugar inscripción</div>
      <div class="col-sm-9 text-right">
        <input
          v-model="data.lugar_inscripcion"
          type="text"
          class="form-control"
        />
      </div>
    </div>
    <div class="row px-3 mt-2 mb-3 py-2 align-items-center">
      <div class="col-sm-3 text-right">Fecha inscripción</div>
      <div class="col-sm-3 text-right">
        <input
          v-model="data.fecha_inscripcion"
          type="date"
          class="form-control"
        />
      </div>
      <div class="col-sm-3 text-right">Hora inscripción</div>
      <div class="col-sm-3 text-right">
        <input
          v-model="data.hora_inscripcion"
          type="time"
          class="form-control"
        />
      </div>
    </div>
    <div class="row px-3 mt-2 mb-3 py-2 align-items-center">
      <div class="col-sm-3 text-right">Comentarios</div>
      <div class="col-sm-9 text-right">
        <input v-model="data.comentarios" type="text" class="form-control" />
      </div>
    </div>
    <div class="row px-3 mt-2 mb-3 py-2 align-items-center">
      <div class="col-sm-3 text-right">Posición concurso</div>
      <div class="col-sm-2 text-right">
        <input
          v-model="data.posicion_concurso"
          type="number"
          class="form-control"
        />
      </div>
    </div>
    <div class="row px-3 mt-2 mb-3 py-2 align-items-center">
      <div class="col-sm-3 text-right">Solvente</div>
      <div class="col-sm-4">
        <label class="form-check-label px-5">
          <input
            v-model="data.solvente"
            type="radio"
            name="solvente-radio"
            :value="true"
          />
          <span class="pl-4">Si</span>
        </label>
        <label class="form-check-label px-5">
          <input
            v-model="data.solvente"
            type="radio"
            name="solvente-radio"
            :value="false"
          />
          <span class="pl-4">No</span>
        </label>
      </div>
      <div class="col-sm-3 text-right">Monto propuesta</div>
      <div class="col-sm-2 text-right">
        <input
          v-model="data.monto_propuesta"
          type="number"
          class="form-control"
        />
      </div>
    </div>
    <div class="row px-3 mt-2 mb-3 py-2 align-items-center">
      <div class="col-sm-3 text-right">Ganador de propuesta</div>
      <div class="col-sm-4">
        <label class="form-check-label px-5">
          <input
            v-model="data.ganador_propuesta"
            type="radio"
            name="ganador-radio"
            :value="true"
          />
          <span class="pl-4">Si</span>
        </label>
        <label class="form-check-label px-5">
          <input
            v-model="data.ganador_propuesta"
            type="radio"
            name="ganador-radio"
            :value="false"
          />
          <span class="pl-4">No</span>
        </label>
      </div>
    </div>
    <div class="text-right my-5">
      <button
        type="button"
        class="btn btn-secondary"
        @click="emit('closeModal')"
      >
        Cerrar
      </button>
      <button
        type="button"
        class="ml-4 btn btn-primary active"
        @click="addParticipante()"
      >
        {{ props.participante && props.participante.id ? "Editar" : "Aceptar" }}
      </button>
    </div>
    <SeleccionarProveedor
      v-if="openModalProveedor"
      @onCloseModal="openModalProveedor = false"
      @onSave="addProveedor"
    />
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted,PropType  } from "vue";
import SeleccionarProveedor from "@/components/ProcedimientoContratacion/SeleccionarProveedor.vue";
import usePetition from "@/composables/usePetition";
import {
  IRegistroParticipante,
  defaultValues,
} from "@/utils/models/registroParticipante";
import useAlert from "@/composables/useAlert";

const props = defineProps({
  procedimiento: {
    type: Object,
    default: {}
  },
  participante: {
    type: Object as PropType<any>,
    default: {}
  },
  subestatus: {
    type: Object,
    default: {}
  },
});

const emit = defineEmits(["save", "closeModal"]);

const { showAlertSuccess } = useAlert();

const { createData, updateData } = usePetition(
  "registro_participante/"
);

const openModalProveedor = ref(false);
const data = ref<IRegistroParticipante>(defaultValues);
const proveedorSeleccionado:any = ref({})
const loading = ref(false)

const addProveedor = (proveedor:any) => {
  proveedorSeleccionado.value = proveedor.value;
  data.value.proveedor = proveedor.value.id;
  data.value.estatus_registro_participante =
    proveedor.value.proveedor_estatus.id;
  data.value.modulo = proveedor.value.proveedor_estatus;
};

const addParticipante = () => {
  data.value.procedimiento_contratacion = props.procedimiento.id;
  data.value.modulo = props.subestatus.modulo_id;
  data.value.proceso = props.subestatus.proceso_id;
  if (props.participante.id) {
    updateData(data.value).then(() => {
      emit("save");
      showAlertSuccess("Datos actualizados correctamente");
    });
  } else {
    createData(data.value).then(() => {
      emit("save");
      showAlertSuccess("Datos guardados correctamente");
    });
  }
};

const resetForm = () => {
  
  data.value = defaultValues;
  proveedorSeleccionado.value = {};
  
};

onMounted(async () => {
  loading.value = true
  console.log('reset')
  resetForm();
  if (props.participante && props.participante.id) {
    data.value = props.participante
    proveedorSeleccionado.value.id =  props.participante.proveedor.id 
    proveedorSeleccionado.value.nombre =  props.participante.proveedor.nombre
    data.value.proveedor = props.participante.proveedor.id 
  }
  loading.value = false
});
</script>
