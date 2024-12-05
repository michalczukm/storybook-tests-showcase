import { describe, expect, it, beforeAll, afterAll, afterEach, assert } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
import { type ProductsFilters, useProducts } from "./useProducts";
import { productsHandler } from "../data/msw";
import { mockProductsList } from '../data/mockData';

const server = setupServer(productsHandler());

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("useProducts", () => {
  it("fetches products successfully", async () => {
    const { result } = renderHook(() =>
      useProducts({ sortBy: "price-asc" }),
    );

    // Initially loading
    expect(result.current.status).toBe("loading");

    // Wait for data to load
    await waitFor(() => {
      expect(result.current.status).toBe("success");
    });

    const expectedProducts = mockProductsList.sort((a, b) => a.price - b.price);

    assert(result.current.status === "success");

    expect(result.current.products).toEqual(expectedProducts);
    expect(result.current.isLoading).toBe(false);
  });

  it("filters products by price range", async () => {
    const { result } = renderHook(() =>
      useProducts({
        minPrice: "60",
        maxPrice: "100",
        sortBy: "price-asc",
      }),
    );

    await waitFor(() => {
      expect(result.current.status).toBe("success");
    });

    assert(result.current.status === "success");
    expect(result.current.products).toEqual(
      mockProductsList.filter(
        (product) => product.price >= 60 && product.price <= 100,
      ),
    );
  });

  it("sorts products by price ascending", async () => {
    const { result } = renderHook(() =>
      useProducts({ sortBy: "price-asc" }),
    );

    await waitFor(() => {
      expect(result.current.status).toBe("success");
    });

    assert(result.current.status === "success");

    const sortedProducts = [...result.current.products];
    expect(sortedProducts).toEqual(
      sortedProducts.sort((a, b) => a.price - b.price),
    );
  });

  it("sorts products by rating descending", async () => {
    const { result } = renderHook(() =>
      useProducts({ sortBy: "rating-desc" }),
    );

    await waitFor(() => {
      expect(result.current.status).toBe("success");
    });

    assert(result.current.status === "success");

    const sortedProducts = [...result.current.products];
    expect(sortedProducts).toEqual(
      sortedProducts.sort((a, b) => b.rating - a.rating),
    );
  });

  it("handles server error", async () => {
    server.use(
      http.get("/api/products", () => {
        return new HttpResponse(null, { status: 500 });
      }),
    );

    const { result } = renderHook(() =>
      useProducts({ sortBy: "price-asc" }),
    );

    await waitFor(() => {
      expect(result.current.status).toBe("error");
    });

    assert(result.current.status === "error");
    expect(result.current.error).toBeTruthy();
  });

  it("re-fetches data when called", async () => {
    const { result } = renderHook(() =>
      useProducts({ sortBy: "price-asc" }),
    );

    await waitFor(() => {
      expect(result.current.status).toBe("success");
    });

    // Modify server response
    server.use(
      http.get("/api/products", () => {
        return HttpResponse.json([mockProductsList[0]]);
      }),
    );

    // Trigger refetch
    await result.current.refetch();

    await waitFor(() => {
      assert(result.current.status === "success");
      expect(result.current.products).toHaveLength(1);
    });

  });

  it("updates when filters change", async () => {
    const { result, rerender } = renderHook(
      (props) => useProducts(props),
      {
        initialProps: { sortBy: "price-asc" } as ProductsFilters,
      },
    );

    await waitFor(() => {
      expect(result.current.status).toBe("success");
    });

    // Change filters
    rerender({ sortBy: "price-desc" as const });

    await waitFor(() => {
      assert(result.current.status === "success");
      expect(result.current.products).toEqual(
        [...mockProductsList].sort((a, b) => b.price - a.price),
      );
    });
  });
});
