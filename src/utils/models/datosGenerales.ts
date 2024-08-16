//cat procedimiento_contratacion
export interface IDatosGenerales {
  id?: string | null;
  folio: string | null;
  trabajo: number | null;
  area: number | null;
  tipo_contratacion: number | null;
  tipo_procedimiento: number | null;
  estatus_procedimiento: number | null;
  caracter_procedimiento: number | null;
  subestatus: number | null;
  forma_procedimiento: string | null;
  numero_compranet: string | null;
  plazo_procedimiento: number | null;
  ciclo_presupuestal: number | null;
  consecutivo_e7: number | null;
  fecha_inicio: string | null;
  fecha_fin: string | null;
  dias_trabajo: number | null;
  descripcion: string | undefined;
  lugar_inscripcion: string | undefined;
  docs_proc: IDocumentosGenerales[] | undefined;
}

export interface IDocumentosGenerales {
  id: number;
  estatus: boolean;
  procedimiento_contratacion: number;
  tipo_documento: number;
}

export const defaultValues: IDatosGenerales = {
  folio: null,
  trabajo: null,
  area: null,
  tipo_contratacion: null,
  tipo_procedimiento: null,
  estatus_procedimiento: null,
  caracter_procedimiento: null,
  subestatus: null,
  forma_procedimiento: null,
  numero_compranet: null,
  plazo_procedimiento: null,
  ciclo_presupuestal: null,
  consecutivo_e7: null,
  fecha_inicio: null,
  fecha_fin: null,
  dias_trabajo: null,
  descripcion: undefined,
  lugar_inscripcion: undefined,
  docs_proc: undefined,
};
