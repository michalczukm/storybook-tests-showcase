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
    expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
    expect(
      screen.getByText(`$${mockProduct.price.toFixed(2)}`),
    ).toBeInTheDocument();
    expect(screen.getByAltText(mockProduct.name)).toBeInTheDocument();
  });

  it("shows correct stock status badge for in stock items", () => {
    render(
      <ProductCard
        product={{ ...mockProduct, stock: 10 }}
        onAddToCart={vi.fn()}
      />,
    );

    const badge = screen.getByText("In Stock");
    expect(badge).toHaveClass("bg-green-100", "text-green-800");
  });

  it("shows correct stock status badge for low stock items", () => {
    render(
      <ProductCard
        product={{ ...mockProduct, stock: 3 }}
        onAddToCart={vi.fn()}
      />,
    );

    const badge = screen.getByText("Low Stock");
    expect(badge).toHaveClass("bg-yellow-100", "text-yellow-800");
  });

  it("shows correct stock status badge for out of stock items", () => {
    render(
      <ProductCard
        product={{ ...mockProduct, stock: 0 }}
        onAddToCart={vi.fn()}
      />,
    );

    const badge = screen.getByText("Out of Stock");
    expect(badge).toHaveClass("bg-red-100", "text-red-800");
  });

  it("disables add to cart button when out of stock", () => {
    render(
      <ProductCard
        product={{ ...mockProduct, stock: 0 }}
        onAddToCart={vi.fn()}
      />,
    );

    const button = screen.getByText("Add to Cart");
    expect(button).toBeDisabled();
  });

  it("calls onAddToCart when add to cart button is clicked", async () => {
    const onAddToCart = vi.fn();
    const user = userEvent.setup();

    render(<ProductCard product={mockProduct} onAddToCart={onAddToCart} />);

    const button = screen.getByText("Add to Cart");
    await user.click(button);

    expect(onAddToCart).toHaveBeenCalledTimes(1);
    expect(onAddToCart).toHaveBeenCalledWith(mockProduct);
  });

  it("displays correct number of filled stars based on rating", () => {
    render(
      <ProductCard
        product={{ ...mockProduct, rating: 3 }}
        onAddToCart={vi.fn()}
      />,
    );

    const stars = screen.getAllByRole("button");
    const filledStars = stars.filter((star) => star.getAttribute("data-star"));
    expect(filledStars).toHaveLength(3);
  });

  it("allows rating change when onRatingChange is provided", async () => {
    const onRatingChange = vi.fn();
    const user = userEvent.setup();

    render(
      <ProductCard
        product={mockProduct}
        onAddToCart={vi.fn()}
        onRatingChange={onRatingChange}
      />,
    );

    const stars = screen.getAllByRole("button");
    await user.click(stars[4]); // Click the 5th star

    expect(onRatingChange).toHaveBeenCalledTimes(1);
    expect(onRatingChange).toHaveBeenCalledWith(5);
  });

  it("makes rating readonly when onRatingChange is not provided", async () => {
    const user = userEvent.setup();

    render(<ProductCard product={mockProduct} onAddToCart={vi.fn()} />);

    const stars = screen.getAllByRole("button");
    await user.click(stars[4]); // Click the 5th star

    // Rating should remain unchanged
    const filledStars = stars.filter((star) => star.getAttribute("data-star"));
    expect(filledStars).toHaveLength(Math.floor(mockProduct.rating));
  });

  it("truncates long descriptions", () => {
    const longDescription = "A".repeat(200);

    render(
      <ProductCard
        product={{ ...mockProduct, description: longDescription }}
        onAddToCart={vi.fn()}
      />,
    );

    const description = screen.getByText(longDescription);
    expect(description).toHaveClass("line-clamp-2");
  });

  it("applies hover styles to the card", async () => {
    const user = userEvent.setup();

    const { container } = render(
      <ProductCard product={mockProduct} onAddToCart={vi.fn()} />,
    );

    const card = container.firstChild as HTMLElement;
    await user.hover(card);

    expect(card).toHaveClass("hover:shadow-md");
  });
});
