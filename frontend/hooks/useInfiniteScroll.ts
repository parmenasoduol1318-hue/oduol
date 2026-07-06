import { useCallback, useEffect, useState } from "react";

export interface InfiniteScrollOptions<T> {
  fetchPage: (page: number) => Promise<T[]>;
  initialPage?: number;
  pageSize?: number;
  enabled?: boolean;
}

export const useInfiniteScroll = <T,>({
  fetchPage,
  initialPage = 1,
  enabled = true,
}: InfiniteScrollOptions<T>) => {
  const [data, setData] = useState<T[]>([]);
  const [page, setPage] = useState(initialPage);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPage = useCallback(
    async (pageNumber: number) => {
      if (!enabled || loading || !hasMore) return;

      setLoading(true);
      setError(null);

      try {
        const newItems = await fetchPage(pageNumber);

        if (!newItems || newItems.length === 0) {
          setHasMore(false);
          return;
        }

        setData((prev) => [...prev, ...newItems]);
        setPage(pageNumber);
      } catch (err: any) {
        setError(err?.message || "Failed to load data");
      } finally {
        setLoading(false);
      }
    },
    [fetchPage, enabled, loading, hasMore]
  );

  useEffect(() => {
    if (enabled) {
      loadPage(initialPage);
    }
  }, [enabled]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      loadPage(page + 1);
    }
  }, [page, loading, hasMore, loadPage]);

  const reset = useCallback(() => {
    setData([]);
    setPage(initialPage);
    setHasMore(true);
    setError(null);
  }, [initialPage]);

  return {
    data,
    page,
    loading,
    hasMore,
    error,
    loadMore,
    reset,
  };
};