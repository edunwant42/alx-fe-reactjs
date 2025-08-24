# React Query Demo, Posts

Small demo showing how to fetch and cache data with @tanstack/react-query.

What this demo shows
- QueryClientProvider setup and a simple `useQuery` usage.
- Manual refetch with `refetch()` and visual `isFetching` state.
- Common query options used in the demo: `staleTime` (5 minutes) and `cacheTime` (30 minutes).

Files to look at
- `src/components/PostsComponent.jsx`: fetch function, `useQuery` call, and the "Refetch posts" button.
- `src/main.jsx`: `QueryClient` and `QueryClientProvider` setup.
Run locally
1. Install dependencies (from the `react-query-demo` folder):

```bash
npm install @tanstack/react-query
```

2. Start the dev server:

```bash
npm run dev
```

Open the printed URL (typically `http://localhost:5173/`) in your browser.

Refetch behavior (what happens when you click the button)
- Clicking the "Refetch posts" button calls the query's `refetch()` function which explicitly runs the `queryFn` (the network fetch).
- A network request to `https://jsonplaceholder.typicode.com/posts` is performed and the returned JSON updates the query cache.
- `isFetching` becomes `true` while the refetch is in progress (the button shows "Refreshing..." and is disabled). `isLoading` is only true on the initial load.
