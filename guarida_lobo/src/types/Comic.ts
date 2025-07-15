export interface Comic {
  id: string;
  nombre: string;
  precio: number;
  portada_url: string;
  descripcion: string;
  related: Comic[];
}
