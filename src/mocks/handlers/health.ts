import type { RequestHandler } from "msw"

/**
 * ヘルスチェックなど、横断的な API のモック（現時点では未使用）。
 * API を追加するときにここへまとめてもよいし、新しいリソース用にファイルを増やして index で spread する。
 */
export const healthHandlers: RequestHandler[] = []

