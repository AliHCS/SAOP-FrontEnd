<script setup lang="ts">
import LoaderSquare from "@/components/LoaderSquareComponent.vue";
import { onMounted } from "vue";

onMounted(() => {
  const tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-toggle="tooltip"]')
  );
  tooltipTriggerList.forEach((tooltipTriggerEl) => {
    new (require("bootstrap").Tooltip)(tooltipTriggerEl);
  });
});
</script>

<template>
  <router-view />
  <LoaderSquare />
</template>

<style>
.clickable {
  cursor: pointer;
}
.primary-red {
  background-color: #691c32 !important;
}
.primary-red--text {
  color: #691c32;
}
/*tooltip
 *[data-toggle="tooltip"]:hover::after {
  content: attr(title);
  position: absolute;
  bottom: -80%;
  width: 100px;
  font-weight: 600;
  left: 100%;
  transform: translateX(-70%);
  font-size: 12px;
  text-align: center;
  font-style: normal;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
} */
</style>
