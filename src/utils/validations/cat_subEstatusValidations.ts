export const cat_subEstatusValidations: any = {
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
  descripcion_subestatus: {
    rules: [
      {
        validation: (value: string) => value && value.length > 0,
        message: "Campo requerido.",
      },
      {
        validation: (value: string) => value && value.length < 1024,
        message: "Máximo 1024 caracteres .",
      },
    ],
  },
  fecha_subestatus: {
    rules: [
      {
        validation: (value: string) => value && value.length > 0,
        message: "Campo requerido.",
      },
      {
        validation: (value: string) => !isNaN(Date.parse(value)),
        message: "Debe ser una fecha válida.",
      },
      {
        validation: (value: string) => new Date(value) <= new Date(),
        message: "La fecha no puede ser mayor al día actual.",
      },
    ],
  },
  estatus_subestatus: {
    rules: [
      /* {
        validation: (value: string) => value && value.length > 0,
        message: "Campo requerido.",
      }, */
      {
        validation: (value: string) => !isNaN(Number(value)),
        message: "Debe ser un número.",
      },
    ],
  },
  proceso: {
    rules: [
      /*  {
        validation: (value: string) => value && value.length > 0,
        message: "Campo requerido.",
      }, */
      {
        validation: (value: string) => !isNaN(Number(value)),
        message: "Debe ser un número.",
      },
    ],
  },
  modulo: {
    rules: [
      /* {
        validation: (value: string) => value && value.length > 0,
        message: "Campo requerido.",
      }, */
      {
        validation: (value: string) => !isNaN(Number(value)),
        message: "Debe ser un número.",
      },
    ],
  },
};
