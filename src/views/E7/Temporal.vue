<template>
  <h4 class="view-name">{{ viewName }}</h4>
  <hr class="red" />
  <div class="row app-options-bar">
    <div class="col search-component">
      <SearchComponent @onSearch="handleSearch" />
    </div>
  </div>

  <div class="table-responsive">
    <table class="table table-responsive">
      <thead class="table-gob">
        <tr>
          <th
            v-for="col in columnsE7"
            :key="col.data"
            class="text-center header-cell"
          >
            {{ col.title }}
          </th>
          <!--       <th class="text-center header-cell">Acciones</th> -->
        </tr>
      </thead>

      <tbody>
        <tr v-for="data in pagination.data" :key="data.id">
          <template v-for="col in columnsE7" :key="col.data">
            <td class="table-important">
              <template v-if="!bandera">
                <div v-for="(dato, index) in data.datos" :key="index">
                  <input
                    v-if="col.data === 'trabajo'"
                    class="form-control"
                    type="text"
                    :value="trabajoModel(data[col.data])"
                    @copy="$event.preventDefault()"
                    @paste="$event.preventDefault()"
                    @cut="$event.preventDefault()"
                    disabled
                  />
                  <input
                    v-if="col.data === 'temporal'"
                    class="form-control"
                    type="text"
                    maxlength="15"
                    :disabled="col.data === 'temporal'"
                    v-model="data['id']"
                    @copy="$event.preventDefault()"
                    @paste="$event.preventDefault()"
                    @cut="$event.preventDefault()"
                  />
                  <input
                    v-if="!excludedSelectData.includes(col.data)"
                    class="form-control"
                    type="text"
                    maxlength="15"
                    :disabled="disabledData.includes(col.data)"
                    v-model="dato[col.data]"
                    @copy="$event.preventDefault()"
                    @paste="$event.preventDefault()"
                    @cut="$event.preventDefault()"
                  />
                  <textarea
                    v-if="col.data === 'descripcion'"
                    v-model="dato[col.data]"
                    class="form-control input-like"
                    maxlength="15"
                    @copy="$event.preventDefault()"
                    @paste="$event.preventDefault()"
                    @cut="$event.preventDefault()"
                    disabled
                    style="white-space: pre-wrap !important"
                  ></textarea>
                </div>
              </template>
            </td>
          </template>
          <!-- <td class="text-center table-important">
            <button
              v-if="data.trabajo !== null"
              class="btn btn-primary btn-sm mr-2 mt-2 mb-2"
              data-placement="top"
              title="Desasociar"
              @click="desAsociar(data.id)"
            >
              <i class="bi bi-check-circle-fill"></i>
            </button>
            <button
              v-else
              class="btn btn-primary btn-sm mr-2 mt-2 mb-2"
              data-placement="top"
              title="Asociar"
              @click="asociar(data.id)"
              :disabled="trabajoSelected === ''"
            >
              <i class="bi bi-check-circle"></i>
            </button>
          </td> -->
        </tr>
      </tbody>
    </table>
    <div class="d-flex flex-row">
      <PaginationTable
        :pagination="pagination"
        @onPaginate="handlePaginate"
        style="margin-top: auto; margin-bottom: auto"
        class="mr-auto ml-auto"
      />
      <div class="form-group mr-5">
        <label class="control-label" for="select-itemes"
          >Elementos por página</label
        >
        <select
          v-model="itemsPerPage"
          @change="updatePagination"
          style="
            width: 100px;
            margin-left: auto;
            margin-right: auto;
            margin-top: auto;
            margin-bottom: auto;
          "
          class="form-select form-control"
          id="select-itemes"
          name="select-itemes"
        >
          <option :value="7">7</option>
          <option :value="10">10</option>
          <option :value="15">15</option>
          <option :value="20">20</option>
          <option :value="25">25</option>
          <option :value="50">50</option>
          <option :value="100">100</option>
          <option :value="1000">Todos</option>
        </select>
      </div>
    </div>
    <!--BOTONES-->
    <div>
      <!--  <button class="btn btn-primary pull-right">Aprobar</button> -->
      <button class="btn btn-danger pull-right mr-2" @click="handleReturn">
        Regresar
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, watch } from "vue";
import PaginationTable from "@/components/TableInputs/Pagination.vue";
import SearchComponent from "@/components/SearchComponent.vue";
import usePetition from "@/composables/usePetition";
/* import useAlert from "@/composables/useAlert"; */
import router from "@/router";
import { useConceptosTemporalStore } from "@/store/conceptoTemporalStore";

const { arrayData, searchData } = usePetition("conceptos_trabajos/");

const viewName = "Temporal E7";
const itemsPerPage = ref(7);
const inicio = ref(0);
const bandera = ref<boolean>(true);
const datos = ref([]);
/* const trabajoSelected = ref<string>(""); */
const searchTerm = ref("");
const excludedSelectData = ["descripcion", "trabajo", "temporal"];
const disabledData = [
  "temporal",
  "descripcion",
  "trabajo",
  "partida",
  "unidad_de_medida",
  "norma",
];
/* const { showAlertSuccess, showAlertError } = useAlert(); */
const conceptosStore = useConceptosTemporalStore();

