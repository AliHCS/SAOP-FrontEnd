export const porcentajeIndirectoValidations: any = {
  indirectos_totales: {
    rules: [
      {
        validation: (value: number) => value !== null && value !== undefined,
        message: "El valor es requerido.",
      },
    ],
  },
  monto_propuesta: {
    rules: [
      {
        validation: (value: number) => value !== null && value !== undefined,
        message: "El monto es requerido.",
      },
    ],
  },
  puntuacion_economica: {
    rules: [
      {
        validation: (value: number) => value !== null && value !== undefined,
        message: "La puntuación es requerida.",
      },
    ],
  },
  puntuacion_tecnica: {
    rules: [
      {
        validation: (value: number) => value !== null && value !== undefined,
        message: "La puntuación es requerida.",
      },
    ],
  },
  porcentaje_financiamiento: {
    rules: [
      {
        validation: (value: number) => value !== null && value !== undefined,
        message: "El porcentaje de financiamiento es requerido.",
      },
      {
        validation: (value: number) => value >= 0 && value <= 100,
        message: "El porcentaje de financiamiento debe estar entre 0 y 100.",
      },
    ],
  },
  porcentaje_indirecto: {
    rules: [
      {
        validation: (value: number) => value !== null && value !== undefined,
        message: "El porcentaje indirecto es requerido.",
      },
      {
        validation: (value: number) => value >= 0 && value <= 100,
        message: "El porcentaje indirecto debe estar entre 0 y 100.",
      },
    ],
  },
  porcentaje_iva: {
    rules: [
      {
        validation: (value: number) => value !== null && value !== undefined,
        message: "El porcentaje de IVA es requerido.",
      },
      {
        validation: (value: number) => value >= 0 && value <= 100,
        message: "El porcentaje de IVA debe estar entre 0 y 100.",
      },
    ],
  },
  porcentaje_utilidad: {
    rules: [
      {
        validation: (value: number) => value !== null && value !== undefined,
        message: "El porcentaje de utilidad es requerido.",
      },
      {
        validation: (value: number) => value >= 0 && value <= 100,
        message: "El porcentaje de utilidad debe estar entre 0 y 100.",
      },
    ],
  },
};
