export const UbicacionConvocanteValidations: any = {
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
  numero_exterior: {
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
  numero_interior: {
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
      {
        validation: (value: number | null) => !!(value && value < 32767),
        message: "Código postal inválido. Debe ser menor a 32767.",
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
  municipio: {
    rules: [
      {
        validation: (value: string) => !isNaN(Number(value)),
        message: "Debe ser un número.",
      },
    ],
  },
};
