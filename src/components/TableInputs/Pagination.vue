<template>
  <nav
    aria-label="Page navigation"
    class="text-center"
    v-if="pagination.total > 0 && pagination.total_pages > 0"
  >
    <ul class="pagination">
      <li
        class="page-item"
        :class="{
          disabled: pagination.total_pages <= 1 || pagination.page === 1,
        }"
      >
        <a
          class="page-link"
          href="#"
          @click.prevent
          @click="handlePage(pagination.previous_page)"
          >Anterior</a
        >
      </li>
      <li
        class="page-item"
        v-for="(item, index) in pagination.total_pages"
        v-show="showPaginationNumbers(item)"
        :class="{
          active: hasActiveClass(item),
          disabled:
            pagination.total_pages > PAGINATION_MAX_PAGES &&
            item === PAGINATION_DOTS,
        }"
        :key="index"
        @click.prevent
        @click="handlePage(item)"
      >
        <a :disabled="true" class="page-link" href="#">{{
          pagination.total_pages > PAGINATION_MAX_PAGES &&
          item === PAGINATION_DOTS
            ? "..."
            : item
        }}</a>
      </li>
      <li
        class="page-item"
        :class="{
          disabled:
            pagination.total_pages <= 1 ||
            pagination.page === pagination.total_pages,
        }"
      >
        <a
          class="page-link"
          href="#"
          @click.prevent
          @click="handlePage(pagination.next_page)"
          >Siguiente</a
        >
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import {
  PAGINATION_MAX_PAGES,
  PAGINATION_OFFSET,
  PAGINATION_DOTS,
} from "@/utils/constants/pagination";

const props = defineProps<{ pagination: any }>();

const emit = defineEmits(["onPaginate"]);
const handlePage = (page: any) => emit("onPaginate", page);

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
</script>

<style lang="scss" scoped>
div.dataTables_wrapper div.dataTables_paginate,
.dataTables_info,
.dataTables_paginate .paging_simple_numbers,
#table_paginate {
  text-align: center;
}

.page-item.active .page-link,
.pagination > .active > a,
.pagination > .active > a:focus,
.pagination > .active > a:hover,
.pagination > .active > span,
.pagination > .active > span:focus,
.pagination > .active > span:hover {
  background-color: #691c32;
  border-color: #691c32;
}

#data-table-component {
  overflow-x: auto;
}

.action_items {
  display: flex !important;
  align-items: center;
}
</style>
