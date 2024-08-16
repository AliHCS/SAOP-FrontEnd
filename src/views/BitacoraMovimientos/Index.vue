<template>
    <div id="app">
        <DatatableComponent
            :columns="columns"
            :data="data"
            :pagination="pagination"
            :rowId="rowId"
            :showEdit="showEdit"
            :showDelete="showDelete"
            :showDetail="showDetail"
            :showSubGroup="showSubGroup"
        />
    </div>
</template>
<script setup lang="ts">
import DatatableComponent from '@/components/DataTableComponent.vue';

const columns = [
    { title: 'ID', data: 'id' },
    { title: 'Nombre', data: 'name' },
    { title: 'Edad', data: 'age' },
];
const data = [
    { id: 1, name: 'Juan', age: 25 },
    { id: 2, name: 'Pedro', age: 30 },
    { id: 3, name: 'María', age: 20 },
];
const pagination = {
    total: 3,
    page: 1,
    total_pages: 1,
    previous_page: 1,
    next_page: 1,
};
const rowId = 'id';
const showEdit = true;
const showDelete = true;
const showDetail = true;
const showSubGroup = true;
</script>
