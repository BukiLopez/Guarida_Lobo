export interface Comic {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  description: string;
  related: Comic[];
}
