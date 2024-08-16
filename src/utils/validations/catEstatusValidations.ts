export const catEstatusValidations: any = {
  clave: {
    rules: [
      {
        validation: (value: string) => value && value.length > 0,
        message: "Campo requerido.",
      },
      {
        validation: (value: string) => value && value.length < 21,
        message: "Máximo 20 caracteres .",
      },
    ],
  },
  descripcion: {
    rules: [
      {
        validation: (value: string) => value && value.length > 0,
        message: "Campo requerido.",
      },
      {
        validation: (value: string) => value && value.length < 257,
        message: "Máximo 256 caracteres .",
      },
    ],
  },
  fecha: {
    rules: [
      {
        validation: (value: string) => value && value.length > 0,
        message: "Campo requerido.",
      },
      {
        validation: (value: string) => !isNaN(Date.parse(value)),
        message: "Debe ser una fecha válida.",
      },
    ],
  },
  fk_proceso: {
    rules: [
      {
        validation: (value: string | number) => value && value.toString().length > 0,
        message: "Campo requerido.",
      },
    ],
  },
};
