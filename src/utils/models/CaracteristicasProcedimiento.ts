export interface ICaracteristicasProcedimiento {
  idPeocedimiento?: string | null;
  moneda: number | string | null;
  idioma: number | string | null;
  modalidad_pago: number | string | null;
  periodo_pago: number | string | null;
  presupuesto_base: string | null;
  capital_contable_requerido: string | null;
  usa_testigo_social: boolean;
  testigo_social: number | string | null;
  visita_sitio: boolean;
}

export const defaultValues: ICaracteristicasProcedimiento = {
  moneda: null,
  idioma: null,
  modalidad_pago: null,
  periodo_pago: null,
  presupuesto_base: null,
  capital_contable_requerido: null,
  usa_testigo_social: false,
  testigo_social: null,
  visita_sitio: false,
};
