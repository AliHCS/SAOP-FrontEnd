export const cat_unidadResponsableValidations: any = {
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
  descripcion: {
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
  descripcion_corta: {
    rules: [
      {
        validation: (value: string) => value && value.length > 0,
        message: "Campo requerido.",
      },
      {
        validation: (value: string) => value && value.length < 256,
        message: "Maximo 256 caracteres.",
      },
    ],
  },
  tipo_unidad: {
    rules: [
      {
        validation: (value: string) => value && value.length > 0,
        message: "Campo requerido.",
      },
      {
        validation: (value: string) => value && value.length < 256,
        message: "Maximo 256 caracteres.",
      },
    ],
  },
  titular: {
    rules: [
      {
        validation: (value: string) => value && value.length > 0,
        message: "Campo requerido.",
      },
      {
        validation: (value: string) => value && value.length < 256,
        message: "Maximo 256 caracteres.",
      },
    ],
  },
  subdirector: {
    rules: [
      {
        validation: (value: string) => value && value.length > 0,
        message: "Campo requerido.",
      },
      {
        validation: (value: string) => value && value.length < 256,
        message: "Maximo 256 caracteres.",
      },
    ],
  },
  dependencia: {
    rules: [
      {
        validation: (value: string|number) => value && value.toString().length > 0,
        message: "Campo requerido.",
      },
      {
        validation: (value: string|number) => /^([0-9])*$/.test(value.toString()),
        message: "Introduzca solo valores numéricos."
      },
      {
        validation: (value: string|number) => value && value.toString().length < 10,
        message: "Máximo 10 caracteres .",
      },
    ],
  },
  codigo_postal: {
    rules: [
      {
        validation: (value: string|number) => value && value.toString().length > 0,
        message: "Campo requerido.",
      },
      {
        validation: (value: string|number) => /^([0-9])*$/.test(value.toString()),
        message: "Introduzca solo valores numéricos."
      },
      {
        validation: (value: string|number) => value && value.toString().length < 6,
        message: "Máximo 5 caracteres .",
      },
    ],
  },
  telefono: {
    rules: [
      {
        validation: (value: string|number) => value && value.toString().length > 0,
        message: "Campo requerido.",
      },
      {
        validation: (value: string|number) => /^([0-9])*$/.test(value.toString()),
        message: "Introduzca solo valores numéricos."
      },
      {
        validation: (value: string|number) => value && value.toString().length < 11,
        message: "Máximo 10 caracteres .",
      },
    ],
  },
  extension: {
    rules: [
      {
        validation: (value: string|number) => /^([0-9])*$/.test(value.toString()),
        message: "Introduzca solo valores numéricos."
      },
      {
        validation: (value: string|number) => value && value.toString().length < 6,
        message: "Máximo 5 caracteres .",
      },
    ],
  },
  calle: {
    rules: [
      {
        validation: (value: string) => value && value.length > 0,
        message: "Campo requerido.",
      },
      {
        validation: (value: string) => value && value.length < 256,
        message: "Maximo 256 caracteres.",
      },
    ],
  },
  numero_exterior: {
    rules: [
      {
        validation: (value: string) => value && value.length > 0,
        message: "Campo requerido.",
      },
      {
        validation: (value: string) => value && value.length < 256,
        message: "Maximo 256 caracteres.",
      },
    ],
  },
  numero_interior: {
    rules: [
      /* {
        validation: (value: string) => value && value.length < 256,
        message: "Maximo 256 caracteres.",
      }, */
    ],
  },
  colonia: {
    rules: [
      {
        validation: (value: string) => value && value.length > 0,
        message: "Campo requerido.",
      },
      {
        validation: (value: string) => value && value.length < 256,
        message: "Maximo 256 caracteres.",
      },
    ],
  },
  folio_licitacion: {
    rules: [
      {
        validation: (value: string|number) => value && value.toString().length > 0,
        message: "Campo requerido.",
      },
      {
        validation: (value: string) => value && value.length < 256,
        message: "Maximo 256 caracteres.",
      },
    ],
  },
  folio_contratacion: {
    rules: [
      {
        validation: (value: string|number) => value && value.toString().length > 0,
        message: "Campo requerido.",
      },
      {
        validation: (value: string) => value && value.length < 256,
        message: "Maximo 256 caracteres.",
      },
    ],
  },
  nombre_contrato: {
    rules: [
      /* {
        validation: (value: string) => value && value.length < 256,
        message: "Maximo 256 caracteres.",
      }, */
    ],
  },
  nombre_jefe_laboratorio: {
    rules: [
     /*  {
        validation: (value: string) => value && value.length < 256,
        message: "Maximo 256 caracteres.",
      }, */
    ],
  },
  entidad: {
    rules: [
      {
        validation: (value: string|number) => value && value.toString().length > 0,
        message: "Campo requerido.",
      },
      {
        validation: (value: string|number) => /^([0-9])*$/.test(value.toString()),
        message: "Introduzca solo valores numéricos."
      },
      {
        validation: (value: string|number) => value && value.toString().length < 11,
        message: "Máximo 10 caracteres .",
      },
    ],
  },
};
