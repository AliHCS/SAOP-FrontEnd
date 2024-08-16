<template>
  <h4 class="view-name">{{ viewName }}</h4>
  <hr class="red" />
  <div
    class="d-flex flex-row app-options-bar align-items-center justify-content-between"
  >
    <div>
      <div v-if="!showReport">
        <div class="row align-items-center">
          <div class="col-md-4">
            <label for="startValue" class="control-label"
              >Unidad Responsable:</label
            >
          </div>
          <div class="col-md-4">
            <input
              type="number"
              id="startValue"
              class="form-control"
              v-model="data.unidad_responsable.inicio"
            />
          </div>
          <div class="col-md-4">
            <input
              type="number"
              id="startValue"
              class="form-control"
              v-model="data.unidad_responsable.fin"
            />
          </div>
        </div>
        <div class="row align-items-center py-3">
          <div class="col-md-4">
            <label for="startValue" class="control-label">No. Solicitud:</label>
          </div>
          <div class="col-md-4">
            <input
              type="number"
              id="startValue"
              class="form-control"
              v-model="data.no_solicitud.inicio"
            />
          </div>
          <div class="col-md-4">
            <input
              type="number"
              id="startValue"
              class="form-control"
              v-model="data.no_solicitud.fin"
            />
          </div>
        </div>
        <div class="row align-items-center">
          <div class="col-md-4">
            <label for="startValue" class="control-label">Cve. Cartera:</label>
          </div>
          <div class="col-md-4">
            <input
              type="number"
              id="startValue"
              class="form-control"
              v-model="data.cve_cartera.inicio"
            />
          </div>
          <div class="col-md-4">
            <input
              type="number"
              id="startValue"
              class="form-control"
              v-model="data.cve_cartera.fin"
            />
          </div>
        </div>
      </div>
    </div>
    <div>
      <button
        v-if="!showReport"
        title="Descargar"
        class="btn btn-primary"
        type="button"
        @click="sendData"
        :disabled="isButtonDisabled"
      >
        Aceptar
      </button>
      <button
        v-if="showReport"
        title="Descargar"
        class="btn btn-primary"
        type="button"
        @click="exportData"
      >
        Descargar
      </button>
    </div>
  </div>
  <TableReportComponent
    v-if="arrayReporte.length > 0 && showReport"
    :data="arrayReporte"
    :dataBold="boldRows"
    :keyBold="boldKey"
    :columnBold="boldColumns"
  >
    <!--     <template v-slot:head>
      <tr class="table-gob">
        <th class="text-center" colspan="2"></th>
        <th class="text-center" colspan="3">Proyecto Cartera de Inversion</th>
        <th class="text-center" colspan="3"></th>
      </tr>
    </template> -->
  </TableReportComponent>
</template>
<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { scrollTop } from "@/utils/helpers/scrollHelper";
/* import usePetition from "@/composables/usePetition"; */
import TableReportComponent from "@/components/TableReportComponent.vue";
import useAlert from "@/composables/useAlert";

/* const { arrayData: arrayDataAnios, getAniosReports } =
    usePetition("anios_datos/");
const { exportDoc: exportReport } = usePetition("reporte_red_carretera_por_tipo_red"); */

const { showAlertError, showAlertSuccess } = useAlert();

