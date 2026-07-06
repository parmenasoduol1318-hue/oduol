import { useCallback, useState } from "react";
import api from "../lib/api";
import { logger } from "../lib/logger";

export interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export const useApi = <T,>() => {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const request = useCallback(
    async <R = T>(
      method: "get" | "post" | "put" | "delete",
      url: string,
      body?: any
    ): Promise<R | null> => {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const response = await api.request<R>({
          method,
          url,
          data: body,
        });

        setState({
          data: response.data as any,
          loading: false,
          error: null,
        });

        return response.data;
      } catch (err: any) {
        const message =
          err?.response?.data?.detail ||
          err?.message ||
          "API request failed";

        logger.error("API error", err);

        setState({
          data: null,
          loading: false,
          error: message,
        });

        return null;
      }
    },
    []
  );

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
    });
  }, []);

  return {
    ...state,
    request,
    reset,
  };
};