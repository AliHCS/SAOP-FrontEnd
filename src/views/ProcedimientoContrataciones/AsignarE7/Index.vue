<template>
  <div v-if="!loading">
    <ul class="nav nav-tabs" id="myTab" role="tablist">
      <li class="nav-item" role="presentation">
        <button
          class="nav-link active"
          id="home-tab"
          data-bs-toggle="tab"
          data-bs-target="#home"
          type="button"
          role="tab"
          aria-controls="home"
          aria-selected="true"
        >
          {{ tabAsignarE7 }}
        </button>
      </li>
    </ul>
    <div class="tab-content mt-4" id="myTabContent">
      <div
        class="tab-pane fade show active"
        id="home"
        role="tabpanel"
        aria-labelledby="home-tab"
      >
        <div>
          <div class="form-group">
            <div class="row mb-2">
              <label class="col-sm-3 col-form-label text-right"
                >Folio del Procedimiento:</label
              >
              <div class="col-sm-9">
                <input
                  v-model="procedimiento.folio"
                  class="form-control"
                  type="text"
                  disabled
                />
              </div>
            </div>
            <div class="row mb-2">
              <label class="col-sm-3 col-form-label text-right"
                >Numero de Solicitud:</label
              >
              <div class="col-sm-2">
                <input
                  class="form-control"
                  type="text"
                  v-model="procedimiento.proyecto.no_solicitud"
                  disabled
                />
              </div>
              <div class="col-sm-7">
                <input
                  class="form-control"
                  type="text"
                  v-model="procedimiento.proyecto.nombre"
                  disabled
                />
              </div>
            </div>
            <div class="row mb-2">
              <label class="col-sm-3 col-form-label text-right"
                >Trabajos:</label
              >
              <div class="col-sm-2">
                <input
                  class="form-control"
                  type="text"
                  v-model="procedimiento.trabajoInfo.id"
                  disabled
                />
              </div>
              <div class="col-sm-7">
                <input
                  class="form-control"
                  type="text"
                  v-model="procedimiento.trabajoInfo.descripcion"
                  disabled
                />
              </div>
            </div>
            <div class="row mb-2">
              <label class="col-sm-3 col-form-label text-right">PEF:</label>
              <div class="col-sm-2">
                <input
                  disabled
                  class="form-control"
                  type="text"
                  v-model="
                    procedimiento.trabajoInfo.presupuesto_egresos_federacion
                  "
                />
              </div>
              <label class="col-sm-3 col-form-label text-right"
                >Consecutivo:</label
              >
              <div class="col-sm-4">
                <select
                  class="form-select form-control"
                  v-model="procedimiento.consecutivo_e7"
                  @change="getConceptos()"
                >
                  <option selected>Seleccione...</option>
                  <option v-for="item in tp" :key="item" :value="item">
                    {{ item.consecutivo }}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <hr class="red" />

          <div class="small-table">
            <table class="table table-hover table-bordered">
              <tr>
                <th>Partida</th>
                <th>Concepto</th>
                <th>Descripción</th>
                <th>Cantidad de obra</th>
                <th>Precio</th>
              </tr>
              <tbody v-if="conceptos.length" class="mt-5">
                <tr v-for="c in conceptos">
                  <td>{{ c.partida }}</td>
                  <td>{{ c.norma }}</td>
                  <td>{{ c.descripcion }}</td>
                  <td>{{ c.cantidad }}</td>
                  <td>{{ c.precio }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="text-right">
            <button
              class="dt-button btn btn-secondary btn-cancelar"
              type="button"
              @click="
                router.push({ name: 'listar-procedimiento-contrataciones' })
              "
            >
              <b>Cancelar</b>
            </button>
            <button
              v-if="
                procedimiento.consecutivo_e7 && procedimiento.consecutivo_e7.id
              "
              class="dt-button btn btn-primary active btn-crear ml-4"
              type="button"
              @click="save()"
            >
              <span
                ><i class="bi bi-link"></i> <b>Relacionar con proceso</b></span
              >
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import usePetition from "@/composables/usePetition";
import { useRoute, useRouter } from "vue-router";
import useAlert from "@/composables/useAlert";
import { HTTP_METHODS } from "@/utils/constants/methodsPetitions";

const { showAlertSuccess } = useAlert();
const route = useRoute();
const router = useRouter();

// Datos y métodos para la tabla y los filtros
const tabAsignarE7 = "Asignar la E7";

const { getData: getDataPC, customPetition: asignarE7 } = usePetition(
  "procedimiento_contratacion/"
);
const { getDatas: getDatasCartera, arrayData: arrayDataCartera } = usePetition(
  "cartera_proyectos_inversion/"
);
const { getDatas: getDatasTP, arrayData: arrayDataTP } =
  usePetition("trabajo_previo/");
const { getDatas: getDatasConceptos, arrayData: arrayConceptos } = usePetition(
  "conceptos_trabajos/"
);

const loading = ref(true);
const conceptos: any = ref([]);

const procedimiento: any = ref({});

onMounted(async () => {
  procedimiento.value = {};
  getDatasTP({ page: 1, size: 100 });
  await getDatasCartera({ page: 1, size: 100 });
  await getDataPC(route.params.idProceso.toString()).then((res) => {
    procedimiento.value = res;
  });
  procedimiento.value.trabajoInfo = procedimiento.value.trabajo
  const proyecto = arrayDataCartera.value.data.find(
    (proyecto: any) =>
      procedimiento.value.trabajoInfo.cartera_proyecto_inversion == proyecto.id
  );
  loading.value = false;
  procedimiento.value.proyecto = proyecto;
});

const selectedTrabajo = computed(() => {
  if (!procedimiento.value || !procedimiento.value.trabajoInfo) return [];
  const trabajoEncontrado = arrayDataTP.value.data.find(
    (t: any) => t.id === procedimiento.value.trabajoInfo.id
  );
  return trabajoEncontrado ? trabajoEncontrado.trabajos_previos : [];
});

const tp = computed(() => {
  // Asegurándonos de que selectedTrabajo.value es un array y ordenándolo por 'consecutivo'
  console.log(selectedTrabajo);
  const sortedItems = selectedTrabajo.value
    ? [...selectedTrabajo.value].sort((a, b) => a.consecutivo - b.consecutivo)
    : [];
  return sortedItems;
});

const getConceptos = () => {
  if (
    !procedimiento.value.trabajoInfo.id ||
    (procedimiento.value.consecutivo_e7 &&
      !procedimiento.value.consecutivo_e7.id)
  )
    return;
  let trabajo_id = procedimiento.value.trabajoInfo.id;
  let conceptosAux: any = [];
  getDatasConceptos({ page: 1, size: 100, trabajo_id })
    .then(() => {
      arrayConceptos.value.data.map((c: any) => {
        if (c.datos && c.datos.length) {
          if (
            c.datos[0].consecutivo ==
            procedimiento.value.consecutivo_e7.consecutivo
          ) {
            conceptosAux.push(...c.datos);
          }
        }
      });
    })
    .finally(() => {
      conceptos.value = conceptosAux;
    });
};

const save = () => {
  asignarE7(
    HTTP_METHODS.PUT,
    { consecutivo_e7: procedimiento.value.consecutivo_e7.id },
    `${procedimiento.value.id}/asignar_e7/`
  ).then(() => {
    showAlertSuccess("Procedimiento relacionado correctamente");
    router.push({ name: "listar-procedimiento-contrataciones" });
  });
};
</script>

<style scoped>
.font-weight-bold {
  font-weight: bold;
}
.small-table {
  max-height: 350px;
  overflow: auto;
}
</style>
