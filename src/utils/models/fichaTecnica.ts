export interface IFichaTecnica {
  requerimiento_de_hacienda: string | null ;
  aforo: string | null;
  situacion_actual?: string | undefined ;
  autorizacion_y_permisos?: string | undefined;
  alcance_del_proyecto?: string | undefined;
  clave_compromiso: string | number | null ;
  cartera_proyecto_inversion: string | number | null ;
  tipo_obra: string | number | null;
  tipo_documento: string | number | null;
  documento?:  File | Blob | null;
}

export const defaultValues: IFichaTecnica = {
  requerimiento_de_hacienda: null,
  aforo: null,
  situacion_actual: undefined,
  autorizacion_y_permisos: undefined,
  alcance_del_proyecto: undefined,
  clave_compromiso: null  ,
  cartera_proyecto_inversion: null  ,
  tipo_obra: null ,
  tipo_documento: null ,
  documento:  null ,
}