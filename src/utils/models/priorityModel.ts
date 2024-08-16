export interface IPriority {
    clave: string;
    descripcion: string;
    presidencial: string;
    tipo_prioridad: string;
    normal: string;
    fecha_prioridad: string;
  }
  
  export const defaultValues: IPriority = {
    clave: "",
    descripcion: "",
    presidencial: "",
    tipo_prioridad: "",
    normal: "",
    fecha_prioridad: ""
  };
  