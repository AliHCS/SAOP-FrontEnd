<template>
    <div class="card">
        <div class="card-body text-center">
            <h5 class="card-title">{{ title }}</h5>
            <h6 class="card-subtitle mb-2 text-muted">
                {{ props.subtitle }}
            </h6>
            <p class="card-text">
                {{ props.text }}
            </p>
            <button @click="emit('onCancel')" class="card-link btn btn-secondary">Cancelar</button>
            <button @click="emit('onConfirm')" class="card-link btn btn-primary">Confirmar</button>
        </div>
    </div>
</template>
<script setup lang="ts">
const emit = defineEmits(['onCancel', 'onConfirm'])
const props = defineProps({
    title: {
        type: String,
        required: true,
        default: ''
    },
    subtitle: {
        type: String,
        required: true,
        default: ''
    },
    text: {
        type: String,
        required: true,
        default: ''
    }
})
</script>
<style lang="scss" scoped></style>