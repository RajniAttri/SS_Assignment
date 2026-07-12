"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/types/product";
import SearchBar from "./SearchBar";
import ProductCard from "./ProductCard";
import styles from "./ProductGrid.module.css";

interface ProductGridProps {
  products: Product[];
  usedFallback: boolean;
}

export default function ProductGrid({
  products,
  usedFallback,
}: ProductGridProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) => p.title.toLowerCase().includes(q));
  }, [products, query]);

  return (
    <>
      {/* {usedFallback && (
        <p className={styles.notice} role="status">
          Couldn&apos;t reach the store — showing a saved copy of the products.
        </p>
      )} */}

      <SearchBar
        value={query}
        onChange={setQuery}
        resultCount={filtered.length}
      />

      {filtered.length === 0 ? (
        <div className={styles.empty}>
          <p className={styles.emptyTitle}>No products found</p>
          <p className={styles.emptyText}>
            Nothing matches “{query}”. Try a different search.
          </p>
        </div>
      ) : (
        <ul className={styles.grid}>
          {filtered.map((product) => (
            <li key={product.id} className={styles.gridItem}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
