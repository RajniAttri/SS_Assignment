import type { Product } from "@/types/product";
import fallbackProducts from "@/lib/fallback-products.json";

const PRODUCTS_URL = "https://fakestoreapi.com/products";

export interface ProductsResult {
  products: Product[];
  /** True when the live API failed and we served the bundled JSON copy instead. */
  usedFallback: boolean;
}

//  Fetches the product list on the server.

export async function getProducts(): Promise<ProductsResult> {
  try {
    const res = await fetch(PRODUCTS_URL, { cache: "no-store" });
    console.log(res);
    
    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }

    const products = (await res.json()) as Product[];
    return { products, usedFallback: false };
  } catch {
    return { products: fallbackProducts as Product[], usedFallback: true };
  }
}
