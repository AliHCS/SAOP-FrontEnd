export interface IPublicacion {
  descripcion: string | null;
  tipo: string | null;
}

export const defaultValues: IPublicacion = {
  descripcion: null,
  tipo: null,
};
