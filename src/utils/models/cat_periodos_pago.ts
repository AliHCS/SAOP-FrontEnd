export interface ICatPeriodoPago {
    id: string | null;
    clave: string | null;
    descripcion_periodo_pago: string | null;
  }
  
  export const defaultValues: ICatPeriodoPago = {
    id: null,
    clave: null,
    descripcion_periodo_pago: null,
  };