<template>
    <h4 class="view-name">{{ viewName }}</h4>
    <hr class="red" />
    <div class="container">
        <div class="row app-options-bar">
            <div class="d-flex align-items-center buttons-component align-items-center">
                <div class="col-md-8">
                    <ButtonBarComponent @onCreate="handleCreate" :show-subactions="false" :show-custom-button="true"
                        custom-label="Regresar" @onCustom="handleCancel" />
                </div>
            </div>
        </div>
        <form class="form-inline justify-content-center" role="form">
            <div class="form-check form-check-inline col-md-2 col-sm-6">
                <label class="form-check-label">
                    <input type="radio" name="radio-01" value="1" class="form-check-input" v-model="selectedRadiusInput" />
                    RECURSOS
                </label>
            </div>
            <div class="form-check form-check-inline col-md-2 col-sm-6">
                <label class="form-check-label">
                    <input type="radio" name="radio-01" value="2" class="form-check-input" v-model="selectedRadiusInput" />
                    METAS
                </label>
            </div>
            <div class="form-check form-check-inline col-md-3 col-sm-6">
                <label class="form-check-label">
                    <input type="radio" name="radio-01" value="3" class="form-check-input" v-model="selectedRadiusInput" />
                    COSTOS ANUALES
                </label>
            </div>
            <div class="form-check form-check-inline col-md-3 col-sm-6">
                <label class="form-check-label">
                    <input type="radio" name="radio-01" value="4" class="form-check-input" v-model="selectedRadiusInput" />
                    BENEFICIOS ANUALES
                </label>
            </div>
        </form>
        <div class="container">
            <DataTableComponent v-if="selectedRadiusInput === '1'" rowId="id" :columns="dynamicColumns"
                :data="dataTableDataRecursos" :pagination="paginate" :showDelete="true" :showEdit="true"
                @onEdit="handleEdit" />
            <DataTableComponent v-if="selectedRadiusInput === '2'" rowId="id" :columns="dynamicColumns"
                :data="dataTableDataMeta" :pagination="paginate" :showDelete="true" :showEdit="true" @onEdit="handleEdit" />
            <DataTableComponent v-if="selectedRadiusInput === '3'" rowId="id" :columns="dynamicColumns"
                :data="dataTableDataCostoAnual" :pagination="paginate" :showDelete="true" :showEdit="true"
                @onEdit="handleEdit" />
            <DataTableComponent v-if="selectedRadiusInput === '4'" rowId="id" :columns="dynamicColumns"
                :data="dataTableDataBeneficioAnual" :pagination="paginate" :showDelete="true" :showEdit="true"
                @onEdit="handleEdit" />
        </div>
    </div>
</template>
  

<script setup lang="ts">
import { onMounted, ref, onBeforeUnmount, watch } from "vue";
import { useRouter } from "vue-router";
import DataTableComponent from '@/components/DataTableComponent.vue'
import ButtonBarComponent from '@/components/ButtonBarComponent.vue'



//const route = useRoute();
const router = useRouter();

const viewName = "Calendario Anual Del Proyecto";

const selectedRadiusInput = ref("1")
const paginate = { "page_size": 10, "page": 1, "total": 1, "total_pages": 1, "previous_page": 1, "next_page": 1 }

const handleCancel = () => router.push({ name: "listar-proyecto_de_inversion" });
const handleCreate = () => {
    router.push({
        name: "crear-calendario-anual-proyecto_de_inversion",
        query: { selectedRadius: selectedRadiusInput.value }
    });
};
const handleEdit = (data: any) => {
    router.push({
        name: 'editar-calendario-anual-proyecto_de_inversion',
        params: { id: data },
        query: { selectedRadius: selectedRadiusInput.value }
    })
}

const dynamicColumns = ref([
    { title: "No. Solicitud", data: "id" },
    { title: "Año Base", data: "year" },
    { title: "Origen Recursos", data: "origin" },
    { title: "RECURSOS", data: "recurso" },
]);

const dataTableDataRecursos = ref([
    { id: 1, year: '20/03/2020', origin: 'PRESUPUESTO DE EGRESOS', recurso: '1234124' },
    { id: 2, year: '20/03/2022', origin: 'PRESUPUESTO DE EGRESOS', recurso: '5342345' },
]);
const dataTableDataMeta = ref([
    { id: 1, year: '20/03/2020', origin: 'PRESUPUESTO DE EGRESOS', meta: '048219' },
    { id: 2, year: '20/03/2022', origin: 'PRESUPUESTO DE EGRESOS', meta: '978543' },
]);
const dataTableDataCostoAnual = ref([
    { id: 1, year: '20/03/2020', origin: 'PRESUPUESTO DE EGRESOS', costo_anual: '3248753' },
    { id: 2, year: '20/03/2022', origin: 'PRESUPUESTO DE EGRESOS', costo_anual: '5432345' },
]);
const dataTableDataBeneficioAnual = ref([
    { id: 1, year: '20/03/2020', origin: 'PRESUPUESTO DE EGRESOS', beneficio_anual: '234523' },
    { id: 2, year: '20/03/2022', origin: 'PRESUPUESTO DE EGRESOS', beneficio_anual: '356346' },
]);

watch(selectedRadiusInput, (newValue) => {
    switch (newValue) {
        case "1":
            dynamicColumns.value[3].title = "RECURSOS";
            dynamicColumns.value[3].data = "recurso";
            break;
        case "2":
            dynamicColumns.value[3].title = "META";
            dynamicColumns.value[3].data = "meta";
            break;
        case "3":
            dynamicColumns.value[3].title = "COSTO ANUAL";
            dynamicColumns.value[3].data = "costo_anual";
            break;
        case "4":
            dynamicColumns.value[3].title = "BENEFICIO ANUAL";
            dynamicColumns.value[3].data = "beneficio_anual";
            break;
    }
});
onMounted(async () => { });
onBeforeUnmount(() => { });
</script>
