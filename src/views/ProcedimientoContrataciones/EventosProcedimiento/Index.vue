<template>
  <h4 class="view-name">
    {{ viewName }}
  </h4>
  <hr class="red" />
  <ul class="nav nav-tabs" id="myTab">
    <li class="nav-item">
      <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab"
        aria-controls="home" aria-selected="true">
        {{ titleTab }}
      </button>
    </li>
  </ul>
  <div class="tab-content mt-4" id="myTabContent">
    <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
      <div>
        <div class="row app-options-bar">
          <div class="d-flex align-items-center buttons-component align-items-center">
            <div class="col-md-8">
              <button class="dt-button btn btn-secondary btn-cancelar" type="button" @click="
      router.push({ name: 'listar-procedimiento-contrataciones' })
      ">
                <b>Regresar</b>
              </button>
            </div>
            <ButtonsAccionesEventos v-if="evento.id" @visitaSitio="handleVisitaSitio" />
          </div>
        </div>

        <DataTableComponent v-if="!arrayEventos.loading" rowId="id" prefix="pc" :columns="columns"
          :data="arrayEventos.data" :pagination="arrayEventos.pagination" showEdit :row-select="false"
          :fixed-actions="true" @onPaginate="handleEventos" @onGetID="handleRowClick" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import ButtonsAccionesEventos from "@/components/EventosProcedimiento/ButtonsAccionesEventos.vue"
// import usePetition from "@/composables/usePetition";
// import useAlert from "@/composables/useAlert";
// import { HTTP_METHODS } from "@/utils/constants/methodsPetitions";

// const { showAlertSuccess } = useAlert();
import usePetition from "@/composables/usePetition";
import { useRouter, useRoute } from "vue-router";
import DataTableComponent from "@/components/DataTableComponent.vue"

const route = useRoute();
const router = useRouter();

const titleTab = "Datos generales";
const viewName = "Eventos del procedimiento"

const { getDatas: getDataEventos, arrayData: arrayEventos } = usePetition(
  "evento/"
);

const evento: any = ref({})

const columns = [
  { title: "Tipo", data: "tipo", align: "left" },
  { title: "Lugar programado", data: "lugar_programado", align: "left" },
  { title: "Lugar real", data: "lugar_evento", align: "left" },
  { title: "Observaciones", data: "observaciones", align: "left" }
];

const handleEventos = async () => {
  await getDataEventos({ page: 1, procedimiento: route.params.idProceso.toString() })
}

const handleVisitaSitio = () => {
  router.push({
    name: "listar-visitas-sitio",
    params: { idProceso: route.params.idProceso.toString(), idEvento: evento.value.id },
  });
};

const handleRowClick = (rowData: any) => {
  evento.value = rowData
};

onMounted(async () => {
  await handleEventos()
});

</script>

<style scoped>
.font-weight-bold {
  font-weight: bold;
}

.small-table {
  max-height: 350px;
  overflow: auto;
}

.bar-events {
  flex-direction: row-reverse;
}
</style>