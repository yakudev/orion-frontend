import { defineStore } from 'pinia'
import { ref } from 'vue'
import { orionApi } from '@/api/orion.api'
import type { Message } from '@/types/orion.types'

export const useChatStore = defineStore('chat', () => {
  const messages = ref<Message[]>([])
  const sessionId = ref<string | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  async function sendMessage(content: string): Promise<void> {
    // Optimistic update — show user message immediately
    messages.value.push({ role: 'user', content })
    isLoading.value = true
    error.value = null

    try {
      const response = await orionApi.chat.send(content, sessionId.value ?? undefined)
      sessionId.value = response.sessionId
      messages.value.push({ role: 'assistant', content: response.message })
    } catch {
      error.value = 'No se pudo conectar con Orion. Intenta de nuevo.'
      messages.value.pop() // remove optimistic message on error
    } finally {
      isLoading.value = false
    }
  }

  function clearChat(): void {
    if (sessionId.value) orionApi.chat.clearSession(sessionId.value)
    messages.value = []
    sessionId.value = null
    error.value = null
  }

  return { messages, sessionId, isLoading, error, sendMessage, clearChat }
})
