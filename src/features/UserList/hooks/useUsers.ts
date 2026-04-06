import { useEffect, useState } from 'react'
import { api } from '@/utils/api/apiRequest'
import type { GetUsersResponse, User } from '@/features/UserList/types'

const USERS_PATH = '/api/users' as const

type UseUsersResult =
  | { status: 'loading'; users: null; error: null }
  | { status: 'error'; users: null; error: string }
  | { status: 'success'; users: User[]; error: null }

export function useUsers(): UseUsersResult {
  const [result, setResult] = useState<UseUsersResult>({
    status: 'loading',
    users: null,
    error: null,
  })

  useEffect(() => {
    let cancelled = false

    api
      .get<GetUsersResponse>(USERS_PATH)
      .then(({ users }) => {
        if (!cancelled) {
          setResult({ status: 'success', users, error: null })
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          const message =
            err instanceof Error ? err.message : 'データの取得に失敗しました'
          setResult({ status: 'error', users: null, error: message })
        }
      })

    return () => {
      cancelled = true
    }
  }, [])

  return result
}
