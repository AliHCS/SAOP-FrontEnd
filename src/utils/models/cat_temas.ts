export interface ITema {
  descripcion: string | null;
  tema: string | null;
  libro: string | null;
  publicacion: string | null;
}

export const defaultValues: ITema = {
  descripcion: null,
  tema: null,
  libro: null,
  publicacion: null,
};
