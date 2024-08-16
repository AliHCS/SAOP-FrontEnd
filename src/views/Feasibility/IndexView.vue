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
            <DataTableComponent v-if="!feasibility.loading" rowId="clave" :columns="columns" :data="feasibility.data"
                :pagination="feasibility.pagination" showDelete showEdit
                @onPaginate="handlePaginate" @onEdit="handleEdit" @onDelete="handleDelete" @onCreate="handleCreate" />
        </div>
    </Transition>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useFeasibility } from '@/composables/useFeasibility'
import DataTableComponent from '@/components/DataTableComponent.vue'
import router from '@/router'
import SearchComponent from '@/components/SearchComponent.vue'
import ButtonBarComponent from '@/components/ButtonBarComponent.vue'

const viewName = 'Factibilidad de Obra'
const { feasibility, getFeasibilities, searchFeasibilities } = useFeasibility()
const searchText = ref<string>('') 
const showView = ref(false)
const handleCreate = () => router.push({ name: 'crear-factibilidad-obra' })
const handleEdit = (data: any) => router.push({ name: 'editar-factibilidad-obra', params: { id: data } })
const handleDelete = (data: any) => router.push({ name: 'eliminar-factibilidad-obra', params: { id: data } })

const handlePaginate = (page: number) => {
    if (searchText.value) {
        searchFeasibilities(searchText.value, page)
    } else {
        getFeasibilities({ page })
    }
}

const handleSearch = (term: any) => {
    searchText.value = term
    searchFeasibilities(term, 1)
}

const columns = [
    { title: 'ID', data: 'id', align: 'center' },
    { title: 'Clave', data: 'clave', align: 'center' },
    { title: 'Descripción', data: 'descripcion', align: 'left' },
]

onMounted(() => {
    getFeasibilities({ page: 1 }).then(() => showView.value = true)
})
</script>
<style lang="scss" scoped></style>