import axios from 'axios'
import type {
  ChatResponse,
  ChatHistoryResponse,
  MemoryResponse,
  MemoryFact,
  WeeklyFinanceSummary,
} from '@/types/orion.types'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:3000',
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API error:', error.response?.data ?? error.message)
    return Promise.reject(error)
  },
)

export const orionApi = {
  chat: {
    send: (message: string, sessionId?: string): Promise<ChatResponse> =>
      api.post<ChatResponse>('/api/chat', { message, sessionId }).then((r) => r.data),
    getHistory: (sessionId: string): Promise<ChatHistoryResponse> =>
      api.get<ChatHistoryResponse>(`/api/chat/${sessionId}/history`).then((r) => r.data),
    clearSession: (sessionId: string): Promise<void> =>
      api.delete(`/api/chat/${sessionId}`).then(() => undefined),
  },
  memory: {
    getAll: (): Promise<MemoryResponse> =>
      api.get<MemoryResponse>('/api/memory').then((r) => r.data),
    save: (type: MemoryFact['type'], content: string): Promise<void> =>
      api.post('/api/memory', { type, content }).then(() => undefined),
  },
  finance: {
    getWeeklySummary: (): Promise<WeeklyFinanceSummary> =>
      api.get<WeeklyFinanceSummary>('/api/finance/summary').then((r) => r.data),
  },
}
