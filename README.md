# Product Listing

A small, responsive product listing page built with Next.js 15 (App Router). It
fetches products from the [Fake Store API](https://fakestoreapi.com/products),
renders them as a responsive card grid, and lets you filter by title on the
client.

**Live demo:** [_Vercel URL_](https://ss-assignment-4rpp.vercel.app/)

## Features

- Server-side fetch of the product list with a local JSON fallback if the API is
  unavailable.
- Loading skeleton (`app/loading.tsx`) while the data is being fetched.
- Error boundary with a **Retry** action (`app/error.tsx`).
- Responsive card grid: 1 column on mobile, 2 on tablet, 3–4 on desktop.
- Client-side, case-insensitive search that filters by product title.
- Friendly empty state when a search matches nothing.

## Tech stack

- **Next.js 15** (App Router)
- **React 19**
- **TypeScript**
- **Plain CSS Modules**, mobile-first (no UI component library)

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Run the dev server
npm run dev
# open http://localhost:3000

# 3. Production build
npm run build
npm start
```

Requires Node.js 18.18+ (built and tested on Node 22).

## Project structure

```
app/
  layout.tsx           Root layout
  page.tsx             Server component: fetches data, renders the grid
  loading.tsx          Loading skeleton (fetch in progress)
  error.tsx            Error boundary with retry
components/
  ProductGrid.tsx      Client component: search state + filtering + empty state
  ProductCard.tsx      Single product card
  SearchBar.tsx        Controlled search input
lib/
  api.ts               Fetch helper with fallback handling
  fallback-products.json  Offline copy of the API response
types/
  product.ts           Product type
```

## How loading, error, and fallback fit together

The live API is the source of truth. `getProducts()` fetches it on the server:

- While the request is in flight, `loading.tsx` shows a skeleton grid.
- If the live API request fails for any reason (network issues, downtime, or an HTTP error such as 403), the application automatically serves the bundled `fallback-products.json` dataset and displays a notice indicating that a saved copy is being shown.
- `error.tsx` is the route-level safety net for any unexpected render error and
  offers a **Retry** button (which re-runs the server fetch).

## What I'd improve with more time

- Add unit tests for the filtering logic and component tests for the empty and
  fallback states.
- Debounce the search input and reflect the query in the URL so searches are
  shareable and survive a refresh.
- Add category filtering and price/rating sorting.
- Cache the API response with `revalidate` instead of `no-store`, plus a
  proper retry/backoff on the server fetch.

## How I would test this page

I'd unit-test the title-filter logic (match, no-match, case-insensitivity) with
Jest, and add React Testing Library tests that render `ProductGrid` to assert the
grid renders, the search box filters results, and the empty state appears when
nothing matches. An end-to-end smoke test (Playwright) would confirm the page
loads and search works against the deployed site.
