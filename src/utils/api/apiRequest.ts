/**
 * API 通信の単一入口。生の fetch をコンポーネントに散らさない。
 * `VITE_API_BASE_URL` が未設定のときは同一オリジンの相対パスのみ想定。
 */
const baseURL = (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? ''

function resolveUrl(path: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path
  }
  const prefix = baseURL.replace(/\/$/, '')
  const suffix = path.startsWith('/') ? path : `/${path}`
  return `${prefix}${suffix}`
}

export class ApiHttpError extends Error {
  readonly status: number
  readonly body?: unknown

  constructor(status: number, message: string, body?: unknown) {
    super(message)
    this.name = 'ApiHttpError'
    this.status = status
    this.body = body
  }
}

export async function apiRequest<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const url = resolveUrl(path)
  const res = await fetch(url, {
    ...init,
    headers: {
      Accept: 'application/json',
      ...init?.headers,
    },
  })

  const contentType = res.headers.get('content-type') ?? ''
  const isJson = contentType.includes('application/json')
  const body = isJson ? await res.json().catch(() => undefined) : await res.text()

  if (!res.ok) {
    throw new ApiHttpError(
      res.status,
      typeof body === 'string' ? body : res.statusText,
      body,
    )
  }

  return body as T
}

export const api = {
  get: <T>(path: string, init?: RequestInit) =>
    apiRequest<T>(path, { ...init, method: 'GET' }),

  post: <T>(path: string, body: unknown, init?: RequestInit) =>
    apiRequest<T>(path, {
      ...init,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...init?.headers,
      },
      body: JSON.stringify(body),
    }),
}
