export interface ICatTipoContratacion {
    id: string | null;
    clave: string | null;
    descripcion_contratacion: string | null;
    prefijo: string | null;
  }
  
  export const defaultValues: ICatTipoContratacion = {
    id: null,
    clave: null,
    descripcion_contratacion: null,
    prefijo: null,
  };