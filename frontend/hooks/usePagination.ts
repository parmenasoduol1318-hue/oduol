// frontend/hooks/usePagination.ts

import { useState } from "react";

type UsePaginationOptions = {
  initialPage?: number;
  pageSize?: number;
};

/**
 * Simple pagination hook for lists & API data
 */
export function usePagination(options?: UsePaginationOptions) {
  const [page, setPage] = useState(options?.initialPage || 1);
  const [pageSize] = useState(options?.pageSize || 20);

  /**
   * Go to next page
   */
  const nextPage = () => setPage((p) => p + 1);

  /**
   * Go to previous page
   */
  const prevPage = () => setPage((p) => Math.max(1, p - 1));

  /**
   * Go to specific page
   */
  const goToPage = (pageNumber: number) => {
    if (pageNumber < 1) return;
    setPage(pageNumber);
  };

  /**
   * Reset pagination
   */
  const reset = () => setPage(1);

  /**
   * Calculate offset for API requests
   */
  const offset = (page - 1) * pageSize;

  return {
    page,
    pageSize,
    offset,
    nextPage,
    prevPage,
    goToPage,
    reset,
    setPage,
  };
}