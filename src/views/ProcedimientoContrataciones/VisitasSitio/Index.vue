<template>
    <div v-if="!loading">
        <h4 class="view-name">
            {{ viewName }} {{ procedimiento.folio }}
        </h4>
        <hr class="red" />
        <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
                <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button"
                    role="tab" aria-controls="home" aria-selected="true">
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
                                <ButtonBarComponent @onCreate="handleCreate()" @onCustom="
                                    router.push({ name: 'procedimiento-contrataciones-eventos' })
                                    " showCustomButton customLabel="Regresar" :show-subactions="false" 
                                />
                            </div>
                            <AccionesVisitaSitio v-if="arrayData.data.length > 0"
                                @imprimir="handlePrintFormatoGestion"
                                @reporte="handleReporteGestion"/>
                        </div>
                    </div>
                    <div>
                        <DataTableComponent v-if="!arrayData.loading" rowId="id" :columns="columns" :data="arrayData.data"
                            :pagination="arrayData.pagination" showDelete showEdit
                            :fixed-actions="true" @onPaginate="handlePaginate" @onEdit="handleEdit" @onDelete="handleDelete"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import AccionesVisitaSitio from "@/components/AccionesVisitaSitio.vue"
import DataTableComponent from "@/components/DataTableComponent.vue";
import usePetition from "@/composables/usePetition";
import { useRouter, useRoute } from "vue-router";
import ButtonBarComponent from "@/components/ButtonBarComponent.vue";
import useAlert from "@/composables/useAlert";

const { exportDoc } = usePetition("visita_sitio");
const { exportDoc: exportImprimir } = usePetition("visita_sitio/imprime_formato_gestion");

const router = useRouter();
const route = useRoute();
const { showAlertWarning } = useAlert();

const { arrayData, getDatas } = usePetition("visita_sitio/");
const { getData: getProcedimiento } = usePetition("procedimiento_contratacion/");

// Datos y métodos para la tabla y los filtros
const titleTab = "Visita a sitio";
const viewName = "Registro de empresas para la visita al sitio de los trabajos del procedimiento: "

const procedimiento: any = ref({})
const loading = ref(true)
const columns = [
    { title: "Visita sitio", data: "id", align: "center" },
    { title: "Nombre empresa", data: "nombre_empresa", align: "left" },
    { title: "Representante empresa", data: "representante_empresa", align: "left" },
];
const handleCreate = () => {
    router.push({ name: "crear-visita-sitio", params: { idProceso: route.params.idProceso.toString(), idEvento: route.params.idEvento.toString() } });
};

const handlePrintFormatoGestion = async () => {
    let queryParams = `evento_id=${route.params.idEvento.toString()}`;
    try{
        await exportImprimir('', `Formato_gestión.xlsx`, queryParams);
    }
    catch(error){
        showAlertWarning(error as string)
    }
};

const handleReporteGestion = async () => {
    const id = arrayData.value.data[0].id;
    const urlDoc = `${id}/descarga_formato/`;
    await exportDoc(urlDoc, `Visita_sitio.docx`);
};

const handleEdit = (data: any) => router.push({ name: 'editar-visita-sitio', params: { id: data } })

const handleDelete = (data: any) => router.push({ name: 'eliminar-visita-sitio', params: { id: data } })

const decorateData = () => {
    arrayData.value.data = arrayData.value.data.filter((vs:any) => vs.evento === Number(route.params.idEvento))
    loading.value = false
}

const handlePaginate = (page: number) => {
    loading.value = true
    getDatas({ page })
        .then(() => decorateData())
        .finally(() => loading.value = false)
}

onMounted(async () => {
    getDatas({ page: 1 }).then(() => decorateData())
    getProcedimiento(route.params.idProceso.toString()).then(res => procedimiento.value = res)
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