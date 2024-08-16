export interface IFactorEscalatoria {
    id: string | null;
    anio: number | null;
    mes: number | null;
    factor: string | null;
    unidad_responsable: number | null;
    departamento: number | null;
    entidad_federativa: number | null;
    pais: number | null;
    
  }
  
  export const defaultValues: IFactorEscalatoria = {
    id: null,
    anio: null,
    mes: null,
    factor: null,
    unidad_responsable: null,
    departamento: null,
    entidad_federativa: null,
    pais: null
  };
  