export const cat_periodosPagoValidations: any = {
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
  descripcion_periodo_pago: {
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
  }
};
