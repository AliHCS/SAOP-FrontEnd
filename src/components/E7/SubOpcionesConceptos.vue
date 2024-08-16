<template>
  <li>
    <span @click="toggleSubmenu(option)" tabindex="0">
      <span
        ><i
          :class="{
            'bi bi-caret-down-fill': option.open,
            'bi bi-caret-right-fill': !option.open,
          }"
        ></i
      ></span>
      <span :class="{ 'open-option-text': option.open }">{{
        option.label
      }}</span>
    </span>
    <ul v-if="option.suboptions && option.open" class="sub-menu">
      <template v-for="suboption in option.suboptions">
        <MenuItem :option="suboption" :toggleSubmenu="toggleSubmenu" />
      </template>
    </ul>
  </li>
</template>

<script setup lang="ts">
import MenuItem from "@/components/E7/SubOpcionesConceptos.vue";
import { IOption, ISuboption } from "@/utils/models/optionsConceptosE7";

const props = defineProps<{
  option: IOption | ISuboption;
  toggleSubmenu: (option: IOption | ISuboption) => void;
}>();

const { option, toggleSubmenu } = props;
</script>

<style scoped>
.open-option-text {
  background-color: lightgray; /* Cambia el color del texto de la opción cuando está abierta */
}
li {
  list-style-type: none;
}
</style>
@/utils/models/optionsConceptosE7
