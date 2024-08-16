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
            <DataTableComponent v-if="!priorities.loading" rowId="clave" :columns="columns" :data="priorities.data"
                :pagination="priorities.pagination" showDelete showEdit
                @onPaginate="handlePaginate" @onEdit="handleEdit" @onDelete="handleDelete" @onCreate="handleCreate" />
        </div>
    </Transition>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { usePriorities } from '@/composables/usePriorities'
import DataTableComponent from '@/components/DataTableComponent.vue'
import router from '@/router'
import SearchComponent from '@/components/SearchComponent.vue'
import ButtonBarComponent from '@/components/ButtonBarComponent.vue'

const viewName = 'Prioridad'
const { priorities, getPriorities, searchPriorities } = usePriorities()
const searchText = ref<string>('') 
const showView = ref(false)
const handleCreate = () => router.push({ name: 'crear-prioridad' })
const handleEdit = (data: any) => router.push({ name: 'editar-prioridad', params: { id: data } })
const handleDelete = (data: any) => router.push({ name: 'eliminar-prioridad', params: { id: data } })

const handlePaginate = (page: number) => {
    if (searchText.value) {
        searchPriorities(searchText.value, page)
    } else {
        getPriorities({ page })
    }
}

const handleSearch = (term: any) => {
    searchText.value = term
    searchPriorities(term, 1)
}

const columns = [
    { title: 'Clave', data: 'clave', align: 'center' },
    { title: 'Descripción', data: 'descripcion', align: 'left' },
    { title: 'Presidencial', data: 'presidencial', align: 'left' },
    { title: 'Tipo', data: 'tipo_prioridad', align: 'left' },
    { title: 'Normal', data: 'normal', align: 'left' },
    { title: 'Fecha', data: 'fecha_prioridad', align: 'left' }
]

onMounted(() => {
    getPriorities({ page: 1 }).then(() => showView.value = true)
})
</script>
<style lang="scss" scoped></style>