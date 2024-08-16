export interface IUnidadMedida {
    clave: string;
    unidad: string;
    descripcion: string;
  }
  
  export const defaultValues: IUnidadMedida = {
    clave: "",
    unidad: "",
    descripcion: ""
  };
  