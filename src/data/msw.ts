import type { SortBy } from "../hooks/useProducts";
import { mockProducts } from "./mockData";
import type { Product } from "./mockData";
import { http, HttpResponse, delay } from "msw";

export const productsHandler = (
  options: { delay?: number; status: 200 | 500 | 400 } = { status: 200 },
  products: Product[] = mockProducts,
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
