// frontend/lib/network.ts

/**
 * SwiftReply Network Layer
 * Centralized API request handler
 */

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://swiftreply-njbt.onrender.com";

export interface RequestOptions extends RequestInit {
  token?: string;
}

/**
 * Generic request handler
 */
export async function request<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { token, headers, ...rest } = options;

  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      ...rest,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.detail || "Request failed");
    }

    return data as T;
  } catch (error: any) {
    console.error("Network error:", error.message);
    throw error;
  }
}

/**
 * GET request
 */
export function get<T>(endpoint: string, token?: string) {
  return request<T>(endpoint, { method: "GET", token });
}

/**
 * POST request
 */
export function post<T>(endpoint: string, body: any, token?: string) {
  return request<T>(endpoint, {
    method: "POST",
    body: JSON.stringify(body),
    token,
  });
}

/**
 * PUT request
 */
export function put<T>(endpoint: string, body: any, token?: string) {
  return request<T>(endpoint, {
    method: "PUT",
    body: JSON.stringify(body),
    token,
  });
}

/**
 * DELETE request
 */
export function del<T>(endpoint: string, token?: string) {
  return request<T>(endpoint, {
    method: "DELETE",
    token,
  });
}