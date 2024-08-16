export default interface ProyectoDeInversion {
  clave: string;
  no_solicitud: string | number;
  nombre: string;
  descripcion: string;
  municipio: string;
  beneficios: string;
  fecha_inicial: string;
  fecha_final: string;
  ejercicio_presupuestal: string | number;
  comentarios: string;
  clave_compromiso: string;
  factibilidad_obra: string | number;
  prioridad: string | number;
  tipo_proyecto: string | number;
  estatus_proyecto: string | number;
  cartera_estatus: string | number;
  pais: string | number;
  entidad_federativa: string | number;
  fase: string | number;
  tipo_obra: string | number;
  tipo_documento: string | number;
  unidad_responsable: string | number;
  area: string | number;
  documento?:  File | Blob | null;
}
