import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProductCard } from "./ProductCard";
import type { Product } from "../../data/types";

const mockProduct: Product = {
  id: "1",
  name: "Test Product",
  price: 99.99,
  description: "Test description",
  image: "test-image.jpg",
  stock: 10,
  rating: 4.5,
};

// render(
//   <ProductCard
//     product={mockProduct}
//     onAddToCart={vi.fn()}
//     onRatingChange={vi.fn()}
//   />,
// );

describe("ProductCard", () => {
  it("renders product information correctly", () => {

  });

  it("shows correct stock status badge for in stock items", () => {

  });

  it("shows correct stock status badge for low stock items", () => {

  });


  it("disables add to cart button when out of stock", () => {
  });

  it("calls onAddToCart when add to cart button is clicked", async () => {
  });
});
