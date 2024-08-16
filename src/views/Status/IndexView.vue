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
            <DataTableComponent v-if="!status.loading" rowId="clave" :columns="columns" :data="status.data"
                :pagination="status.pagination" showDelete showEdit
                @onPaginate="handlePaginate" @onEdit="handleEdit" @onDelete="handleDelete" @onCreate="handleCreate" />
        </div>
    </Transition>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useStatus } from '@/composables/useStatus'
import DataTableComponent from '@/components/DataTableComponent.vue'
import router from '@/router'
import SearchComponent from '@/components/SearchComponent.vue'
import ButtonBarComponent from '@/components/ButtonBarComponent.vue'

const viewName = 'Estatus de Proyecto'
const { status, getStatus, searchStatus } = useStatus()
const searchText = ref<string>('') 
const showView = ref(false)
const handleCreate = () => router.push({ name: 'crear-estatus-proyecto' })
const handleEdit = (data: any) => router.push({ name: 'editar-estatus-proyecto', params: { id: data } })
const handleDelete = (data: any) => router.push({ name: 'eliminar-estatus-proyecto', params: { id: data } })

const handlePaginate = (page: number) => {
    if (searchText.value) {
        searchStatus(searchText.value, page)
    } else {
        getStatus({ page })
    }
}

const handleSearch = (term: any) => {
    searchText.value = term
    searchStatus(term, 1)
}

const columns = [
    { title: 'ID', data: 'id', align: 'center' },
    { title: 'Clave', data: 'clave', align: 'center' },
    { title: 'Descripción', data: 'descripcion', align: 'left' },
    { title: 'Fecha', data: 'fecha', align: 'left' },
    { title: 'Proceso', data: 'fk_proceso', align: 'left' }
]

onMounted(() => {
    getStatus({ page: 1 }).then(() => showView.value = true)
})
</script>
<style lang="scss" scoped></style>