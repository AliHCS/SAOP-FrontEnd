export const cat_proveedoresValidations: any = {
  clave: {
    rules: [
      {
        validation: (value: string | null) => !!value && value.length > 0,
        message: "Campo requerido.",
      },
      {
        validation: (value: string | null) => !!(value && value.length < 11),
        message: "Máximo 10 caracteres.",
      },
    ],
  },
  nombre: {
    rules: [
      {
        validation: (value: string | null) => !!value && value.length > 0,
        message: "Campo requerido.",
      },
      {
        validation: (value: string | null) => !!(value && value.length < 1024),
        message: "Máximo 1024 caracteres.",
      },
    ],
  },
  nombre_comercial: {
    rules: [
      {
        validation: (value: string | null) => !!value && value.length > 0,
        message: "Campo requerido.",
      },
      {
        validation: (value: string | null) => !!(value && value.length < 255),
        message: "Máximo 255 caracteres.",
      },
    ],
  },
  giro_empresarial: {
    rules: [
      {
        validation: (value: string | null) => !!value && value.length > 0,
        message: "Campo requerido.",
      },
      {
        validation: (value: string | null) => !!(value && value.length < 255),
        message: "Máximo 255 caracteres.",
      },
    ],
  },
  tipo_personalidad: {
    rules: [
      {
        validation: (value: boolean | null) => value !== null,
        message: "Campo requerido.",
      },
    ],
  },
  calle: {
    rules: [
      {
        validation: (value: string | null) => !!value && value.length > 0,
        message: "Campo requerido.",
      },
      {
        validation: (value: string | null) => !!(value && value.length < 255),
        message: "Máximo 255 caracteres.",
      },
    ],
  },
  num_exterior: {
    rules: [
      {
        validation: (value: string | null) => !!value && value.length > 0,
        message: "Campo requerido.",
      },
      {
        validation: (value: string | null) => !!(value && value.length < 10),
        message: "Máximo 10 caracteres.",
      },
    ],
  },
  num_interior: {
    rules: [
      {
        validation: (value: string | null) => !value || value.length < 10,
        message: "Máximo 10 caracteres.",
      },
    ],
  },
  colonia: {
    rules: [
      {
        validation: (value: string | null) => !!value && value.length > 0,
        message: "Campo requerido.",
      },
      {
        validation: (value: string | null) => !!(value && value.length < 255),
        message: "Máximo 255 caracteres.",
      },
    ],
  },
  codigo_postal: {
    rules: [
      {
        validation: (value: number | null) => !!value,
        message: "Campo requerido.",
      },
      {
        validation: (value: number | null) =>
          !!(value && /^\d{5}$/.test(value.toString())),
        message: "Código postal inválido. Debe ser de 5 dígitos numéricos.",
      },
    ],
  },
  extension: {
    rules: [
      {
        validation: (value: number | null) => !!value,
        message: "Campo requerido.",
      },
    ],
  },
  direccion_pagina_web: {
    rules: [
      {
        validation: (value: string | null) => !value || value.length < 1024,
        message: "Máximo 1024 caracteres.",
      },
    ],
  },
  correo_electronico: {
    rules: [
      {
        validation: (value: string | null) =>
          !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        message: "Correo electrónico inválido.",
      },
    ],
  },
  codigo_postal_fiscal: {
    rules: [
      {
        validation: (value: number | null) => !!value,
        message: "Campo requerido.",
      },
      {
        validation: (value: number | null) =>
          !!(value && /^\d{5}$/.test(value.toString())),
        message:
          "Código postal fiscal inválido. Debe ser de 5 dígitos numéricos.",
      },
    ],
  },
  telefono_fiscal: {
    rules: [
      {
        validation: (value: string | null) => !!value && value.length > 0,
        message: "Campo requerido.",
      },
      {
        validation: (value: string | null) =>
          !!(value && /^\d{10}$/.test(value)),
        message: "Teléfono fiscal inválido. Debe ser de 10 dígitos numéricos.",
      },
    ],
  },
  extension_fiscal: {
    rules: [
      {
        validation: (value: number | null) => !!value,
        message: "Campo requerido.",
      },
    ],
  },
  calle_fiscal: {
    rules: [
      {
        validation: (value: string | null) => !!value && value.length > 0,
        message: "Campo requerido.",
      },
      {
        validation: (value: string | null) => !!(value && value.length < 255),
        message: "Máximo 255 caracteres.",
      },
    ],
  },
  num_exterior_fiscal: {
    rules: [
      {
        validation: (value: string | null) => !!value && value.length > 0,
        message: "Campo requerido.",
      },
      {
        validation: (value: string | null) => !!(value && value.length < 10),
        message: "Máximo 10 caracteres.",
      },
    ],
  },
  num_interior_fiscal: {
    rules: [
      {
        validation: (value: string | null) => !value || value.length < 10,
        message: "Máximo 10 caracteres.",
      },
    ],
  },
  colonia_fiscal: {
    rules: [
      {
        validation: (value: string | null) => !!value && value.length > 0,
        message: "Campo requerido.",
      },
      {
        validation: (value: string | null) => !!(value && value.length < 255),
        message: "Máximo 255 caracteres.",
      },
    ],
  },
  correo_electronico_fiscal: {
    rules: [
      {
        validation: (value: string | null) =>
          !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        message: "Correo electrónico fiscal inválido.",
      },
    ],
  },
  telefono: {
    rules: [
      {
        validation: (value: string | null) => !!value && value.length > 0,
        message: "Campo requerido.",
      },
      {
        validation: (value: string | null) =>
          !!(value && /^\d{10}$/.test(value)),
        message: "Teléfono inválido. Debe ser de 10 dígitos numéricos.",
      },
    ],
  },
  proveedor_estatus: {
    rules: [
      {
        validation: (value: number | null) => !!value,
        message: "Campo requerido.",
      },
    ],
  },
  pais: {
    rules: [
      {
        validation: (value: number | null) => !!value,
        message: "Campo requerido.",
      },
    ],
  },
  entidad: {
    rules: [
      {
        validation: (value: string) => !isNaN(Number(value)),
        message: "Debe ser un número.",
      },
    ],
  },
  entidad_fiscal: {
    rules: [
      {
        validation: (value: string) => !isNaN(Number(value)),
        message: "Debe ser un número.",
      },
    ],
  },
  iva: {
    rules: [
      {
        validation: (value: string) => !isNaN(Number(value)),
        message: "Debe ser un número.",
      },
    ],
  },
  municipio: {
    rules: [
      {
        validation: (value: string) => !isNaN(Number(value)),
        message: "Debe ser un número.",
      },
    ],
  },
  municipio_fiscal: {
    rules: [
      {
        validation: (value: string) => !isNaN(Number(value)),
        message: "Debe ser un número.",
      },
    ],
  },
};
