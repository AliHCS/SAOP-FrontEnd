export interface ILibro {
  descripcion: string | null;
  libro: string | null;
  publicacion: string | null;
}

export const defaultValues: ILibro = {
  descripcion: null,
  libro: null,
  publicacion: null,
};
