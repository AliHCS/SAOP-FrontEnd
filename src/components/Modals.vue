<!-- MyModal.vue -->
<template>
  <div>
    <div
      :class="{ 'show modal-backdrop': isModalOpen }"
      v-if="isModalOpen"
    ></div>
    <div
      class="modal fade overflow-auto"
      :class="{ ' show ': isModalOpen }"
      v-if="isModalOpen"
    >
      <div :class="['modal-dialog', sizeModal]" role="document">
        <div class="modal-content">
          <div class="custom-modal-header">
            <h4 class="custom-modal-title">
              {{ props.title }}
            </h4>
            <button
              type="button"
              class="close"
              aria-label="Close"
              @click="toggleModal(false)"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <slot></slot>
          </div>
          <div v-if="!hideActions" class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              @click="toggleModal(false)"
            >
              Cerrar
            </button>
            <button
              type="button"
              class="btn btn-primary active"
              @click="toggleModal(false), emit('onSaveButton')"
            >
              {{ props.saveButtonTitle }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <button
      type="button"
      :class="[
        'btn btn-abrir',
        {
          'btn-primary active': typeOpenButtonTittle,
          'btn-secondary': !typeOpenButtonTittle,
        },
      ]"
      @click="toggleModal(true)"
    >
      <span
        ><i :class="iconClasses"></i> <b>{{ props.openButtonTittle }}</b></span
      >
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  saveButtonTitle: {
    type: String,
    default: "Guardar",
  },
  openButtonTittle: {
    type: String,
    default: "Abrir",
  },
  typeOpenButtonTittle: {
    type: Boolean,
    default: true,
  },
  largeModal: {
    type: Boolean,
    default: false,
  },
  hideActions: {
    type: Boolean,
    default: false,
  },
  iconClasses: {
    type: String,
  },
  sizeModal: {
    type: String,
  },
});
const emit = defineEmits(["onSaveButton"]);
const isModalOpen = ref(false);

const toggleModal = (open: boolean) => {
  isModalOpen.value = open;
};

const sizeModal = props.sizeModal ? `modal-${props.sizeModal}` : "";
</script>

<style scoped>
.custom-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #545454;
  background-color: #272829;
}

.custom-modal-title {
  text-align: center;
  color: white;
  flex-grow: 1;
}

.custom-modal-header .close {
  color: white;
  cursor: pointer;
}

.custom-modal-header .close:hover {
  color: #ccc;
}
@media (max-width: 800px) {
  .btn-abrir {
    width: 100%;
  }
  .btn-crear {
    width: 100%;
  }

  .btn-cancelar {
    width: 100%;
  }
}

@media (min-width: 768px) {
  .modal .modal-dialog.modal-xl {
    max-width: 1300px !important;
    width: 100%;
    margin: 30px auto;
  }
}

.modal-dialog.modal-xl {
  max-width: 900px !important;
}
</style>
