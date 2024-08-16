// data.ts
export interface ISuboption {
  id: number;
  label: string;
  suboptions?: ISuboption[];
  open: boolean;
  etiquetas?: any[];
  libro?: string | number;
  tema?: string | number;
  parte?: string | number;
  tipo?: string,
  clasificacion: string | undefined;
}
export interface IOption {
  id: number;
  label: string;
  suboptions?: ISuboption[];
  open: boolean;
  libro?: string | number;
  tema?: string | number;
  tipo?: string
}
