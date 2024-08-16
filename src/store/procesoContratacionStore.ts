import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { IDatosGenerales, defaultValues } from "@/utils/models/datosGenerales";

export const useProcesoContratacionStore = defineStore(
  "procesoContratacion",
  () => {
    //State
    const selectedRowData = ref<IDatosGenerales>({ ...defaultValues });
    //Getters
    const getSelectedRowData = computed(() => {
      return selectedRowData.value;
    });
    const isSelectedRowDataEmpty = computed(() => {
      return Object.values(selectedRowData.value).every(
        (value) => value === null
      );
    });
    //Actions
    const setSelectedRowData = (data: IDatosGenerales) => {
      selectedRowData.value = { ...selectedRowData.value, ...data };
    };

    const resetSelectedRowData = () => {
      selectedRowData.value = { ...defaultValues };
    };

    return {
      //State
      selectedRowData,
      //Getters
      getSelectedRowData,
      isSelectedRowDataEmpty,
      //Actions
      setSelectedRowData,
      resetSelectedRowData,
    };
  }
);
