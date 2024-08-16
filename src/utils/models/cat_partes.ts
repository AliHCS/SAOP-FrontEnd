export interface IParte {
  descripcion: string | null;
  tema: string | null;
  libro: string | null;
  publicacion: string | null;
}

export const defaultValues: IParte = {
  descripcion: null,
  tema: null,
  libro: null,
  publicacion: null,
};
