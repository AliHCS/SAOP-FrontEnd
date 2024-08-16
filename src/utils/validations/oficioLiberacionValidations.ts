export const oficioLiberacionValidations: any = {
    fecha_oficio: {
      rules: [
        {
            validation: (value: string) => value && value.toString().length > 0,
            message: "Campo requerido.",
        },
        {
            validation: (value: string) => !isNaN(Date.parse(value)),
            message: "Debe ser una fecha válida.",
        },
      ],
    },
    oficio: {
        rules: [
            {
                validation: (value: string) => value && value.toString().length > 0,
                message: "Campo requerido.",
            },
            {
                validation: (value: string) => value && value.length < 257,
                message: "Máximo 256 caracteres .",
            },
        ],
    },
    pagina_oficio: {
        rules: [
            {
                validation: (value: string|number) => value && value.toString().length > 0,
                message: "Campo requerido.",
            },
            {
                validation: (value: string) => !isNaN(Number(value)),
                message: "Debe ser un número.",
            },
        ],
    }
};
  