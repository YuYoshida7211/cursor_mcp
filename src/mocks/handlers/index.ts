import type { RequestHandler } from 'msw'

import { healthHandlers } from '@/mocks/handlers/health'
import { usersHandlers } from '@/mocks/handlers/users'

/**
 * ブラウザワーカーに渡すハンドラの単一入口。
 * API ごとに別ファイルへ分け、`...fooHandlers` でここに集約する。
 */
export const handlers: RequestHandler[] = [
  ...healthHandlers,
  ...usersHandlers,
]
