export const proyectoDeInversionValidations: any = {
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
  no_solicitud: {
    //Solo Numerico
    rules: [
      {
        validation: (value: string) => value && /^\d+$/.test(value),
        message: "Ingrese solo números enteros.",
      },
      {
        validation: (value: number | null | undefined) => value !== null && value !== undefined && !isNaN(value) && value !== 0,
        message: "Este campo numérico es obligatorio y no puede ser cero.",
      },
      {
        validation: (value: number | null | undefined) => value !== null && value !== undefined && !isNaN(value) && value.toString().length <= 10,
        message: "Este campo debe tener exactamente 10 dígitos.",
      },
      {
        validation: (value: string) => value && parseInt(value) < 2147483647,
        message: "Este campo debe ser menor que 2147483647.",
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
  nombre: {
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
  municipio: {
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
  beneficios: {
    rules: [
      {
        validation: (value: string) => value && value.length > 0,
        message: "Campo requerido.",
      },
      {
        validation: (value: string) => value && value.length < 512,
        message: "Maximo 512 caracteres.",
      },
    ],
  },
  fecha_inicial: {
    rules: [
      {
        validation: (value: string) => value && value.length > 0,
        message: "La fecha es requerida.",
      },
    ],
  },
  fecha_final: {
    rules: [
      {
        validation: (value: string) => value && value.length > 0,
        message: "La fecha es requerida.",
      },
    ],
  },
  ejercicio_presupuestal: {
    //Que solo tenga 4 digitos
    rules: [
      {
        validation: (value: number | null | undefined) => value !== null && value !== undefined && !isNaN(value),
        message: "Este campo debe contener un valor numérico.",
      },
      {
        validation: (value: number | null | undefined) => value !== null && value !== undefined && !isNaN(value) && value !== 0,
        message: "Este campo numérico es obligatorio y no puede ser cero.",
      },
      {
        validation: (value: number | null | undefined) => value !== null && value !== undefined && !isNaN(value) && value.toString().length === 4,
        message: "Este campo debe tener exactamente 4 dígitos.",
      },
    ],
  },
  comentarios: {
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
  factibilidad_obra: {
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
  prioridad: {
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
  tipo_proyecto: {
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
  estatus_proyecto: {
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
  cartera_estatus: {
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
  pais: {
    rules: [
    /*   {
        validation: (value: string) => value && value.length > 0,
        message: "Campo requerido.",
      },
      {
        validation: (value: string) => value && value.length < 121,
        message: "Maximo 120 caracteres.",
      }, */
    ],
  },
  entidad_federativa: {
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
  fase: {
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
  unidad_responsable: {
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
  area: {
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
};
