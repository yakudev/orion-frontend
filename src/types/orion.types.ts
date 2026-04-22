export interface Message {
  role: 'user' | 'assistant'
  content: string
}

export interface ChatResponse {
  sessionId: string
  message: string
  timestamp: string
}

export interface MemoryFact {
  id: string
  type: 'goal' | 'preference' | 'fact' | 'pattern'
  content: string
}

export interface MemoryResponse {
  facts: MemoryFact[]
  count: number
}

export interface ChatHistoryResponse {
  sessionId: string
  messages: Message[]
  count: number
}
