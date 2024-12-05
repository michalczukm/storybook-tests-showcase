import { useCallback, useEffect, useState } from "react";
import type { Product } from "../data/mockData";

export type SortBy =
  | "price-asc"
  | "price-desc"
  | "name-asc"
  | "name-desc"
  | "rating-desc";

export interface ProductsFilters {
  minPrice?: string;
  maxPrice?: string;
  sortBy: SortBy;
}

export type ProductsResponse = (
  | {
      status: "loading";
      isLoading: true;
      products: Product[];
    }
  | {
      status: "success";
      products: Product[];
      isLoading: false;
    }
  | {
      status: "error";
      error: Error | null;
    }
) & {
  refetch: () => Promise<void>;
};

export const useProducts = (
  { minPrice, maxPrice, sortBy }: ProductsFilters = {
    sortBy: "price-asc",
  },
): ProductsResponse => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const params = new URLSearchParams();
      if (minPrice) params.append("minPrice", minPrice);
      if (maxPrice) params.append("maxPrice", maxPrice);
      if (sortBy) params.append("sortBy", sortBy);

      const response = await fetch(`/api/products?${params.toString()}`);

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Unknown error occurred"),
      );
    } finally {
      setIsLoading(false);
    }
  }, [minPrice, maxPrice, sortBy]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    isLoading,
    error,
    refetch: fetchProducts,
  };
};
