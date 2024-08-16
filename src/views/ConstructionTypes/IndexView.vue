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
            <DataTableComponent v-if="!constructionTypes.loading" rowId="clave" :columns="columns" :data="constructionTypes.data"
                :pagination="constructionTypes.pagination" showDelete showEdit
                @onPaginate="handlePaginate" @onEdit="handleEdit" @onDelete="handleDelete" @onCreate="handleCreate" />
        </div>
    </Transition>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useConstructionTypes } from '@/composables/useConstructionTypes'
import DataTableComponent from '@/components/DataTableComponent.vue'
import router from '@/router'
import SearchComponent from '@/components/SearchComponent.vue'
import ButtonBarComponent from '@/components/ButtonBarComponent.vue'

const viewName = 'Tipos de obra'
const { constructionTypes, getConstructionTypes, searchConstructionTypes } = useConstructionTypes()
const searchText = ref<string>('')
const showView = ref(false)
const handleCreate = () => router.push({ name: 'crear-tipo-obra' })
const handleEdit = (data: any) => router.push({ name: 'editar-tipo-obra', params: { id: data } })
const handleDelete = (data: any) => router.push({ name: 'eliminar-tipo-obra', params: { id: data } })

const handlePaginate = (page: number) => {
    if (searchText.value) {
        searchConstructionTypes(searchText.value, page)
    } else {
        getConstructionTypes({ page })
    }
}

const handleSearch = (term: any) => {
    searchText.value = term
    searchConstructionTypes(term, 1)
}

const columns = [
    { title: 'Clave', data: 'clave', align: 'center' },
    { title: 'Descripción', data: 'descripcion', align: 'left' },
]

onMounted(() => {
  getConstructionTypes({ page: 1 }).then(() => showView.value = true)
})
</script>
<style lang="scss" scoped></style>