const arrayReporte = ref([
  {
    Entidad: "Gobierno A",
    "Unidad Responsable": "Responsable1",
    "No. Solicitud": "SOL-001",
    "Cve Cartera": "CART-001",
    "Nombre Proyecto": "Proyecto A",
    "Descripcion Proyecto": "Descripción del Proyecto A",
    "Tipo Proyecto": "Infraestructura",
    Beneficios: "Beneficios del Proyecto A",
    Localizacion: "Ubicación A",
    "Fecha Inicial": "2022-01-01",
    "Fecha Final": "2023-01-01",
    Fase: "Planificación",
    "Ejercicio Presupuestal": "2022",
    "Desc. Estatus": "En progreso",
    Comentarios: "Comentarios sobre el Proyecto A",
    Pais: "PaisA",
    "Anio Base": "2022",
    InversionTotal: 1000000,
    "Valor Presente Neto": 800000,
    "Gtos Estimacion Opera": 200000,
    "Otros Ctos": 50000,
    "Financiamiento Adicional": 0,
    "Cto Anual Equivalente": 250000,
    "Tasa Interna Retorno": 0.1,
    "Tasa RI": 0.08,
    "Tasa Descuento": 0.05,
  },
  {
    Entidad: "Gobierno B",
    "Unidad Responsable": "Responsable2",
    "No. Solicitud": "SOL-002",
    "Cve Cartera": "CART-002",
    "Nombre Proyecto": "Proyecto B",
    "Descripcion Proyecto": "Descripción del Proyecto B",
    "Tipo Proyecto": "Desarrollo Social",
    Beneficios: "Beneficios del Proyecto B",
    Localizacion: "Ubicación B",
    "Fecha Inicial": "2023-01-01",
    "Fecha Final": "2024-01-01",
    Fase: "Ejecución",
    "Ejercicio Presupuestal": "2023",
    "Desc. Estatus": "Completado",
    Comentarios: "Comentarios sobre el Proyecto B",
    Pais: "PaisB",
    "Anio Base": "2023",
    InversionTotal: 1500000,
    "Valor Presente Neto": 1200000,
    "Gtos Estimacion Opera": 300000,
    "Otros Ctos": 75000,
    "Financiamiento Adicional": 100000,
    "Cto Anual Equivalente": 375000,
    "Tasa Interna Retorno": 0.12,
    "Tasa RI": 0.1,
    "Tasa Descuento": 0.06,
  },
  {
    Entidad: "Gobierno C",
    "Unidad Responsable": "Responsable3",
    "No. Solicitud": "SOL-003",
    "Cve Cartera": "CART-003",
    "Nombre Proyecto": "Proyecto C",
    "Descripcion Proyecto": "Descripción del Proyecto C",
    "Tipo Proyecto": "Educativo",
    Beneficios: "Beneficios del Proyecto C",
    Localizacion: "Ubicación C",
    "Fecha Inicial": "2024-01-01",
    "Fecha Final": "2025-01-01",
    Fase: "Evaluación",
    "Ejercicio Presupuestal": "2024",
    "Desc. Estatus": "En revisión",
    Comentarios: "Comentarios sobre el Proyecto C",
    Pais: "PaisC",
    "Anio Base": "2024",
    InversionTotal: 1200000,
    "Valor Presente Neto": 900000,
    "Gtos Estimacion Opera": 250000,
    "Otros Ctos": 60000,
    "Financiamiento Adicional": 50000,
    "Cto Anual Equivalente": 300000,
    "Tasa Interna Retorno": 0.08,
    "Tasa RI": 0.06,
    "Tasa Descuento": 0.04,
  },
]);
// Filas que se resaltarán: aquellas con un "Tipo Proyecto" igual a "Infraestructura"
const boldRows = ref(["Infraestructura"]);

// Clave que se utilizará para resaltar las filas: "Tipo Proyecto"
const boldKey = ref("Tipo Proyecto");

// Columnas que se resaltarán: aquellas relacionadas con el "Valor Presente Neto" y "Cto Anual Equivalente"
const boldColumns = ref(["Valor Presente Neto", "Cto Anual Equivalente"]);

const data = ref({
  unidad_responsable: {
    fin: "",
    inicio: "",
  },
  no_solicitud: {
    fin: "",
    inicio: "",
  },
  cve_cartera: {
    fin: "",
    inicio: "",
  },
});
const viewName = "Reporte cartera de inversion";
const showReport = ref(false);

/* const { getData } = usePetition("reporte_red_carretera_por_tipo_red/"); */
const isButtonDisabled = computed(() => {
  // Check if any of the input fields is empty
  return (
    data.value.unidad_responsable.inicio === "" &&
    data.value.unidad_responsable.fin === "" &&
    data.value.no_solicitud.inicio === "" &&
    data.value.no_solicitud.fin === "" &&
    data.value.cve_cartera.inicio === "" &&
    data.value.cve_cartera.fin === ""
  );
});

const exportData = async () => {
  try {
    /*     let queryParams = "excel=true";
    const nombre = obtenerNombre("REPORTE_1_1", getAnio); // Cambiar aquí
    await exportReport(selectedAnio.value, `${nombre}.xlsx`, queryParams); */

    // Simulación de una demora de 1 segundo (1000 milisegundos)
    setTimeout(() => {
      showAlertSuccess("Archivo descargado correctamente");
    }, 1000);
  } catch (error) {
    showAlertError("No se pudo descargar el archivo");
  }
};

const sendData = () => {
  // Simulación de una demora de 1 segundo (1000 milisegundos)
  setTimeout(() => {
    // Cambiar el valor de showReport después de la demora
    showReport.value = !showReport.value;
  }, 1000);
};
/* const handleSearch = async () => {
  const term = selectedAnio.value;
  try {
    const response = await getData(term);
    arrayReporte.value = response;
  } catch (error) {
    showAlertError("No se encontro información para el año seleccionado");
    console.log(error);
  }
}; */

onMounted(async () => {
  scrollTop();
});
</script>

<style scoped></style>
