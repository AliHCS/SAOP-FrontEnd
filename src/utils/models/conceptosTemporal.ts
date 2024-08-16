export interface ConceptoTemporal {
  id: number | null;
  descripcion: string | null;
  cantidad: string | null;
  importe: string | null;
  norma: string | null;
  partida: number | null;
  grupo: number | null;
  precio: string | null;
  temporal?: number | null;
  trabajo: any | null; // Ajusta el tipo según corresponda
  unidad_de_medida: string | null;
}
export interface DataConceptosTemporal {
  id?: number;
  trabajo: any; // Ajusta el tipo según corresponda
  control_carga: any; // Ajusta el tipo según corresponda
  datos: ConceptoTemporal;
}
export const defaultValues: ConceptoTemporal = {
  id: null,
  descripcion: null,
  cantidad: null,
  importe: null,
  norma: null,
  grupo: null,
  partida: null,
  precio: null,
  temporal: null,
  trabajo: null,
  unidad_de_medida: null,
};
