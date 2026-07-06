// frontend/lib/errors.ts

export type AppError = {
  message: string;
  code?: string | number;
  status?: number;
  details?: any;
};

export class ApiError extends Error {
  status?: number;
  code?: string | number;
  details?: any;

  constructor(message: string, status?: number, code?: string | number, details?: any) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

/**
 * Normalize any thrown error into a safe app error shape
 */
export function normalizeError(error: unknown): AppError {
  if (error instanceof ApiError) {
    return {
      message: error.message,
      status: error.status,
      code: error.code,
      details: error.details,
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message,
    };
  }

  return {
    message: "Unknown error occurred",
    details: error,
  };
}

/**
 * Extract error message safely from API response
 */
export function getErrorMessage(error: any): string {
  if (!error) return "Something went wrong";

  if (typeof error === "string") return error;

  if (error?.response?.data?.detail) {
    return error.response.data.detail;
  }

  if (error?.response?.data?.message) {
    return error.response.data.message;
  }

  if (error?.message) {
    return error.message;
  }

  return "Something went wrong";
}

/**
 * Check if error is network related
 */
export function isNetworkError(error: any): boolean {
  return (
    error?.message === "Network Error" ||
    error?.code === "ECONNABORTED" ||
    !error?.response
  );
}