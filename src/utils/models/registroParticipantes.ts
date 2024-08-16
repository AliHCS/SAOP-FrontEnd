export interface IRegistroParticipante {
  id?: string | null;
  fecha_inscripcion: string | null;
  monto_propuesta: string | number | null;
  lugar_inscripcion: string | null;
  posicion_concurso: number | null;
  comentarios: string | null;
  porcentaje_financiamiento: string | number | null;
  porcentaje_indirecto: string | number | null;
  porcentaje_utilidad: string | number | null;
  indirectos_totales: string | number | null;
  solvente: boolean | null;
  puntuacion_tecnica: string | number | null;
  puntuacion_economica: string | number | null;
  porcentaje_iva: string | number | null;
  ganador_propuesta: boolean | null;
  hora_inscripcion: string | null;
  procedimiento_contratacion?: number | null;
  proveedor: number | null;
  modulo: number | null;
  proceso: number | null;
  estatus_registro_participante: number | null;
}

export const defaultValues: IRegistroParticipante = {
  id: null,
  fecha_inscripcion: null,
  monto_propuesta: null,
  lugar_inscripcion: null,
  posicion_concurso: null,
  comentarios: null,
  porcentaje_financiamiento: null,
  porcentaje_indirecto: null,
  porcentaje_utilidad: null,
  indirectos_totales: null,
  solvente: null,
  puntuacion_tecnica: null,
  puntuacion_economica: null,
  porcentaje_iva: null,
  ganador_propuesta: null,
  hora_inscripcion: null,
  procedimiento_contratacion: null,
  proveedor: null,
  modulo: null,
  proceso: null,
  estatus_registro_participante: null,
};

export type IPorcentajeFields = Pick<
  IRegistroParticipante,
  | "indirectos_totales"
  | "monto_propuesta"
  | "puntuacion_economica"
  | "puntuacion_tecnica"
  | "porcentaje_financiamiento"
  | "porcentaje_indirecto"
  | "porcentaje_iva"
  | "porcentaje_utilidad"
>;
