export interface ICapitulo {
    id: number | null;
    descripcion: string | null;
    anio: number | null;
    descripcion_concepto: string | undefined;
    tipo_escalatoria: string | null;
    publicacion: string | null;
    libro: string | null;
    tema: string | null;
    parte: string | null;
    titulo: string | null;
  }
  
  export const defaultValues: ICapitulo = {
    id: null,
    descripcion: null,
    anio: null,
    descripcion_concepto: undefined,
    tipo_escalatoria: null,
    publicacion: null,
    libro: null,
    tema: null,
    parte: null,
    titulo: null,
  };
  