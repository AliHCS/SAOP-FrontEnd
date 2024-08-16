export const levelsByAreaValidations: any = {
  nombre: {
    rules: [
      {
        validation: (value: string) => value && value.length > 0,
        message: "El nombre es requerido.",
      }
    ],
  },
  clave: {
    rules: [
      {
        validation: (value: string) => value && value.length > 0,
        message: "La clave es requerida.",
      },
    ],
  },
};
