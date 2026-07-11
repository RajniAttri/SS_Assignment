import { getProducts } from "@/lib/api";
import ProductGrid from "@/components/ProductGrid";
import styles from "./page.module.css";

// The product list is fetched per request so the loading state (loading.tsx)
// is exercised and the data stays fresh.
export const dynamic = "force-dynamic";

export default async function Home() {
  const { products, usedFallback } = await getProducts();

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1 className={styles.title}>Products</h1>
        <p className={styles.subtitle}>
          Browse the catalogue and search by product name.
        </p>
      </header>

      <ProductGrid products={products} usedFallback={usedFallback} />
    </main>
  );
}
