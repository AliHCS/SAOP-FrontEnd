export const fichaTecnicaValidations: any = {
  autorizacion_y_permisos: {
    rules: [
      {
        validation: (value: string) => value && value.length > 0,
        message: "Campo requerido.",
      },
      {
        validation: (value: string) => value && value.length < 512,
        message: "Maximo 256 caracteres.",
      },
    ],
  },
  situacion_actual: {
    rules: [
      {
        validation: (value: string) => value && value.length > 0,
        message: "Campo requerido.",
      },
      {
        validation: (value: string) => value && value.length < 512,
        message: "Maximo 256 caracteres.",
      },
    ],
  },
  alcance_del_proyecto: {
    rules: [
      {
        validation: (value: string) => value && value.length > 0,
        message: "Campo requerido.",
      },
      {
        validation: (value: string) => value && value.length < 512,
        message: "Maximo 256 caracteres.",
      },
    ],
  },
  clave_compromiso: {
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
  tipo_obra: {
    rules: [
      {
        validation: (value: string | number) => value !== 'seleccionar' && value !== 'default' /* Agrega aquí cualquier valor predeterminado que indique una selección no válida */,
        message: "Este campo es obligatorio.",
      },
      {
        validation: (value: string | number) => value !== null && value !== undefined && value !== '',
        message: "Seleccione una opción válida de la lista.",
      },
    ],
  },
  tipo_documento: {
    rules: [
      {
        validation: (value: string | number) => value !== 'seleccionar' && value !== 'default' /* Agrega aquí cualquier valor predeterminado que indique una selección no válida */,
        message: "Este campo es obligatorio.",
      },
      {
        validation: (value: string | number) => value !== null && value !== undefined && value !== '',
        message: "Seleccione una opción válida de la lista.",
      },
    ],
  },
  aforo: {
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
  requerimiento_de_hacienda: {
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
