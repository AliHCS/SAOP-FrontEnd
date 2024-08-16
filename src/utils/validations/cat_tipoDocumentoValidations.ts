export const cat_tipoDocumentoValidations: any = {
  clave: {
    rules: [
      {
        validation: (value: string) => value && value.length > 0,
        message: "Campo requerido.",
      },
      {
        validation: (value: string) => value && value.length < 11,
        message: "Máximo 10 caracteres .",
      },
    ],
  },
  nombre: {
    rules: [
      {
        validation: (value: string) => value && value.length > 0,
        message: "Campo requerido.",
      },
      {
        validation: (value: string) => value && value.length < 31,
        message: "Máximo 30 caracteres .",
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
        validation: (value: string) => value && value.length < 121,
        message: "Maximo 120 caracteres.",
      },
    ],
  },
};
