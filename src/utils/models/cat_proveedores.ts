export interface IProveedor {
  id?: string | null; // Clave heredada de progress
  clave?: string | null; // Clave heredada de progress
  nombre: string | null; // Nombre
  nombre_comercial: string | null; // Nombre comercial
  giro_empresarial: string | null; // Giro empresarial
  tipo_personalidad: boolean; // Tipo personalidad
  calle: string | null; // Calle
  num_exterior: string | null; // Número exterior
  num_interior?: string | null; // Número interior
  colonia: string | null; // Colonia
  codigo_postal: string | null; // Codigo postal
  extension: number | string | null; // Extension
  direccion_pagina_web?: string | null; // Direccion página web
  correo_electronico?: string | null; // Correo electrónico
  codigo_postal_fiscal: number | string | null; // Codigo postal fiscal
  telefono_fiscal: string | null; // Teléfono fiscal
  extension_fiscal: number | string | null; // Extensión fiscal
  calle_fiscal: string | null; // Calle fiscal
  num_exterior_fiscal: string | null; // Número exterior fiscal
  num_interior_fiscal?: string | null; // Número interior fiscal
  colonia_fiscal: string | null; // Colonia fiscal
  correo_electronico_fiscal?: string | null; // Correo electrónico fiscal
  telefono: string | null; // Teléfono
  proveedor_estatus: number | string | null; // Proveedor estatus
  pais: number | string | null; // Pais
  entidad: number | null; // Entidad
  entidad_fiscal: number | null; // Entidad fiscal
  iva: number | string | null; // Iva
  municipio: number | string | null; // Municipio
  municipio_fiscal: number | string | null; // Municipio fiscal
  rfc: number | string | null;
}

export const defaultValues: IProveedor = {
  id: "",
  clave: "",
  nombre: "",
  nombre_comercial: "",
  giro_empresarial: "",
  tipo_personalidad: false,
  calle: "",
  num_exterior: "",
  num_interior: "",
  colonia: "",
  codigo_postal: null,
  extension: null,
  direccion_pagina_web: "",
  correo_electronico: "",
  codigo_postal_fiscal: null,
  telefono_fiscal: "",
  extension_fiscal: null,
  calle_fiscal: "",
  num_exterior_fiscal: "",
  num_interior_fiscal: "",
  colonia_fiscal: "",
  correo_electronico_fiscal: "",
  telefono: "",
  proveedor_estatus: null,
  pais: null,
  entidad: null,
  entidad_fiscal: null,
  iva: null,
  municipio: null,
  municipio_fiscal: null,
  rfc: null,
};
