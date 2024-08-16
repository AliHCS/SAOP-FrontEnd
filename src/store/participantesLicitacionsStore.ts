import { ref, computed } from "vue";
import { defineStore } from "pinia";
import {
  IRegistroParticipante,
  defaultValues,
  IPorcentajeFields,
} from "@/utils/models/registroParticipantes";

const defaultValuesPorcentaje: IPorcentajeFields = {
  indirectos_totales: null,
  monto_propuesta: null,
  puntuacion_economica: null,
  puntuacion_tecnica: null,
  porcentaje_financiamiento: null,
  porcentaje_indirecto: null,
  porcentaje_iva: null,
  porcentaje_utilidad: null,
};

export const useParticipantesLicitacionStore = defineStore(
  "participantesLicitacion",
  () => {
    //State
    const selectedRowData = ref<IRegistroParticipante>({ ...defaultValues });
    const porcentajeData = ref<IPorcentajeFields>({
      ...defaultValuesPorcentaje,
    });

    //Getters
    const getSelectedRowData = computed(() => {
      return selectedRowData.value;
    });
    const isSelectedRowDataEmpty = computed(() => {
      return Object.values(selectedRowData.value).every(
        (value) => value === null
      );
    });
    const getPorcentajeData = computed(() => {
      return porcentajeData.value;
    });

    const isPorcentajeDataEmpty = computed(() => {
      const fields = Object.values(porcentajeData.value);
      return fields.some((value) => value === null);
    });

    //Actions
    const setSelectedRowData = (data: IRegistroParticipante) => {
      selectedRowData.value = { ...selectedRowData.value, ...data };
    };

    const resetSelectedRowData = () => {
      selectedRowData.value = { ...defaultValues };
    };

    const setPorcentajeData = () => {
      porcentajeData.value = {
        indirectos_totales: selectedRowData.value.indirectos_totales ?? null,
        monto_propuesta: selectedRowData.value.monto_propuesta ?? null,
        puntuacion_economica:
          selectedRowData.value.puntuacion_economica ?? null,
        puntuacion_tecnica: selectedRowData.value.puntuacion_tecnica ?? null,
        porcentaje_financiamiento:
          selectedRowData.value.porcentaje_financiamiento ?? null,
        porcentaje_indirecto:
          selectedRowData.value.porcentaje_indirecto ?? null,
        porcentaje_iva: selectedRowData.value.porcentaje_iva ?? null,
        porcentaje_utilidad: selectedRowData.value.porcentaje_utilidad ?? null,
      };
    };

    return {
      //State
      selectedRowData,
      //Getters
      getSelectedRowData,
      isSelectedRowDataEmpty,
      getPorcentajeData,
      isPorcentajeDataEmpty,
      //Actions
      setSelectedRowData,
      resetSelectedRowData,
      setPorcentajeData,
    };
  }
);
