export interface IFinancialData {
    anio_base: string|null;
    financiamiento_adicional: string|null;
    inversion_total: string|null;
    gastos_de_estimaciones_operacionales: string|null;
    otros_costos: string|null;
    valor_presente_neto: string|null;
    costo_anual_equivalente: string|null;
    aportacion_estatal: string|null;
    tasa_interna_de_retorno: string|null;
    tasa_de_rendimiento_inmediata: string|null;
    tasa_de_descuento: string|null;
    cartera_proyecto_inversion: String|null;
    id: Number|null;
  }
  
  export const defaultValues: IFinancialData = {
    anio_base: null,
    financiamiento_adicional: null,
    inversion_total: null,
    gastos_de_estimaciones_operacionales: null,
    otros_costos: null,
    valor_presente_neto: null,
    costo_anual_equivalente: null,
    aportacion_estatal: null,
    tasa_interna_de_retorno: null,
    tasa_de_rendimiento_inmediata: null,
    tasa_de_descuento: null,
    cartera_proyecto_inversion: null,
    id: null
  };
  