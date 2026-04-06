import { useEffect, useState } from 'react'
import { api } from '@/utils/api/apiRequest'
import type { GetUserDetailResponse } from '@/features/UserList/types'

const USER_DETAIL_PATH = (employeeId: string) => `/api/users/${employeeId}` as const

type UseUserDetailResult =
  | { status: 'idle'; detail: null; error: null }
  | { status: 'loading'; detail: null; error: null }
  | { status: 'error'; detail: null; error: string }
  | { status: 'success'; detail: GetUserDetailResponse; error: null }

type FetchState =
  | { fetchedId: null; data: null; error: null }
  | { fetchedId: string; data: GetUserDetailResponse; error: null }
  | { fetchedId: string; data: null; error: string }

export function useUserDetail(employeeId: string | null): UseUserDetailResult {
  const [fetchState, setFetchState] = useState<FetchState>({
    fetchedId: null,
    data: null,
    error: null,
  })

  useEffect(() => {
    if (!employeeId) return

    let cancelled = false

    api
      .get<GetUserDetailResponse>(USER_DETAIL_PATH(employeeId))
      .then((data) => {
        if (!cancelled) {
          setFetchState({ fetchedId: employeeId, data, error: null })
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          const error =
            err instanceof Error ? err.message : 'データの取得に失敗しました'
          setFetchState({ fetchedId: employeeId, data: null, error })
        }
      })

    return () => {
      cancelled = true
    }
  }, [employeeId])

  if (!employeeId) return { status: 'idle', detail: null, error: null }
  if (fetchState.fetchedId !== employeeId) return { status: 'loading', detail: null, error: null }
  if (fetchState.error) return { status: 'error', detail: null, error: fetchState.error }
  if (fetchState.data) return { status: 'success', detail: fetchState.data, error: null }
  return { status: 'loading', detail: null, error: null }
}
