<template>
    <Transition name="view">
        <div v-if="showView">
            <h4 class="view-name">{{ viewName }}</h4>
            <hr class="red">
            <div class="row app-options-bar">
                <div class="col buttons-component">
                    <ButtonBarComponent @onCreate="handleCreate" :showSubactions="false" />
                </div>
                <div class="col search-component">
                    <SearchComponent @onSearch="handleSearch" />
                </div>
            </div>
            <DataTableComponent v-if="!arrayData.loading" rowId="clave" :columns="columns" :data="arrayData.data"
                :pagination="arrayData.pagination" showDelete showEdit fixedActions @onPaginate="handlePaginate"
                @onEdit="handleEdit" @onDelete="handleDelete" @onCreate="handleCreate" />
        </div>
    </Transition>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import usePetition from "@/composables/usePetition";
import DataTableComponent from '@/components/DataTableComponent.vue'
import router from '@/router'
import SearchComponent from '@/components/SearchComponent.vue'
import ButtonBarComponent from '@/components/ButtonBarComponent.vue'

const viewName = 'Municipios'
const { arrayData, getDatas, searchData } = usePetition("cat_municipio/");
const searchText = ref<string>('')
const showView = ref(false)
const handleCreate = () => router.push({ name: 'crear-municipio' })
const handleEdit = (data: any) => router.push({ name: 'editar-municipio', params: { id: data } })
const handleDelete = (data: any) => router.push({ name: 'eliminar-municipio', params: { id: data } })

const { arrayData: arrayDataPais, getDatas: getDatasPais } = usePetition("cat_pais/");
const { arrayData: arrayDataEF, getDatas: getDatasEF } = usePetition("cat_entidad_federativa/");

const handlePaginate = (page: number) => {
    showView.value = false
    if (searchText.value) {
        searchData({ search: searchText.value, page })
        .then((response) => decorateData(response))
        .finally(() => showView.value = true)
    } else {
        getDatas({ page })
        .then((response) => decorateData(response))
        .finally(() => showView.value = true)
    }
}

const handleSearch = (term: any) => {
    searchText.value = term
    searchData({ search: term, page: 1 })
}

const columns = [
    { title: 'Clave', data: 'clave', align: 'center' },
    { title: 'Descripción', data: 'descripcion', align: 'left' },
    { title: 'Descripción corta', data: 'descripcion_corta', align: 'left' },
    { title: 'Entidad federativa', data: 'ef_desc', align: 'left' },
    { title: 'País', data: 'pais_desc', align: 'left' },

]

const decorateData = (data: Array<any>) => {
    data.forEach((item: any) => {
        item.pais_desc = arrayDataPais.value.data.find((el: any) => el.id == item.pais)?.nombre_oficial
        item.ef_desc = arrayDataEF.value.data.find((el: any) => el.clave == item.entidad_federativa)?.descripcion
    })
}

onMounted(async () => {
    await Promise.all([
        getDatasPais({ page: 1, size: 100 }),
        getDatasEF({ page: 1, size: 100 })
    ]);
    getDatas({ page: 1 }).then((response) => {
        decorateData(response)
        showView.value = true
    })
})
</script>
<style lang="scss" scoped></style>