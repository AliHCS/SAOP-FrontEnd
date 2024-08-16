<template>
  <div>
    <div
      :class="{ 'show modal-backdrop': isModalOpen }"
      v-if="isModalOpen"
    ></div>
    <div
      class="modal fade overflow-auto"
      :class="{ ' show ': isModalOpen }"
      v-if="isModalOpen"
    >
      <div :class="['modal-dialog', 'modal-xl']">
        <div class="modal-content">
          <div class="custom-modal-header">
            <h4 class="custom-modal-title">Asociar a trabajos</h4>
            <button
              type="button"
              class="close"
              aria-label="Close"
              @click="closeModal"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <h3>Asociación</h3>
            <div class="row py-3">
              <div
                class="col-md-3 d-flex align-content-center flex-wrap justify-content-end text-right"
              >
                Trabajos
              </div>
              <div class="col-md-2">
                <input
                  v-model="trabajo.id"
                  type="text"
                  class="form-control"
                  @keyup.enter="searchTrabajo()"
                />
              </div>
              <div class="col-md-3">
                <input
                  v-model="trabajo.numero_obra"
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
            </div>
            <div class="row py-3">
              <div
                class="col-md-3 d-flex align-content-center flex-wrap justify-content-end text-right"
              >
                No. Solicitud
              </div>
              <div class="col-md-2">
                <input
                  v-model="trabajo.no_solicitud"
                  type="text"
                  class="form-control"
                  disabled
                />
              </div>
              <div class="col-md-7">
                <input
                  v-model="trabajo.proyecto"
                  type="text"
                  class="form-control"
                  disabled
                />
              </div>
            </div>
            <div class="row py-3">
              <div
                class="col-md-3 d-flex align-content-center flex-wrap justify-content-end text-right"
              >
                PEF
              </div>
              <div class="col-md-2">
                <input
                  v-model="trabajo.presupuesto_egresos_federacion"
                  type="text"
                  class="form-control"
                  disabled
                />
              </div>
              <div class="col-md-7">
                <input
                  v-model="trabajo.pef_descripcion"
                  type="text"
                  class="form-control"
                  disabled
                />
              </div>
            </div>
            <div class="row py-3">
              <div
                class="col-md-3 d-flex align-content-center flex-wrap justify-content-end text-right"
              >
                Trabajo
              </div>
              <div class="col-md-9">
                <select
                  v-model="selectTrabajoPrevio"
                  class="form-select form-control"
                >
                  <option
                    v-for="trabajoPrevio in selectedTrabajo"
                    :key="trabajoPrevio.id"
                    :value="trabajoPrevio"
                  >
                    {{ trabajoPrevio.descripcion_trabajos_previos }}
                  </option>
                </select>
              </div>
            </div>
            <div class="row py-3">
              <div
                class="col-md-3 d-flex align-content-center flex-wrap justify-content-end text-right"
              >
                Consecutivo
              </div>
              <div class="col-md-9">
                <select
                  class="form-select form-control"
                  v-model="selectedConsecutivo"
                >
                  <option
                    v-for="item in tp"
                    :key="item.id"
                    :value="item.consecutivo"
                  >
                    {{ item.consecutivo }}
                  </option>
                </select>
              </div>
            </div>
            <div class="row py-3">
              <div
                class="col-md-3 d-flex align-content-center flex-wrap justify-content-end text-right"
              >
                Cálculo de ajuste de costos
              </div>
              <div class="col-md-9">
                <select v-model="selectAjuste" class="form-select form-control">
                  <option
                    v-for="ajuste in AJUSTE_COSTOS"
                    :key="ajuste.id"
                    :value="ajuste.id"
                  >
                    {{ ajuste.name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="row py-3">
              <div
                class="col-md-3 d-flex align-content-center flex-wrap justify-content-end text-right"
              >
                Unidad responsable
              </div>
              <div class="col-md-9">
                <select
                  v-model="selectUR"
                  class="form-select form-control"
                  disabled
                >
                  <option
                    v-for="unidad in UR.data"
                    :key="unidad.id"
                    :value="unidad.descripcion"
                  >
                    {{ unidad.descripcion }}
                  </option>
                </select>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                @click="mConsecutivo = true"
                :disabled="!canUpdate"
              >
                Agregar consecutivo
              </button>
              <button
                type="button"
                class="btn btn-primary active"
                @click="closeAndUpdateModal"
                :disabled="!canUpdate"
              >
                Actualizar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <SeleccionarTrabajoModal
      v-if="openModalTrabajos"
      @onCloseModal="openModalTrabajos = false"
      @onSave="addTrabajo"
    />

    <ModalConsecutivo
      v-if="mConsecutivo"
      :title="`Agregar Consecutivo`"
      saveButtonTitle="Aceptar"
      openButtonTittle="Crear"
      size-modal="lg"
      @onCloseModal="closeAndCreateModal"
      :showAcceptButton="false"
    >
      <div>Proceso terminado</div>
      <div>Consecutivo tomado: {{ resultadoConsecutivo }}</div>
    </ModalConsecutivo>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import SeleccionarTrabajoModal from "@/components/E7/SeleccionarTrabajoModal.vue";
import usePetition from "@/composables/usePetition";
import { AJUSTE_COSTOS } from "@/utils/constants/ajusteCostos.ts";
import { HTTP_METHODS } from "@/utils/constants/methodsPetitions";
import ModalConsecutivo from "@/components/ModalWithoutButton.vue";
import useAlert from "@/composables/useAlert";
import { getToken } from "@/utils/helpers/authenticationHelper";
// import { defineProps } from 'vue';

const emit = defineEmits(["onSave", "onCloseModal"]);

const props = withDefaults(
  defineProps<{
    conceptos: Array<any>;
  }>(),
  {
    conceptos: () => [], // Proporciona un array vacío como valor predeterminado
  }
);
const { getData: getPEF } = usePetition("presupuesto_egresos_federacion/");
// const { getDatas: getTrabajos, arrayData: trabajos } = usePetition("trabajo/");
const { getDatas: getTrabajosPrevios, arrayData: trabajosPrevios } =
  usePetition("trabajo_previo/");
const { getDatas: getUR, arrayData: UR } = usePetition(
  "cat_unidad_responsable/"
);
const {
  customPetition,
  getDatas: getTrabajos,
  arrayData: trabajos,
} = usePetition("trabajo/");
const { getDatas: getDatasCartera, arrayData: proyectos } = usePetition(
  "cartera_proyectos_inversion/"
);

const selectedConsecutivo = ref(null);
const isModalOpen = ref(true);
const selectAjuste = ref();
const selectUR = ref();
const openModalTrabajos = ref(false);
const trabajo: any = ref({});
const selectTrabajoPrevio = ref();
const proyectoSeleccionado = ref();
const mConsecutivo = ref();
const { showAlertSuccess, showAlertError, showAlertWarning } = useAlert();

const resultadoConsecutivo = ref();

const closeModal = () => {
  isModalOpen.value = false;
  emit("onCloseModal");
};

const closeAndUpdateModal = async () => {
  if (!props.conceptos || props.conceptos.length === 0) {
    showAlertWarning("No hay conceptos para procesar.");
    return;
  }

  const formattedConcepts = props.conceptos.map((concepto) => ({
    partida: concepto.partida,
    norma: concepto.clasificacion,
    descripcion: concepto.descripcion,
    grupo: concepto.grupo,
    unidad_de_medida: concepto.unidad_medida,
    cantidad: parseFloat(concepto.cantidad_obra),
    precio: parseFloat(concepto.precio),
    importe: parseFloat(concepto.cantidad_obra) * parseFloat(concepto.precio),
  }));

  const data = {
    trabajo: trabajo.value.id,
    consecutivo: selectedConsecutivo.value,
  };

  try {
    const response = await saveConcepts(formattedConcepts);
    await enviarDatos(response.id, data);
    showAlertSuccess("Se han actualizado los datos correctamente", 3000);
    emit("onSave");
    closeModal();
  } catch (error) {
    showAlertError("Hubo un error al asociar los conceptos", 3000);
  }
};

// Este metodo se usara para mandar la info de
const closeAndCreateModal = async () => {
  if (!props.conceptos || props.conceptos.length === 0) {
    showAlertWarning("No hay conceptos para procesar.");
    return;
  }

  const formattedConcepts = props.conceptos.map((concepto) => ({
    partida: concepto.partida,
    norma: concepto.clasificacion,
    descripcion: concepto.descripcion,
    grupo: concepto.grupo,
    unidad_de_medida: concepto.unidad_medida,
    cantidad: parseFloat(concepto.cantidad_obra),
    precio: parseFloat(concepto.precio),
    importe: parseFloat(concepto.cantidad_obra) * parseFloat(concepto.precio),
  }));

  const data = {
    trabajo: trabajo.value.id,
    consecutivo: resultadoConsecutivo.value,
  };
  try {
    const response = await saveConcepts(formattedConcepts);
    await enviarDatos(response.id, data);
    showAlertSuccess("Se han actualizado los datos correctamente", 3000);
    emit("onSave");
    closeModal();
  } catch (error) {
    showAlertError("Hubo un error al asociar los conceptos", 3000);
  }
};

const selectedTrabajo = computed(() => {
  const trabajoEncontrado = trabajosPrevios.value.data.find(
    (t: any) => t.id === trabajo.value.id
  );
  return trabajoEncontrado ? trabajoEncontrado.trabajos_previos : [];
});

const addTrabajo = (data: any) => {
  trabajo.value = data.value;
  getPEF(data.value.presupuesto_egresos_federacion).then((response) => {
    trabajo.value.pef_descripcion = response.descripcion_programa;
  });
  getUR({ page: 1, size: 100 }).then(() => {
    selectUR.value = data.value.unidad_responsable;
  });
  proyectoSeleccionado.value = data.value.id_proyecto;
  cargarConsecutivo();
};

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

const tp = computed(() => {
  // Asegurándonos de que selectedTrabajo.value es un array y ordenándolo por 'consecutivo'
  const sortedItems = selectedTrabajo.value
    ? [...selectedTrabajo.value].sort((a, b) => a.consecutivo - b.consecutivo)
    : [];
  return sortedItems;
});

// Función asincrónica para cargar los datos del consecutivo
async function cargarConsecutivo() {
  try {
    if (trabajo.value && trabajo.value.id) {
      const dataResponse = await customPetition(
        HTTP_METHODS.GET,
        undefined,
        `${trabajo.value.id}/consecutivo`
      );
      resultadoConsecutivo.value = dataResponse.siguiente_consecutivo;
    } else {
      console.error("ID del trabajo no disponible.");
      resultadoConsecutivo.value = "No disponible";
    }
  } catch (error) {
    console.error("Error al cargar consecutivos:", error);
  }
}
const canUpdate = computed(() => {
  return (
    trabajo.value.id &&
    selectAjuste.value &&
    selectTrabajoPrevio.value &&
    selectedConsecutivo.value
  );
});

const enviarDatos = async (id_temporal: any, data: any) => {
  const token = getToken(); // Obtener el token de autenticación
  const url = `${
    import.meta.env.VITE_API
  }conceptos_trabajos/${id_temporal}/asociar/`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Especificar que el contenido es JSON
        Authorization: `Bearer ${token}`, // Asegúrate de incluir el token de autenticación
      },
      body: JSON.stringify(data), // Convertir el objeto de datos a un string JSON
    });

    if (response.ok) {
      // La solicitud fue exitosa
      const jsonResponse = await response.json(); // Suponiendo que el servidor responde con JSON
      // showAlertSuccess("Datos guardados correctamente");
      console.log("Respuesta del servidor:", jsonResponse); // Mostrar la respuesta del servidor en la consola
    } else {
      // La solicitud no fue exitosa, manejar el error aquí
      const errorResponse = await response.json(); // Asumiendo que el servidor responde con JSON en caso de error
      const errorMessage = `Error en la solicitud: ${response.status} - ${response.statusText}: ${errorResponse.message}`;
      showAlertWarning(errorMessage);
    }
  } catch (error) {
    // Manejar errores
    showAlertWarning(error as string);
  }
};

