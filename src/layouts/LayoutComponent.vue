<template>
    <HeaderComponent />
    <main class="layout-container container">
        <router-view />
    </main>
</template>
<script setup lang="ts">
import HeaderComponent from '@/layouts/HeaderComponent.vue'
</script>
<style lang="scss" scoped>
.layout-container {
    padding: 5rem 0 10rem 0;
}
</style>