const columnsE7 = [
  { data: "temporal", title: "Temporal " },
  { data: "trabajo", title: "Trabajo" },
  { data: "partida", title: "Partida" },
  { data: "norma", title: "Norma" },
  { data: "descripcion", title: "Descripción" },
  { data: "unidad_de_medida", title: "Unidad de Medida" },
  { data: "cantidad", title: "Cantidad" },
  { data: "precio", title: "Precio" },
  { data: "importe", title: "Importe" },
];
const getPaginatedData = (data: any[]) => {
  const fin = Number(inicio.value) + Number(itemsPerPage.value);
  return data.slice(inicio.value, fin);
};
const pagination = computed(() => {
  const data = arrayData.value.data;
  const paginatedData = getPaginatedData(data);
  const totalPages = Math.ceil(data.length / itemsPerPage.value);
  const currentPage = Math.floor(inicio.value / itemsPerPage.value) + 1;
  return {
    page_size: itemsPerPage.value,
    page: currentPage,
    total: datos.value.length,
    total_pages: totalPages,
    previous_page: Math.max(currentPage - 1, 1),
    next_page: Math.min(currentPage + 1, totalPages),
    data: paginatedData,
  };
});

const handlePaginate = (page: number) => {
  inicio.value = (page - 1) * Number(itemsPerPage.value);
};

const updatePagination = () => {
  inicio.value = 0;
};

/* const ejecutarAccion = async (
  id: number,
  accion: "asociar" | "desasociar",
  body: object | null = null
) => {
  const endpoint =
    accion === "asociar" ? "asociar_temporalmente" : "desasociar_trabajo";

  try {
    const token = localStorage.getItem("token");
    const headers: HeadersInit = {
      Authorization: `Bearer ${token}`,
    };
    if (body) {
      headers["Content-Type"] = "application/json";
    }
    const response = await fetch(
      `${import.meta.env.VITE_API}conceptos_trabajos/${id}/${endpoint}/`,
      {
        method: "POST",
        headers: headers,
        body: body ? JSON.stringify(body) : null,
      }
    );
    if (!response) return;

    if (response.status !== 200) {
      const json = await response.json();
      showAlertError(`${json.trabajo}`, 3000);
    } else {
      showAlertSuccess(
        `¡Éxito! ${
          accion === "asociar"
            ? "La asociacion ha sido correcta."
            : "se ha desasociado correctamente."
        } `
      );
      await getDatas({ page: 1 });
      trabajoSelected.value = "";
    }
  } catch (error) {
    console.log(error);
    showAlertError(`${error}`, 3000);
  }
};

const asociar = async (id: number) => {
  await ejecutarAccion(id, "asociar", { trabajo: trabajoSelected.value });
};

const desAsociar = async (id: number) => {
  await ejecutarAccion(id, "desasociar");
}; */

const trabajoModel = (trabajo: any) => {
  return trabajo !== null ? trabajo.id : "No Asociado";
};

const handleSearch = async (term: any) => {
  searchTerm.value = term;
  await searchData({
    page: 1,
    id: searchTerm.value,
    trabajo_isnull: true,
  });
  /* conceptosStore.setTrabajos(arrayData.value.data); */
  conceptosStore.setTrabajos(pagination.value.data);
  // console.log("ConceptosStore search: ", conceptosStore.getConceptos);
};

const handleReturn = () => {
  conceptosStore.setDatosConceptoTemporal(pagination.value.data);
  router.push({ name: "listar-E7" });
};
watch(itemsPerPage, updatePagination);

onMounted(async () => {
  /* await getDatas({ page: 1 }); */
  await searchData({ page: 1, trabajo_isnull: true, page_size: 100 });
  datos.value = arrayData.value.data
    .map((item: any) => item.datos)
    .filter(Boolean);

  /* conceptosStore.setTrabajos(arrayData.value.data); */
  conceptosStore.setTrabajos(pagination.value.data);
  // console.log("ConceptosStore: ", conceptosStore.getConceptos);
  bandera.value = false;
  /* const searchDataResponse = await searchData({ page: 1, search: "conceptos" });
  if (searchDataResponse) {
    jsonSearchData.value = searchDataResponse.flatMap(
      (obj: any) => obj.json_contenido || []
    );
  } else {
    jsonSearchData.value = [];
  } */
});
</script>

<style lang="scss" scoped>
.table-gob {
  background-color: #691c32;
  color: #fff;
}

.table-important {
  background-color: #c0c0c0;
  color: #000;
  font-weight: bold;
  padding: 5px;
}

.form-control {
  width: 200px;
  text-align: center;
  white-space: wrap !important;
  /* Evitar que el texto se divida en varias líneas */
  overflow: hidden;
}

.header-cell {
  max-width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.input-like {
  resize: vertical;
  /* Usuario pueda cambiar el tamaño del textarea */
  border: 1px solid #ced4da;
  /* Establece un borde similar al de un input */
  border-radius: 4px;
  /* Aplica esquinas redondeadas */
  padding: 6px 12px;
  /* Espacio interno similar al de un input */
  line-height: 1.5;
  /* Alinea el texto verticalmente */
  font-size: 18px;
  /* Tamaño de fuente similar al de un input */
  height: 40px;
  /* Establece la altura deseada */
}
</style>
