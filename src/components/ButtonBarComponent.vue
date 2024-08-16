<template>
  <div class="dt-buttons">
    <button
      v-if="props.showCreate"
      title="Crear"
      class="dt-button btn btn-primary active btn-crear"
      type="button"
      @click="emit('onCreate')"
    >
      <span
        ><i class="bi bi-plus"></i> <b>{{ props.customLabelCreate }}</b></span
      >
    </button>
    <button
      v-if="props.showCustomButton"
      title="custom"
      class="dt-button btn btn-secondary btn-cancelar"
      type="button"
      :disabled="disableCustomButton"
      @click="emit('onCustom')"
    >
      <span
        ><i :class="customIcon"></i> <b>{{ props.customLabel }}</b></span
      >
    </button>
    <button
      v-if="props.showRelated"
      title="Relacionar con procedimiento de contratción"
      class="dt-button btn btn-primary active btn-crear"
      type="button"
      @click="emit('onRelated')"
    >
      <span
        ><i class="bi bi-plus"></i>
        <b>Relacionar con procedimiento de contratción</b></span
      >
    </button>
    <span v-if="showSubactions">
      <button
        v-if="showPdf"
        title="Exportar PDF"
        class="dt-button buttons-pdf buttons-html5 btn btn-light btn-pdf"
        type="button"
        @click="emit('onPdf')"
      >
        <span><i class="bi bi-file-earmark-pdf"></i></span>
      </button>
      <button
        v-if="showExcel"
        title="Exportar Excel"
        class="dt-button buttons-excel buttons-html5 btn btn-light btn-excel"
        disabled
        type="button"
        @click="emit('onExcel')"
      >
        <span><i class="bi bi-file-earmark-excel"></i></span>
      </button>
      <button
        v-if="showPrint"
        :title="printText"
        class="dt-button buttons-print btn btn-light btn-imprimir"
        type="button"
        @click="emit('onPrint')"
      >
        <span><i class="bi bi-printer"></i></span>
      </button>
      <button
        v-if="showCopy"
        title="Copiar"
        class="dt-button buttons-copy buttons-html5 btn btn-light btn-copiar"
        disabled
        @click="emit('onCopy')"
      >
        <span><i class="bi bi-clipboard"></i></span>
      </button>
    </span>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits([
  "onCopy",
  "onPrint",
  "onExcel",
  "onPdf",
  "onCreate",
  "onCustom",
  "onRelated",
]);
const props = defineProps({
  showCreate: {
    type: Boolean,
    default: true,
  },
  showCustomButton: {
    type: Boolean,
    default: false,
  },
  customLabel: {
    type: String,
    default: "Custom",
  },
  customLabelCreate: {
    type: String,
    default: "Crear",
  },
  disableCustomButton: Boolean,
  customIcon: {
    type: String,
  },
  showSubactions: {
    type: Boolean,
    default: true,
  },
  showPdf: {
    type: Boolean,
    default: true,
  },
  showExcel: {
    type: Boolean,
    default: true,
  },
  showPrint: {
    type: Boolean,
    default: true,
  },
  printText: {
    type: String,
    default: "Imprimir",
  },
  showCopy: {
    type: Boolean,
    default: true,
  },
  showRelated: {
    type: Boolean,
    default: false,
  },
});
</script>
<style lang="scss" scoped>
.dt-buttons {
  display: inline-block;
}

button {
  margin-left: 2px;
  margin-right: 2px;
}

.btn-crear {
  background-color: #691c32 !important;
}

@media (max-width: 800px) {
  .btn-pdf,
  .btn-excel,
  .btn-imprimir,
  .btn-copiar {
    /* display: none; */
    width: 100%;
  }

  .dt-buttons {
    width: 100%;
  }

  .btn-crear {
    width: 100%;
  }

  .btn-cancelar {
    width: 100%;
  }
}
</style>
