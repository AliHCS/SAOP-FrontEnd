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
            <DataTableComponent v-if="!levelsByArea.loading" rowId="clave" :columns="columns" :data="levelsByArea.data"
                :pagination="levelsByArea.pagination" showDelete showEdit
                @onPaginate="handlePaginate" @onEdit="handleEdit" @onDelete="handleDelete" @onCreate="handleCreate" />
        </div>
    </Transition>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useLevelsByArea } from '@/composables/useLevelsByArea'
import DataTableComponent from '@/components/DataTableComponent.vue'
import router from '@/router'
import SearchComponent from '@/components/SearchComponent.vue'
import ButtonBarComponent from '@/components/ButtonBarComponent.vue'

const viewName = 'Niveles por Area'
const { levelsByArea, getLevelsByArea, searchLevelsByArea } = useLevelsByArea()
const searchText = ref<string>('')
const showView = ref(false)
const handleCreate = () => router.push({ name: 'crear-nivel-area' })
const handleEdit = (data: any) => router.push({ name: 'editar-nivel-area', params: { id: data } })
const handleDelete = (data: any) => router.push({ name: 'eliminar-nivel-area', params: { id: data } })

const handlePaginate = (page: number) => {
    if (searchText.value) {
        searchLevelsByArea(searchText.value, page)
    } else {
        getLevelsByArea({ page })
    }
}

const handleSearch = (term: any) => {
    searchText.value = term
    searchLevelsByArea(term, 1)
}

const columns = [
    { title: 'Clave', data: 'clave', align: 'center' },
    { title: 'Nombre', data: 'nombre', align: 'left' },
]

onMounted(() => {
  getLevelsByArea({ page: 1 }).then(() => showView.value = true)
})
</script>
<style lang="scss" scoped></style>