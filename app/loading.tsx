import styles from "./loading.module.css";

// Shown while the server component is fetching the product list.
export default function Loading() {
  return (
    <main className={styles.main} aria-busy="true" aria-label="Loading products">
      <div className={styles.headerBar} />
      <div className={styles.searchBar} />
      <div className={styles.grid}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className={styles.card}>
            <div className={styles.image} />
            <div className={styles.line} />
            <div className={`${styles.line} ${styles.short}`} />
          </div>
        ))}
      </div>
    </main>
  );
}
