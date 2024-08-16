export const constructionTypesValidations: any = {
  descripcion: {
    rules: [
      {
        validation: (value: string) => value && value.length > 0,
        message: "La descripción es requerida.",
      },
      {
        validation: (value: string) => value && value.length > 3,
        message: "La descripción debe tener al menos tres caracteres.",
      },
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
