<template>
    <Transition name="view">
        <div v-if="showView">
            <h4 class="view-name">{{ viewName }}</h4>
            <hr class="red">
            <div class="row app-options-bar">
                <div class="col buttons-component">
                    <ButtonBarComponent @onCreate="handleCreate" :showSubactions="false"/>
                </div>
                <div class="col search-component">
                    <SearchComponent @onSearch="handleSearch" />
                </div>
            </div>
            <DataTableComponent v-if="!federalEntities.loading" rowId="clave" :columns="columns" :data="federalEntities.data"
                :pagination="federalEntities.pagination" showDelete showEdit
                @onPaginate="handlePaginate" @onEdit="handleEdit" @onDelete="handleDelete" @onCreate="handleCreate" />
        </div>
    </Transition>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useFederalEntities } from '@/composables/useFederalEntities'
import DataTableComponent from '@/components/DataTableComponent.vue'
import router from '@/router'
import SearchComponent from '@/components/SearchComponent.vue'
import ButtonBarComponent from '@/components/ButtonBarComponent.vue'

const viewName = 'Entidades Federativas'
const { federalEntities, getFederalEntities, searchFederalEntities } = useFederalEntities()
const searchText = ref<string>('') 
const showView = ref(false)
const handleCreate = () => router.push({ name: 'crear-entidad-federativa' })
const handleEdit = (data: any) => router.push({ name: 'editar-entidad-federativa', params: { id: data } })
const handleDelete = (data: any) => router.push({ name: 'eliminar-entidad-federativa', params: { id: data } })

const handlePaginate = (page: number) => {
    if (searchText.value) {
        searchFederalEntities(searchText.value, page)
    } else {
        getFederalEntities({ page })
    }
}

const handleSearch = (term: any) => {
    searchText.value = term
    searchFederalEntities(term, 1)
}

const columns = [
    { title: 'Clave', data: 'clave', align: 'center' },
    { title: 'Descripción', data: 'descripcion', align: 'left' },
    { title: 'Descripción corta', data: 'descripcion_corta', align: 'left' },
    { title: 'Descripción capital', data: 'descripcion_capital', align: 'left' },
    { title: 'Región', data: 'region', align: 'left' },
    { title: 'Meso región', data: 'meso_region', align: 'left' },
    { title: 'País', data: 'nombre_pais', align: 'left' },
]

onMounted(() => {
    getFederalEntities({ page: 1 }).then(() => {
        showView.value = true
    })
})
</script>
<style lang="scss" scoped></style>