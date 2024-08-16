export interface ITestigoSocial {
    id: string | null;
    clave: string | null;
    nombre: string | null;
    apellido_paterno: string | null;
    apellido_materno: string | null;
    rfc_ts: string | null;
    dependencia_proveniente: string | null;
    vigente: boolean | null;
  }
  
  export const defaultValues: ITestigoSocial = {
    id: null,
    clave: null,
    nombre: null,
    apellido_paterno: null,
    apellido_materno: null,
    rfc_ts: null,
    dependencia_proveniente: null,
    vigente: null,
  };
  