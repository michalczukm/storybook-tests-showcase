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
    render(
      <ProductCard
        product={mockProduct}
        onAddToCart={vi.fn()}
        onRatingChange={vi.fn()}
      />,
    );

    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    expect(screen.getByText(`$${mockProduct.price.toFixed(2)}`)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
  });

  it("shows correct stock status badge for in stock items", () => {
    render(
      <ProductCard
        product={{...mockProduct, stock: 10}}
        onAddToCart={vi.fn()}
        onRatingChange={vi.fn()}
      />,
    );

    expect(screen.getByText("In Stock")).toBeInTheDocument();
  });

  it("shows correct stock status badge for low stock items", () => {
    render(
      <ProductCard
        product={{...mockProduct, stock: 3}}
        onAddToCart={vi.fn()}
        onRatingChange={vi.fn()}
      />,
    );

    expect(screen.getByText("Low Stock")).toBeInTheDocument();
  });


  it("disables add to cart button when out of stock", () => {
    render(
      <ProductCard
        product={{...mockProduct, stock: 0}}
        onAddToCart={vi.fn()}
        onRatingChange={vi.fn()}
      />,
    );

    expect(screen.getByText("Our of Stock")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("calls onAddToCart when add to cart button is clicked", async () => {
    const onAddToCart = vi.fn();
    render(
      <ProductCard product={mockProduct} onAddToCart={onAddToCart} onRatingChange={vi.fn()} />
    );

    await userEvent.click(screen.getByRole("button"));
    expect(onAddToCart).toHaveBeenCalledWith(mockProduct.id);
  });
});
