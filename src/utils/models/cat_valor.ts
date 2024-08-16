export interface IValor {
    valor: string | null;
    nivel_etiqueta: string | null;
    vista: string | null;
    descripcion_concepto_total: string | undefined;
    unidad: string | null;
    publicacion: string | null;
    libro: string | null;
    tema: string | null;
    parte: string | null;
    titulo: string | null;
    capitulo: string | null;
    etiqueta: string | null;

  }
  
  export const defaultValues: IValor = {
    valor: null,
    nivel_etiqueta: null,
    vista: null,
    descripcion_concepto_total: undefined,
    unidad: null,
    publicacion: null,
    libro: null,
    tema: null,
    parte: null,
    titulo: null,
    capitulo: null,
    etiqueta: null,
  };
  