export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  stock: number;
  rating: number;
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  discount: number;
  endDate: Date;
}
