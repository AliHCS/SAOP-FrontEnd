export interface IPublicacionProcedimientoContratacion {
  fecha_programada: string | null;
  hora_programada: string | null;
}

export const defaultValues: IPublicacionProcedimientoContratacion = {
  fecha_programada: null,
  hora_programada: null,
};
