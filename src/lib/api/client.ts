import { env } from "@/lib/config/env";

/**
 * Typed API core. Framework-agnostic: knows nothing about React.
 * Every feature service goes through this single door so auth,
 * error shaping, and base URL live in exactly one place.
 */

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly body: unknown,
    message?: string,
  ) {
    super(message ?? `API error ${status}`);
    this.name = "ApiError";
  }
}

type QueryParams = Record<string, string | number | boolean | undefined>;

interface RequestOptions {
  params?: QueryParams;
  body?: unknown;
  signal?: AbortSignal;
  /** Extra headers, e.g. Authorization once auth lands. */
  headers?: HeadersInit;
}

function buildUrl(path: string, params?: QueryParams): string {
  const url = new URL(path.replace(/^\//, ""), env.NEXT_PUBLIC_API_BASE_URL + "/");
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) url.searchParams.set(key, String(value));
    }
  }
  return url.toString();
}

async function request<T>(
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const response = await fetch(buildUrl(path, options.params), {
    method,
    signal: options.signal,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
  });

  // 204 has no body; parse everything else defensively.
  const data = response.status === 204 ? null : await response.json().catch(() => null);

  if (!response.ok) {
    throw new ApiError(response.status, data);
  }
  return data as T;
}

export const apiClient = {
  get: <T>(path: string, options?: RequestOptions) => request<T>("GET", path, options),
  post: <T>(path: string, options?: RequestOptions) => request<T>("POST", path, options),
  put: <T>(path: string, options?: RequestOptions) => request<T>("PUT", path, options),
  patch: <T>(path: string, options?: RequestOptions) =>
    request<T>("PATCH", path, options),
  delete: <T>(path: string, options?: RequestOptions) =>
    request<T>("DELETE", path, options),
};
