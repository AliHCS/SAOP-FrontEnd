import { ref } from 'vue'
import { defineStore } from "pinia";

export const useApplicationStore = defineStore('application', () => {
    const showLoading = ref(false)

    const initTransaction = () => {
        showLoading.value = true
    }

    const endTransaction = () => {
        showLoading.value = false
    }

    return {
        showLoading,

        initTransaction,
        endTransaction
    }
})

export default useApplicationStore