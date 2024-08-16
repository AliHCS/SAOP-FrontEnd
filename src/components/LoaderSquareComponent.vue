<script setup lang="ts">
import { useApplicationStore } from '@/store/applicationStore'


const appStore = useApplicationStore()

</script>
<template>
    <Transition name="loader">
        <div v-show="appStore.showLoading" class="app-loader">
            <div class="fulfilling-square-spinner">
                <div class="spinner-inner"></div>
            </div>
        </div>
    </Transition>
</template>
<style lang="scss" scoped>
.app-loader {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    text-align: center;
    justify-content: center;
    display: flex;
    align-items: center;
    background-color: rgba(255, 255, 255, 1);
    // El framework de gob.mx tiene un z-index de 1030
    z-index: 99;
}

.fulfilling-square-spinner,
.fulfilling-square-spinner * {
    box-sizing: border-box;
}

.fulfilling-square-spinner {
    height: 50px;
    width: 50px;
    position: relative;
    border: 4px solid #9d2449;
    animation: fulfilling-square-spinner-animation 1.5s infinite ease;
}

.fulfilling-square-spinner .spinner-inner {
    vertical-align: top;
    display: inline-block;
    background-color: #9d2449;
    width: 100%;
    opacity: 1;
    animation: fulfilling-square-spinner-inner-animation 1.5s infinite ease-in;
}

@keyframes fulfilling-square-spinner-animation {
    0% {
        transform: rotate(0deg);
    }

    25% {
        transform: rotate(180deg);
    }

    50% {
        transform: rotate(180deg);
    }

    75% {
        transform: rotate(360deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

@keyframes fulfilling-square-spinner-inner-animation {
    0% {
        height: 0%;
    }

    25% {
        height: 0%;
    }

    50% {
        height: 100%;
    }

    75% {
        height: 100%;
    }

    100% {
        height: 0%;
    }
}
</style>