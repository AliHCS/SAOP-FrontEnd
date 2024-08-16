<template>
  <input
    type="text"
    class="form-control"
    :value="vModel"
    @copy="$event.preventDefault()"
    @paste="$event.preventDefault()"
    @cut="$event.preventDefault()"
  />
</template>

<script setup lang="ts">
import type { PropType } from "vue";
const { vModel } = defineProps({
  typeTableProp: {
    type: String,
    required: true,
  },
  vModel: {
    type: [String, Number] as PropType<string | number>,
    required: true,
  },
});
</script>
