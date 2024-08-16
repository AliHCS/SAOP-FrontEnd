export interface IMunicipio {
    id: string | null;
    clave: string | null;
    descripcion: string | null;
    descripcion_corta: string | null;
    entidad_federativa: number | null;
    pais: number | null;
    
  }
  
  export const defaultValues: IMunicipio = {
    id: null,
    clave: null,
    descripcion: null,
    descripcion_corta: null,
    entidad_federativa: null,
    pais: null
  };
  