import type React from "react";
import { useCallback, useState } from "react";
import type { Product } from "../../data/types";
import { PriceFilter } from "../molecules/PriceFilter";
import { ProductCard } from "../molecules/ProductCard";
import { SortSelector } from "../molecules/SortSelector";
import {
  type ProductsFilters,
  type SortBy,
  useProducts,
} from "../../hooks/useProducts";

interface ProductStackProps {
  onAddToCart: (product: Product) => void;
  onRatingChange?: (productId: string, rating: number) => void;
}

const sortOptions = [
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A to Z" },
  { value: "name-desc", label: "Name: Z to A" },
  { value: "rating-desc", label: "Rating: High to Low" },
] satisfies { value: SortBy; label: string }[];

export const ProductStack: React.FC<ProductStackProps> = ({
  onAddToCart,
  onRatingChange,
}) => {
  const [filters, setFilters] = useState<ProductsFilters>({
    sortBy: "price-asc",
  });

  const productsResponse = useProducts(filters);

  const handlePriceFilterApply = useCallback(() => {
    productsResponse.refetch();
  }, [productsResponse]);

  const handlePriceFilterReset = useCallback(() => {
    setFilters((filters) => ({
      sortBy: filters.sortBy,
    }));
  }, []);

  const handleRatingChange = useCallback(
    (productId: string) => (rating: number) => {
      onRatingChange?.(productId, rating);
    },
    [onRatingChange],
  );

  if (productsResponse.status === "error") {
    return (
      <div className="text-center text-red-600">
        Error loading products: {productsResponse.error?.message}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-start items-start gap-4">
        <PriceFilter
          minPrice={filters.minPrice ?? ""}
          maxPrice={filters.maxPrice ?? ""}
          onMinChange={(minPrice) =>
            setFilters((filters) => ({ ...filters, minPrice }))
          }
          onMaxChange={(maxPrice) =>
            setFilters((filters) => ({ ...filters, maxPrice }))
          }
          onApply={handlePriceFilterApply}
          onReset={handlePriceFilterReset}
        />
        <SortSelector
          value={filters.sortBy}
          onChange={(sortBy) =>
            setFilters((filters) => ({ ...filters, sortBy }))
          }
          options={sortOptions}
        />
      </div>

      <hr />

      {productsResponse.status === "loading" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div
              // biome-ignore lint/suspicious/noArrayIndexKey: Skeleton loading
              key={index}
              className="h-96 bg-gray-100 rounded-lg animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productsResponse.products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onRatingChange={
                onRatingChange ? handleRatingChange(product.id) : undefined
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};
