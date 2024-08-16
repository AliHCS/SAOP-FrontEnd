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
            <DataTableComponent v-if="!arrayData.loading" rowId="clave" :columns="columns" :data="arrayData.data"
                :pagination="arrayData.pagination" showDelete showEdit fixedActions
                @onPaginate="handlePaginate" @onEdit="handleEdit" @onDelete="handleDelete" @onCreate="handleCreate" />
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

const viewName = 'Unidad de medida'
const { arrayData, getDatas, searchData } = usePetition("cat_unidad_medida/");
const searchText = ref<string>('')
const showView = ref(false)
const handleCreate = () => router.push({ name: 'crear-unidad-medida' })
const handleEdit = (data: any) => router.push({ name: 'editar-unidad-medida', params: { id: data } })
const handleDelete = (data: any) => router.push({ name: 'eliminar-unidad-medida', params: { id: data } })

const handlePaginate = (page: number) => {
    if (searchText.value) {
        searchData({search: searchText.value, page})
    } else {
        getDatas({ page })
    }
}

const handleSearch = (term: any) => {
    searchText.value = term
    searchData({search: term, page: 1})
}

const columns = [
    { title: 'Clave', data: 'clave', align: 'center' },
    { title: 'Descripción', data: 'descripcion', align: 'left' },
    { title: 'Unidad', data: 'unidad', align: 'left' },
]

onMounted(() => {
  getDatas({ page: 1 }).then(() => showView.value = true)
})
</script>
<style lang="scss" scoped></style>