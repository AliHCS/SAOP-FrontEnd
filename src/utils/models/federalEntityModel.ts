export interface IFederalEntity {
    clave: string;
    descripcion: string;
    descripcion_corta: string;
    descripcion_capital: string;
    region: Number;
    meso_region: Number;
    pais: Number;
  }
  
  export const defaultValues: IFederalEntity = {
    clave: "",
    descripcion: "",
    descripcion_corta: "",
    descripcion_capital: "",
    region: 0,
    meso_region: 0,
    pais: 0
  };
  