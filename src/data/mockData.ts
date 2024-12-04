export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  stock: number;
  rating: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Mechanical Keyboard",
    price: 159.99,
    description: "RGB mechanical keyboard with Cherry MX switches",
    image: "https://placeholder.com/150",
    stock: 10,
    rating: 4.5
  },
  {
    id: "2",
    name: "Gaming Mouse",
    price: 79.99,
    description: "High-DPI gaming mouse with programmable buttons",
    image: "https://placeholder.com/150",
    stock: 15,
    rating: 4.8
  },
  // Add more mock products...
];

export const mockUser: User = {
  id: "u1",
  name: "John Doe",
  email: "john@example.com",
  avatar: "https://placeholder.com/50"
}; 