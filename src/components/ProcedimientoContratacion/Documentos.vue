<template>
  <div>
    <div class="container">
      <div class="section table-section">
        <DataTableComponent
          :columns="columns"
          :data="leftTableData"
          row-id="clave"
          @onGetID="handleLeftTableRowSelection"
        />
      </div>
      <div class="section icons-section">
        <div
          class="icon-container"
          v-for="(icon, index) in icons"
          :key="index"
          @click="handleIconClick(icon.action)"
        >
          <i
            :class="icon.class"
            data-toggle="tooltip"
            data-placement="top"
            :title="icon.title"
          ></i>
        </div>
      </div>
      <div class="section empty-table-section">
        <DataTableComponent
          :columns="columns"
          :data="rightTableData"
          row-id="clave"
          @onGetID="handleRightTableRowSelection"
        />
      </div>
    </div>
    <div class="modal-footer">
      <button
        type="button"
        class="btn btn-secondary"
        @click="emit('closeModal')"
      >
        Cancelar
      </button>
      <button type="button" class="btn btn-primary active" @click="save">
        Aceptar
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import DataTableComponent from "./TableDocumentos.vue";
import usePetition from "@/composables/usePetition";
import CatTipoDocumento from "@/utils/models/cat_tipoDocumento";
import { HTTP_METHODS } from "@/utils/constants/methodsPetitions";
import { useProcesoContratacionStore } from "@/store/procesoContratacionStore";
import { IDocumentosGenerales } from "@/utils/models/datosGenerales";
import useAlert from "@/composables/useAlert";

const { customPetition } = usePetition("cat_tipo_documento/");
const { customPetition: customPetitionDocs } = usePetition(
  "documentacion_procedimiento_contratacion/"
);
const { showAlertSuccess, showAlertError } = useAlert();

const enum actionIcon {
  AgregarTodo = "ATodo",
  AgregarUno = "AUno",
  QuitarUno = "QUno",
  QuitarTodo = "QTodo",
}

const emit = defineEmits(["closeModal"]);

const itemId = ref("");
const procesoContratacionStore = useProcesoContratacionStore();
const rightTableIDs = ref<(string | null)[]>([]);
const dataDocs = ref<any>();

// Datos de las tablas
const leftTableData = ref<CatTipoDocumento[]>([]);
const rightTableData = ref<CatTipoDocumento[]>([]);

// Para almacenar las filas seleccionadas
const selectedRowIzq = ref<CatTipoDocumento | null>(null);
const selectedRowDer = ref<CatTipoDocumento | null>(null);

const save = () => {
  // Guardar los IDs de los registros de la tabla derecha
  rightTableIDs.value = rightTableData.value.map((row) => row.clave);
  dataDocs.value = {
    procedimiento_id: itemId.value,
    documentos_id: rightTableIDs.value,
  };
  customPetitionDocs(HTTP_METHODS.POST, dataDocs.value, "bulk/")
    .then(() => {
      showAlertSuccess("Se agregaron los archivos con exito");
    })
    .catch((error) => {
      showAlertError(error);
    })
    .finally(() => emit("closeModal"));
};

const columns = [
  { title: "ID", data: "id" },
  { title: "Clave", data: "clave" },
  { title: "Tipo Documento", data: "nombre" },
  { title: "Descripción Tipo de Documento", data: "descripcion" },
];

// Manejar la selección de una fila en la tabla de la izquierda
const handleLeftTableRowSelection = (row: CatTipoDocumento) => {
  selectedRowIzq.value = row;
  selectedRowDer.value = null; // Limpiar la selección en la tabla de la derecha
};

// Manejar la selección de una fila en la tabla de la derecha
const handleRightTableRowSelection = (row: CatTipoDocumento) => {
  selectedRowDer.value = row;
  selectedRowIzq.value = null; // Limpiar la selección en la tabla de la izquierda
};

const icons = ref([
  {
    class: "bi bi-chevron-double-right",
    title: "Agregar Todo",
    action: actionIcon.AgregarTodo,
  },
  {
    class: "bi bi-chevron-right",
    title: "Agregar Uno",
    action: actionIcon.AgregarUno,
  },
  {
    class: "bi bi-chevron-left",
    title: "Quitar Uno",
    action: actionIcon.QuitarUno,
  },
  {
    class: "bi bi-chevron-double-left",
    title: "Quitar Todo",
    action: actionIcon.QuitarTodo,
  },
]);

const handleIconClick = (action: string) => {
  switch (action) {
    case actionIcon.AgregarTodo:
      rightTableData.value = [...rightTableData.value, ...leftTableData.value];
      leftTableData.value = [];
      break;
    case actionIcon.AgregarUno:
      if (selectedRowIzq.value) {
        const rowToMove = { ...selectedRowIzq.value }; // Crear una copia del registro seleccionado
        if (
          !rightTableData.value.some((row) => row.clave === rowToMove.clave)
        ) {
          rightTableData.value.push(rowToMove);
          leftTableData.value = leftTableData.value.filter(
            (row) => row.clave !== rowToMove.clave
          );
        }
        selectedRowIzq.value = null;
      }
      break;
    case actionIcon.QuitarUno:
      if (selectedRowDer.value) {
        const rowToMove = { ...selectedRowDer.value }; // Crear una copia del registro seleccionado
        if (!leftTableData.value.some((row) => row.clave === rowToMove.clave)) {
          leftTableData.value.push(rowToMove);
          rightTableData.value = rightTableData.value.filter(
            (row) => row.clave !== rowToMove.clave
          );
        }
        selectedRowDer.value = null;
      }
      break;
    case actionIcon.QuitarTodo:
      leftTableData.value = [...leftTableData.value, ...rightTableData.value];
      rightTableData.value = [];
      break;
    default:
      console.log("Acción no reconocida");
  }
};

onBeforeMount(async () => {
  itemId.value = procesoContratacionStore.getSelectedRowData.id ?? "";
  const docs: IDocumentosGenerales[] =
    procesoContratacionStore.getSelectedRowData.docs_proc ?? [];
  const dataResponse = await customPetition(
    HTTP_METHODS.GET,
    undefined,
    "",
    "paginate=false"
  );
  /* console.log(dataResponse); */
  leftTableData.value = dataResponse || [];
  if (docs && docs.length > 0) {
    const docsTipoDocumentoIds = docs.map((doc) => doc.tipo_documento);

    rightTableData.value = leftTableData.value.filter((item: any) =>
      docsTipoDocumentoIds.includes(item.clave)
    );

    leftTableData.value = leftTableData.value.filter(
      (item: any) => !docsTipoDocumentoIds.includes(item.clave)
    );
  }
});
</script>

<style scoped>
.container {
  display: flex;
}

.section {
  flex: 1;
}

.table-section,
.empty-table-section {
  flex: 6; /* Las tablas ocuparán más espacio */
  overflow-y: auto; /* Habilitar scroll vertical */
  max-height: 700px; /* Ajustar altura máxima según tus necesidades */
}

.icons-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100px;
}

.icon-container {
  margin: 20px 0;
  font-size: 2em;
  cursor: pointer;
}

.table-hover tbody tr:hover {
  background-color: #f5f5f5;
  cursor: pointer;
}

.selectedRow {
  background-color: #d0d0d0 !important;
  color: #523e3e;
  font-weight: 400;
}
</style>
