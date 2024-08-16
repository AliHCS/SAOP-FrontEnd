export interface ICaracterProcedimiento {
    id: string | null;
    clave: string | null;
    descripcion_caracter_procedimiento: string | null;
    caracter_procedimiento: string | null;
  }
  
  export const defaultValues: ICaracterProcedimiento = {
    id: null,
    clave: null,
    descripcion_caracter_procedimiento: null,
    caracter_procedimiento: null,
  };
  