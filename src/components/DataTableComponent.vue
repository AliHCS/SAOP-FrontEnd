<template>
  <div id="data-table-component" :class="prefix">
    <DataTable class="table table-hover table-bordered" :options="OPTIONS">
      <thead>
        <tr>
          <th v-for="col in columns" class="text-center">{{ col.title }}</th>
          <th v-if="!hideActions" class="text-center action-header" :class="{ 'fixed-actions-colum': fixedActions }">
            Acciones
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="value in data" :key="value[rowId]" @click="selectRow(value)"
          :id="`row-${prefix || ''}${value[rowId]}`" :class="{ pointer: rowSelect }">
          <td v-for="col in columns" class="text-left truncate_text" :class="(checkField(value[col.data]),
            col.title.includes('Descripción') ? 'truncate_text' : '')
            " v-html="render(value[col.data])"></td>
          <td v-if="!hideActions" class="text-center action_items" :class="{ 'fixed-actions-colum': fixedActions }">
            <button v-if="showEdit" class="btn btn-primary btn-sm active mr-2 mt-2 mb-2" data-placement="top"
              title="Editar" @click="emit('onEdit', value[rowId])">
              <i class="bi bi-pencil"></i>
            </button>
            <button v-if="showDelete" class="btn btn-primary btn-sm active mr-2 mt-2 mb-2" data-placement="top"
              title="Eliminar" @click="emit('onDelete', value[rowId])">
              <i class="bi bi-trash"></i>
            </button>
            <button v-if="showDetail" class="btn btn-primary btn-sm active mt-2 mb-2" data-placement="top" title="Ver"
              @click="emit('onDetail', value[rowId])">
              <i class="bi bi-search"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </DataTable>
    <slot name="footerData" />
    <nav aria-label="Page navigation" class="text-center" v-if="
      pagination.total > 0 && pagination.total_pages > 0 && !hidePagination
    ">
      <div>
        Total de registros activos: <b>{{ pagination.total }}</b>
      </div>
      <div>
        Página <b>{{ pagination.page }}</b> de
        <b>{{ pagination.total_pages }}</b>
      </div>
      <ul class="pagination">
        <li class="page-item" :class="{ disabled: pagination.total_pages <= 1 }">
          <a class="page-link" href="#" @click.prevent @click="handlePage(pagination.previous_page)">Anterior</a>
        </li>
        <li class="page-item" v-for="(item, index) in pagination.total_pages" v-show="showPaginationNumbers(item)"
          :class="{
            active: hasActiveClass(item),
            disabled:
              pagination.total_pages > PAGINATION_MAX_PAGES &&
              item === PAGINATION_DOTS,
          }" :key="index" @click.prevent @click="handlePage(item)">
          <a :disabled="true" class="page-link" href="#">{{
            pagination.total_pages > PAGINATION_MAX_PAGES &&
              item === PAGINATION_DOTS
              ? "..."
              : item
          }}</a>
        </li>
        <li class="page-item" :class="{ disabled: pagination.total_pages <= 1 }">
          <a class="page-link" href="#" @click.prevent @click="handlePage(pagination.next_page)">Siguiente</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import DataTable from "datatables.net-vue3";
import DataTablesCore from "datatables.net-bs4";
import { DEFAULT_OPTIONS } from "@/utils/constants/datatable";
import { render } from "@/utils/helpers/renderHelper";
import {
  PAGINATION_MAX_PAGES,
  PAGINATION_OFFSET,
  PAGINATION_DOTS,
} from "@/utils/constants/pagination";
import { IDatatable } from "@/utils/models/dataTableModel";

DataTable.use(DataTablesCore);

const props = defineProps<IDatatable & { hideActions?: boolean }>();

const emit = defineEmits([
  "onEdit",
  "onDelete",
  "onCreate",
  "onDetail",
  "onPaginate",
  "onSubGroup",
  "onGetID",
]);
const handlePage = (page: any) => emit("onPaginate", page);

const selectedRow = ref<string | null>("");

const selectRow = (row: any) => {
  let selectedRowId = row[props.rowId];
  if (selectedRow.value === selectedRowId) {
    selectedRow.value = null; // Deselect if the same row is clicked again
  } else {
    selectedRow.value = selectedRowId;
  }

  const selected = props.prefix
    ? document.querySelector(`.${props.prefix} .selectedRow`)
    : document.querySelector(".selectedRow");
  if (selected) {
    selected.classList.remove("selectedRow");
  }

  // Obtener la fila correspondiente
  const rowHtml = document.querySelector(
    `#row-${props.prefix || ""}${selectedRowId}`
  );
  if (rowHtml) {
    // Agregar o quitar la clase según sea necesario
    if (selectedRow.value === selectedRowId) {
      rowHtml.classList.add("selectedRow");
    } else {
      rowHtml.classList.remove("selectedRow");
    }
  }
  emit("onGetID", row);
};

const hasActiveClass = (item: number) => {
  if (props.pagination.total_pages > PAGINATION_MAX_PAGES) {
    return (
      props.pagination.total_pages > PAGINATION_MAX_PAGES &&
      props.pagination.page === item &&
      item !== PAGINATION_DOTS
    );
  }
  return props.pagination.page === item;
};

const showPaginationNumbers = (item: any) => {
  let response = true;
  if (props.pagination.total_pages > PAGINATION_MAX_PAGES) {
    if (
      item > PAGINATION_DOTS &&
      item <= props.pagination.total_pages - PAGINATION_OFFSET
    ) {
      response = false;
    }
  }
  return response;
};

const OPTIONS = ref<any>({ ...DEFAULT_OPTIONS, searching: true });

OPTIONS.value.columnDefs = [
  {
    targets: [
      props.hideActions ? props.columns.length - 1 : props.columns.length,
    ],
    orderable: false,
  },
];
const checkField = (data: any) => {
  const type = typeof data;
  let response;
  switch (type) {
    case "boolean":
      response = "text-center";
      break;
    case "number":
      response = "text-center";
      break;
    case "string":
      response = "text-left";
      break;
    default:
      response = "text-left";
      break;
  }
  return response;
};
</script>

<style lang="scss" scoped>
div.dataTables_wrapper div.dataTables_paginate,
.dataTables_info,
.dataTables_paginate .paging_simple_numbers,
#table_paginate {
  text-align: center;
}

.page-item.active .page-link,
.pagination>.active>a,
.pagination>.active>a:focus,
.pagination>.active>a:hover,
.pagination>.active>span,
.pagination>.active>span:focus,
.pagination>.active>span:hover {
  background-color: #691c32;
  border-color: #691c32;
}

#data-table-component {
  overflow-x: auto;
}

.action_items {
  display: flex !important;
  align-items: center;
  justify-content: center;
}

.action-header {
  max-width: 200px;
  padding-left: 20px;
  padding-right: 20px;
}

.fixed-actions-colum {
  position: sticky;
  right: 0;
  background-color: #fff;
  z-index: 1;
}

.selectedRow {
  background-color: #d0d0d0 !important;
  color: #523e3e;
  font-weight: 400;
}

.truncate_text {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  /*  width: 100%; */
}
</style>
