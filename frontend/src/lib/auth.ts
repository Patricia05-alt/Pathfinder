// Lightweight auth/API client for the PathFinder backend.

const API_BASE: string =
  (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, '') ??
  'http://localhost:8000/api'

const ACCESS_KEY = 'pf_access'
const REFRESH_KEY = 'pf_refresh'

export interface User {
  id: number
  email: string
  date_joined: string
}

export function getAccessToken(): string | null {
  return localStorage.getItem(ACCESS_KEY)
}

export function getRefreshToken(): string | null {
  return localStorage.getItem(REFRESH_KEY)
}

function setTokens(access: string, refresh: string): void {
  localStorage.setItem(ACCESS_KEY, access)
  localStorage.setItem(REFRESH_KEY, refresh)
}

export function clearTokens(): void {
  localStorage.removeItem(ACCESS_KEY)
  localStorage.removeItem(REFRESH_KEY)
}

export function isAuthenticated(): boolean {
  return getAccessToken() !== null
}

// Turn a DRF error payload into a single readable message.
async function extractError(res: Response, fallback: string): Promise<string> {
  try {
    const data = await res.json()
    if (typeof data === 'string') return data
    if (data.detail) return String(data.detail)
    const parts: string[] = []
    for (const value of Object.values(data)) {
      if (Array.isArray(value)) parts.push(value.join(' '))
      else if (value) parts.push(String(value))
    }
    if (parts.length) return parts.join(' ')
  } catch {
    // response was not JSON
  }
  return fallback
}

interface AuthResponse {
  user: User
  access: string
  refresh: string
}

export async function register(email: string, password: string): Promise<User> {
  const res = await fetch(`${API_BASE}/auth/register/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  if (!res.ok) {
    throw new Error(await extractError(res, 'Registration failed. Please try again.'))
  }
  const data: AuthResponse = await res.json()
  setTokens(data.access, data.refresh)
  return data.user
}

export async function login(email: string, password: string): Promise<User> {
  const res = await fetch(`${API_BASE}/auth/login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  if (!res.ok) {
    if (res.status === 401) {
      throw new Error('Incorrect email or password.')
    }
    throw new Error(await extractError(res, 'Login failed. Please try again.'))
  }
  const data: AuthResponse = await res.json()
  setTokens(data.access, data.refresh)
  return data.user
}

// Try to obtain a fresh access token using the stored refresh token.
async function refreshAccessToken(): Promise<boolean> {
  const refresh = getRefreshToken()
  if (!refresh) return false
  const res = await fetch(`${API_BASE}/auth/refresh/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh }),
  })
  if (!res.ok) {
    clearTokens()
    return false
  }
  const data: { access: string; refresh?: string } = await res.json()
  setTokens(data.access, data.refresh ?? refresh)
  return true
}

// fetch() wrapper that attaches the access token and retries once after a refresh.
export async function authFetch(path: string, options: RequestInit = {}): Promise<Response> {
  const doRequest = (): Promise<Response> =>
    fetch(`${API_BASE}${path}`, {
      ...options,
      headers: {
        ...(options.headers ?? {}),
        ...(getAccessToken() ? { Authorization: `Bearer ${getAccessToken()}` } : {}),
      },
    })

  let res = await doRequest()
  if (res.status === 401 && (await refreshAccessToken())) {
    res = await doRequest()
  }
  return res
}

export async function fetchCurrentUser(): Promise<User> {
  const res = await authFetch('/auth/me/')
  if (!res.ok) {
    clearTokens()
    throw new Error('Not authenticated')
  }
  return res.json()
}

export async function logout(): Promise<void> {
  const refresh = getRefreshToken()
  clearTokens()
  if (!refresh) return
  try {
    await fetch(`${API_BASE}/auth/logout/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh }),
    })
  } catch {
    // best-effort; tokens are already cleared locally
  }
}
