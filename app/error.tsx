"use client";

import styles from "./error.module.css";

// Error boundary for the route. `reset()` re-runs the server render, which
// re-attempts the product fetch — that is the "retry" action.
export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className={styles.main} role="alert">
      <div className={styles.box}>
        <h1 className={styles.title}>Something went wrong</h1>
        <p className={styles.text}>
          We couldn&apos;t load the products right now. Please try again.
        </p>
        <button className={styles.button} onClick={reset}>
          Retry
        </button>
      </div>
    </main>
  );
}
