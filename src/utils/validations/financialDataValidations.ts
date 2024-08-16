export const financialDataValidations: any = {
    anio_base: {
      rules: [
        {
          validation: (value: string) => value && value.length > 0,
          message: "El año base es requerido",
        }
      ],
    }
  };
  