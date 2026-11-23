/**
 * The single HTTP client of the application, used by every generated API (orval `mutator`).
 * All backend APIs are reached through the gateway under `/api/<api-name>/…`.
 */

/** Thrown for every non-2xx response. `status` is read by `getErrorStatus` from @noc/platform. */
export class ApiError extends Error {
  readonly status: number;
  readonly body: unknown;

  constructor(status: number, body: unknown, url: string) {
    super(`Request ${url} failed with status ${status}`);
    this.name = "ApiError";
    this.status = status;
    this.body = body;
  }
}

export async function httpClient<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...init,
    headers: { Accept: "application/json", ...init?.headers },
  });

  const text = await response.text();
  const body: unknown = text ? JSON.parse(text) : undefined;

  if (!response.ok) throw new ApiError(response.status, body, url);
  return body as T;
}
