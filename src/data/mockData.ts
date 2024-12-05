import type { Product, Promotion } from "./types";
import { addHours } from "date-fns";

export const mockProductsList: Product[] = [
  {
    id: "1",
    name: "Mechanical Keyboard",
    price: 159.99,
    description: "RGB mechanical keyboard with Cherry MX switches",
    image: "https://placeholder.com/150",
    stock: 10,
    rating: 4.5,
  },
  {
    id: "2",
    name: "Gaming Mouse",
    price: 79.99,
    description: "High-DPI gaming mouse with programmable buttons",
    image: "https://placeholder.com/150",
    stock: 15,
    rating: 4.8,
  },
  {
    id: "3",
    name: "Wireless Earbuds",
    price: 59.99,
    description: "Noise-cancelling wireless earbuds with touch controls",
    image: "https://placeholder.com/150",
    stock: 20,
    rating: 4.2,
  },
];

export const mockPromotions = {
  ongoing: [
    {
      id: "1",
      title: "Summer Sale",
      description: "Get amazing discounts on summer collection",
      discount: 20,
      endDate: addHours(new Date(), 24),
    },
    {
      id: "2",
      title: "Flash Sale",
      description: "Limited time offer on selected items",
      discount: 30,
      endDate: addHours(new Date(), 2),
    },
  ],
  upcoming: [
    {
      id: "3",
      title: "Winter Sale",
      description: "Get amazing discounts on winter collection",
      discount: 20,
      endDate: new Date("2024-12-24"),
    },
  ],
} satisfies Record<string, Promotion[]>;

export const mockPromotionsList = Object.values(mockPromotions).flat();