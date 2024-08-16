export interface ITitulo {
    descripcion: string | null;
    publicacion: string | null;
    libro: string | null;
    tema: string | null;
    parte: string | null;
  }
  
  export const defaultValues: ITitulo = {
    descripcion: null,
    publicacion: null,
    libro: null,
    tema: null,
    parte: null,
  };
  