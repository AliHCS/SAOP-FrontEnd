export interface IOficioLiberacionData {
    oficio: string|null;
    fecha_oficio: string|null;
    pagina_oficio: string|Number|null;
    id: Number|string|null;
  }
  
  export const defaultValues: IOficioLiberacionData = {
    oficio: '',
    fecha_oficio: '',
    pagina_oficio: '',
    id: ''
  };
  