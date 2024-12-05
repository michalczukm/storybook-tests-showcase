import type { SortBy } from "../hooks/useProducts";
import { mockProductsList, mockPromotionsList } from "./mockData";
import { http, HttpResponse, delay } from "msw";
import type { Product } from "./types";
import { mockPromotions } from "./mockData";

export const productsHandler = (
  options: { delay?: number; status: 200 | 500 | 400 } = { status: 200 },
  products: Product[] = mockProductsList,
) => {
  return http.get("/api/products", async ({ request }) => {
    console.log("HERE!")
    if (options.status === 500) {
      return new HttpResponse(null, { status: 500 });
    }

    if (options.status === 400) {
      return new HttpResponse(null, { status: 400 });
    }

    if (options.delay) await delay(options.delay);

    const url = new URL(request.url);
    const searchParams = url.searchParams;
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const sortBy = searchParams.get("sortBy") as SortBy | null;

    const filteredProducts = products.filter((product) => {
      const price = product.price;
      return (
        (!minPrice || price >= Number(minPrice)) &&
        (!maxPrice || price <= Number(maxPrice))
      );
    });

    const sortedProducts = filteredProducts.toSorted((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "rating-desc":
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

    return HttpResponse.json(sortedProducts);
  });
};

export const promotionsHandler = (
  options: { delay?: number; status?: number } = {},
) => {
  return http.get("/api/promotions", async ({ request }) => {
    if (options.status === 500) {
      return new HttpResponse(null, { status: 500 });
    }

    if (options.delay) {
      await delay(options.delay);
    }

    const url = new URL(request.url);
    const state = url.searchParams.get("state");

    if (state === "ongoing") {
      return HttpResponse.json(mockPromotions.ongoing);
    }

    if (state === "upcoming") {
      return HttpResponse.json(mockPromotions.upcoming);
    }

    return HttpResponse.json(mockPromotionsList);
  });
};
