export interface IStatus {
    clave: string;
    descripcion: string;
    fecha: string;
    fk_proceso: Number;
  }
  
  export const defaultValues: IStatus = {
    clave: "",
    descripcion: "",
    fecha: "",
    fk_proceso: 0
  };
  