export interface IRegistroParticipante {
    id: string | null;
    fecha_inscripcion: string | null; 
    monto_propuesta: string | null;
    lugar_inscripcion: string | null;
    posicion_concurso: string | null;
    comentarios: string | null;
    porcentaje_financiamiento: string | null;
    porcentaje_indirecto: string | null;
    porcentaje_utilidad: string | null;
    indirectos_totales: string | null;
    solvente: string | null;
    puntuacion_tecnica: string | null;
    puntuacion_economica: string | null;
    porcentaje_iva: string | null;
    ganador_propuesta: string | null;
    hora_inscripcion: string | null;
    procedimiento_contratacion: string | null;
    proveedor: string | Object | null;
    modulo: string | null;
    proceso: string | null;
    estatus_registro_participante: string | null;
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
  