const saveConcepts = async (data: any) => {
  const token = getToken(); // Obtener el token de autenticación
  const url = `${import.meta.env.VITE_API}conceptos_trabajos/`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        datos: data,
      }),
    });

    if (response.ok) {
      const jsonResponse = await response.json();
      console.log("Respuesta del servidor:", jsonResponse);
      return jsonResponse; // Devuelve la respuesta JSON
    } else {
      const errorResponse = await response.json();
      const errorMessage = `Error en la solicitud: ${response.status} - ${response.statusText}: ${errorResponse.message}`;
      showAlertWarning(errorMessage);
      throw new Error(errorMessage);
    }
  } catch (error) {
    // Manejar errores
    showAlertWarning(error as string);
  }
};

onMounted(async () => {
  getTrabajosPrevios({ page: 1, size: 100 }).then(() => {});
  getTrabajos({ page: 1, size: 1000 });
  getDatasCartera({ page: 1, size: 1000 });
});
</script>

<style scoped>
.custom-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #545454;
  background-color: #272829;
}

.custom-modal-title {
  text-align: center;
  color: white;
  flex-grow: 1;
}

.custom-modal-header .close {
  color: white;
  cursor: pointer;
}

.custom-modal-header .close:hover {
  color: #ccc;
}

@media (min-width: 768px) {
  .modal .modal-dialog.modal-xl {
    max-width: 1300px !important;
    width: 100%;
    margin: 30px auto;
  }
}

.modal-dialog.modal-xl {
  max-width: 900px !important;
}
</style>
