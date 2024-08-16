// CreateUbicacionConvocante
export interface IUbicacionConvocante {
  id?: string | null; // Clave heredada de progress, nullable
  codigo_postal: string | null;
  colonia: string | null;
  calle: string | null;
  numero_exterior: string | null;
  numero_interior?: string | null;
  extension?: string | null;
  telefono: string | null;
  procedimiento: number | null;
  municipio: number | null;
}

export const defaultValues: IUbicacionConvocante = {
  codigo_postal: "",
  colonia: "",
  calle: "",
  numero_exterior: "",
  numero_interior: undefined,
  extension: undefined,
  telefono: "",
  procedimiento: 0,
  municipio: 0,
};
