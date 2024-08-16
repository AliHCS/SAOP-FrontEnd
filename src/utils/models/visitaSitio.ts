export interface IVisitaSitio {
    id: number | null;
    evento: number | null;
    nombre_empresa: string | null;
    representante_empresa: string | null;
    cargo_representante: string | null;
    folio: string | null
  }
  
  export const defaultValues: IVisitaSitio = {
    id: null,
    evento: null,
    nombre_empresa: null,
    representante_empresa: null,
    cargo_representante: null,
    folio: null
  };
  