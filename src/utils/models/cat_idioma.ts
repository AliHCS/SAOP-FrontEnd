export interface ICatIdioma {
  id?: string | null; // Clave heredada de progress, nullable
  clave: string | null; // Clave heredada de progress, nullable
  descripcion: string | null; // Descripcion subestatus, maxLength: 1024, minLength: 1
}

export const defaultValues: ICatIdioma = {
  clave: null,
  descripcion: null,
};
