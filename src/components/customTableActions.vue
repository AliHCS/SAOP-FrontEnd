<template>
    <div class="display-4 d-flex icon-actions py-2 col-md-4 d-flex justify-content-end">
        <i v-for="(action, index) in props.actions" :key="index" class="pl-5 ml-2 bi" :class="action.iconAction" data-toggle="tooltip" data-placement="top" title="Presupuesto base" @click="handleAction(action.action)"></i>
    </div>
</template>

<script setup lang="ts">

const props = defineProps({
  actions: Array<any>,
});

const emit = defineEmits(["onAction"]);

const handleAction = (action: any) => {
    emit('onAction', action);
};
</script>

<style lang="scss" scoped>
.icon-actions i {
    cursor: pointer;
    transition: transform 0.3s, font-size 0.2s;
    opacity: 0.8;

    &:hover {
        transform: scale(1.1);
        opacity: 1;
        color: var(--primary-red);
    }
}
</style>
