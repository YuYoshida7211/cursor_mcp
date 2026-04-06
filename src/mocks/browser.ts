import { setupWorker } from 'msw/browser'
import { handlers } from '@/mocks/handlers/index.ts'

export const worker = setupWorker(...handlers)
