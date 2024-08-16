export default interface CatEstatus {
  id?: string | null;
  clave: string;
  descripcion: string;
  fecha: string | null;
  fk_proceso: string | number;
}
  