export type ApiErrorResponse = {
  errorCode: string;
  message: string;
  details?: Record<string, unknown>;
};

export class ApiError extends Error {
  readonly status: number;
  readonly errorCode?: string;
  readonly details?: Record<string, unknown>;

  constructor({
    status,
    message,
    errorCode,
    details,
  }: {
    status: number;
    message: string;
    errorCode?: string;
    details?: Record<string, unknown>;
  }) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.errorCode = errorCode;
    this.details = details;
  }
}

function resolveApiUrl(path: string) {
  const apiOrigin = process.env.NEXT_PUBLIC_API_ORIGIN;
  if (!apiOrigin) return path;

  const trimmedOrigin = apiOrigin.endsWith('/')
    ? apiOrigin.slice(0, -1)
    : apiOrigin;

  return `${trimmedOrigin}${path}`;
}

function isApiErrorResponse(value: unknown): value is ApiErrorResponse {
  if (typeof value !== 'object' || value === null) return false;

  const maybe = value as Record<string, unknown>;
  return (
    typeof maybe.errorCode === 'string' &&
    typeof maybe.message === 'string' &&
    (maybe.details === undefined ||
      (typeof maybe.details === 'object' && maybe.details !== null))
  );
}

async function safeParseJson(response: Response): Promise<unknown> {
  const contentType = response.headers.get('content-type') ?? '';
  if (!contentType.includes('application/json')) return null;

  try {
    return await response.json();
  } catch {
    return null;
  }
}

export async function apiFetchJson<T>(
  path: string,
  init: RequestInit & { timeoutMs?: number } = {}
): Promise<T> {
  // Network timeout
  const abortController = new AbortController();
  const timeoutMs = init.timeoutMs ?? 8000;
  const timeoutId = setTimeout(() => abortController.abort(), timeoutMs);

  try {
    const url = resolveApiUrl(path);

    const headers = new Headers(init.headers);
    if (init.body && !headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json');
    }

    const response = await fetch(url, {
      ...init,
      headers,
      credentials: 'include',
      signal: abortController.signal,
    });

    if (response.ok) {
      if (response.status === 204) {
        return undefined as T;
      }

      return (await response.json()) as T;
    }

    const body = await safeParseJson(response);

    if (isApiErrorResponse(body)) {
      throw new ApiError({
        status: response.status,
        message: body.message,
        errorCode: body.errorCode,
        details: body.details,
      });
    }

    throw new ApiError({
      status: response.status,
      message: response.statusText || 'Request failed',
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new ApiError({
        status: 0,
        message: 'Request timeout',
        errorCode: 'NETWORK_TIMEOUT',
      });
    }

    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}

export type ParticipantResponse = {
  id: number;
  teamKey: string;
  name: string;
};

export type LeafletProgressResponse = {
  totalCount: number;
  completedCount: number;
  completedStampKeys: string[];
};

export type LeafletStampCodeResponse = {
  code: string;
  stampKey: string;
};

export async function loginApi(input: {
  teamKey: string;
  name: string;
}): Promise<ParticipantResponse> {
  return apiFetchJson('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export async function leafletProgressApi(): Promise<LeafletProgressResponse> {
  return apiFetchJson('/api/leaflet/progress', {
    method: 'GET',
  });
}

export async function leafletClaimApi(input: {
  code: string;
}): Promise<LeafletProgressResponse> {
  return apiFetchJson('/api/leaflet/claim', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export async function leafletStampCodeApi(): Promise<LeafletStampCodeResponse> {
  return apiFetchJson('/api/leaflet/stamp-code', {
    method: 'GET',
  });
}
