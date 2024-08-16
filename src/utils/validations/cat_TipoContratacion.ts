export const cat_tipoContratacionValidations: any = {
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
  descripcion_contratacion: {
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
  prefijo: {
    rules: [
      {
        validation: (value: string) => value && value.length > 0,
        message: "Campo requerido.",
      },
      {
        validation: (value: string) => value && value.length < 5,
        message: "Maximo 5 caracteres.",
      },
    ],
  }
};
