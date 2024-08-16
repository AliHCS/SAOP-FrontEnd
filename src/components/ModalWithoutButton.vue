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
            <h4 class="custom-modal-title">{{ props.title }}</h4>
            <button
              type="button"
              class="close"
              aria-label="Close"
              @click="closeModal"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <slot></slot>
          </div>
          <div class="modal-footer" v-if="!hideActions">
            <button type="button" class="btn btn-secondary" @click="closeModal">
              Cerrar
            </button>
            <button
              v-if="props.showAcceptButton"
              type="button"
              class="btn btn-primary active"
              @click="saveModal"
            >
              {{ props.saveButtonTitle }}
            </button>
          </div>
        </div>
      </div>
    </div>
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
  sizeModal: {
    type: String,
  },
  showAcceptButton: {
    type: Boolean,
    default: true,
  },
  keepOpenOnSave: {
    type: Boolean,
    default: false,
  },
  hideActions: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["onSave", "onCloseModal"]);
const isModalOpen = ref(true);

const saveModal = () => {
  if (props.keepOpenOnSave) {
    emit("onSave");
  } else {
    closeAndSaveModal();
  }
};

const closeModal = () => {
  isModalOpen.value = false;
  emit("onCloseModal");
};

const closeAndSaveModal = () => {
  isModalOpen.value = false;
  emit("onCloseModal");
  emit("onSave");
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
