<template>
  <div class="form-group">
    <div>
      <span class="font-weight-bold pr-2">{{ props.textSerch }}</span>
    </div>
    <div>
      <input
        :style="{ width: inputWidth }"
        class="form-control"
        :placeholder="
          props.searchPlaceholder
            ? props.searchPlaceholder
            : 'Teclea tu búsqueda'
        "
        type="text"
        @keyup.enter="search($event)"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  searchPlaceholder: String,
  inputWidth: {
    type: String,
    default: "auto", // Valor predeterminado para el ancho del input
  },
  textSerch: {
    type: String,
    default: "Buscar: ",
  },
});

const emit = defineEmits(["onSearch"]);

const search = (event: any) => {
  const data = event.target.value;
  emit("onSearch", data);
};
</script>
<style lang="scss" scoped>
.form-group {
  display: flex;
  align-items: center;
}
</style>
