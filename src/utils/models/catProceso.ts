export interface ICatProceso {
    clave: string;
    descripcion: string;
    modulo: number | null;
    modulo_descripcion: string;
  }
  
  export const defaultValues: ICatProceso = {
    clave: "",
    descripcion: "",
    modulo: null,
    modulo_descripcion: ""
  };
  