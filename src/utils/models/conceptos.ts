export interface Concepto {
  cantidad_obra: number | null;
  clasificacion: string;
  descripcion: string;
  grupo: number | null;
  partida: number | null;
  precio: number | null;
  unidad_medida: string | null;
}

export const defaultValues: Concepto = {
  cantidad_obra: null,
  clasificacion: "",
  descripcion: "",
  grupo: null,
  partida: null,
  precio: null,
  unidad_medida: "",
};
