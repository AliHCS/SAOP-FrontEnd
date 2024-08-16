export interface ICatSubEstatus {
  id?: string | null; // Clave heredada de progress, nullable
  clave?: string | null; // Clave heredada de progress, nullable
  descripcion_subestatus: string | null; // Descripcion subestatus, maxLength: 1024, minLength: 1
  fecha_subestatus: string | null; // Fecha subestatus, debe ser un string en formato de fecha ($date)
  estatus_subestatus: string | number | null; // Estatus subestatus
  proceso: string | number | null; // Proceso
  modulo: string | number | null; // Modulo
}

export const defaultValues: ICatSubEstatus = {
  clave: null,
  descripcion_subestatus: null,
  fecha_subestatus: null,
  estatus_subestatus: null,
  proceso: null,
  modulo: null,
};
