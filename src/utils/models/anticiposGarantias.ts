export interface IAnticiposGarantias {
    anticipo_material: boolean | null;
    porcentaje_anticipo_material: string | null;
    anticipo_inicio_de_trabajo: boolean | null;
    porcentaje_anticipo_inicio_de_trabajo: string | null;
    garantias: boolean | null;
    porcentaje_garantias: string | null;
    
  }
  
  export const defaultValues: IAnticiposGarantias = {
    anticipo_material: null,
    porcentaje_anticipo_material: null,
    anticipo_inicio_de_trabajo: null,
    porcentaje_anticipo_inicio_de_trabajo: null,
    garantias: null,
    porcentaje_garantias: null
  };
  