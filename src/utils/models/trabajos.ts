export interface ITrabajos {
    cartera_proyecto_inversion: string | null ;
    presupuesto_egresos_federacion: number | null;
    entidad_federativa: number | null ;
    pais: number | null ;
    departamento: number | null ;
    descripcion: string |undefined ;
    aplica_ruta_tramo_subtramo: boolean;
    fecha_obra: string | null;
    estatus_trabajo: number | null;
    numero_obra: number | null;
    tipo_trabajo: number | null;
    tipo_subtrabajo: number | null;
    meta: number | null;
    periodo: string | null;
    actividad_prioritaria: string | null;
    tipo_contratacion: number | null;
    ubicacion: string | undefined;
    observaciones: string | undefined;
    // autorizacion_y_permisos?: string | undefined;
    // alcance_del_proyecto?: string | undefined;
    // clave_compromiso: string | number | null ;
    // cartera_proyecto_inversion: string | number | null ;
    // tipo_obra: string | number | null;
    // tipo_documento: string | number | null;
    // documento?:  File | Blob | null;
  }
  
  export const defaultValues: ITrabajos = {
    cartera_proyecto_inversion: null,
    presupuesto_egresos_federacion: null,
    entidad_federativa: null,
    pais: null,
    departamento: null,
    descripcion: undefined,
    aplica_ruta_tramo_subtramo: false,
    fecha_obra: null,
    estatus_trabajo: null,
    numero_obra: null,
    tipo_trabajo: null,
    tipo_subtrabajo: null,
    meta: null,
    periodo: null,
    actividad_prioritaria: null,
    tipo_contratacion: null,
    ubicacion: undefined,
    observaciones: undefined,
  }