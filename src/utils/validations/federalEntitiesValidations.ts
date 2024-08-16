export const federalEntitiesValidations: any = {
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
    descripcion_corta: {
        rules: [
          {
            validation: (value: string) => value && value.length > 0,
            message: "La descripción corta es requerida.",
          },
          {
            validation: (value: string) => value && value.length > 3,
            message: "La descripción corta debe tener al menos tres caracteres.",
          },
        ],
      },
      descripcion_capital: {
        rules: [
          {
            validation: (value: string) => value && value.length > 0,
            message: "La descripción capital es requerida.",
          },
          {
            validation: (value: string) => value && value.length > 3,
            message: "La descripción capital debe tener al menos tres caracteres.",
          },
        ],
      },
      region: {
        rules: [
          {
            validation: (value: number) => value && value > 0,
            message: "La región es requerida.",
          },
        ],
      },
      meso_region: {
        rules: [
          {
            validation: (value: number) => value && value > 0,
            message: "La meso región es requerida.",
          },
        ],
      },
      pais: {
        rules: [
          {
            validation: (value: number) => value && value > 0,
            message: "El país es requerido.",
          },
        ],
      },

  };
  