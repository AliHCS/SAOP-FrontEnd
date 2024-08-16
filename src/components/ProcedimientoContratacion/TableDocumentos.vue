<template>
  <div id="data-table-component" :class="prefix">
    <table class="table table-hover table-bordered">
      <thead>
        <tr>
          <th v-for="col in columns" :key="col.title" class="text-center">
            {{ col.title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="value in data"
          :key="value[rowId]"
          @click="selectRow(value)"
          :id="`row-${prefix || ''}${value[rowId]}`"
          :class="{ pointer: rowSelect, selectedRow: isSelectedRow(value) }"
        >
          <td
            v-for="col in columns"
            :key="col.title"
            class="text-left"
            v-html="getNestedField(value, col.data)"
          ></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  columns: { title: string; data: string }[];
  data: any[];
  rowId: string;
  prefix?: string;
  rowSelect?: boolean;
}>();

const emit = defineEmits(["onGetID"]);
const selectedRow = ref<string | null>("");

const selectRow = (row: any) => {
  const selectedRowId = row[props.rowId];
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

  const rowHtml = document.querySelector(
    `#row-${props.prefix || ""}${selectedRowId}`
  );
  if (rowHtml) {
    rowHtml.classList.toggle(
      "selectedRow",
      selectedRow.value === selectedRowId
    );
  }

  emit("onGetID", row);
};

const isSelectedRow = (row: any) => selectedRow.value === row[props.rowId];

const getNestedField = (obj: any, path: string) =>
  path.split(".").reduce((o, p) => (o ? o[p] : ""), obj);
</script>

<style scoped>
.table-hover tbody tr:hover {
  background-color: #f5f5f5;
  cursor: pointer;
}

.selectedRow {
  background-color: #d0d0d0 !important;
  color: #523e3e;
  font-weight: 400;
}
</style>
