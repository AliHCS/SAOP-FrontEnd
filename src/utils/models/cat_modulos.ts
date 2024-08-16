export interface ICatModulo {
    id: string | null;
    clave: string | null;
    descripcion: string | null;
  }
  
  export const defaultValues: ICatModulo = {
    id: null,
    clave: null,
    descripcion: null,
  };