export interface ITipoProcedimiento {
    id: string | null;
    clave: string | null;
    descripcion_tipo_procedimiento: string | null;
    prefijo: string | null;
  }
  
  export const defaultValues: ITipoProcedimiento = {
    id: null,
    clave: null,
    descripcion_tipo_procedimiento: null,
    prefijo: null,
  };
  