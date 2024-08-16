export interface IEtiqueta {
    etiqueta: string | null;
    vista: string | null;
    usa_imagen: boolean;
    antes_descripcion: boolean;
    publicacion: string | null;
    libro: string | null;
    tema: string | null;
    parte: string | null;
    titulo: string | null;
    capitulo: string | null;

  }
  
  export const defaultValues: IEtiqueta = {
    etiqueta: null,
    vista: null,
    usa_imagen: false,
    antes_descripcion: false,
    publicacion: null,
    libro: null,
    tema: null,
    parte: null,
    titulo: null,
    capitulo: null,
  };
  