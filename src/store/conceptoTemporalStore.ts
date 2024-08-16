import { defineStore } from "pinia";
import {
  ConceptoTemporal,
  DataConceptosTemporal,
} from "@/utils/models/conceptosTemporal";
import { Concepto } from "@/utils/models/conceptos";

export const useConceptosTemporalStore = defineStore("conceptosTemporal", {
  state: () => ({
    trabajoDesasociadoTemporalmente: [] as ConceptoTemporal[],
    concepto: [] as Concepto[],
    datosExtraidos: [] as DataConceptosTemporal[],
  }),
  getters: {
    getConceptos: (state) => state.trabajoDesasociadoTemporalmente,
    getArrayConcepto: (state) => state.concepto,
  },
  actions: {
    setTrabajos(concepto: ConceptoTemporal[]) {
      this.trabajoDesasociadoTemporalmente = concepto;
    },
    setDatosConceptoTemporal(concepto: DataConceptosTemporal[]) {
      this.datosExtraidos = concepto;
    },
    setConcepto(concepto: Concepto[]) {
      this.concepto = concepto;
    },
    extraerDatos() {
      this.trabajoDesasociadoTemporalmente = this.datosExtraidos.flatMap(
        (item) => item.datos
      );
    },
  },
});
