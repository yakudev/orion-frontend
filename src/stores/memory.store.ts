import { defineStore } from 'pinia'
import { ref } from 'vue'
import { orionApi } from '@/api/orion.api'
import type { MemoryFact } from '@/types/orion.types'

export const useMemoryStore = defineStore('memory', () => {
  const facts = ref<MemoryFact[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  async function loadFacts(): Promise<void> {
    isLoading.value = true
    try {
      const response = await orionApi.memory.getAll()
      facts.value = response.facts
    } catch {
      error.value = 'No se pudieron cargar los recuerdos.'
    } finally {
      isLoading.value = false
    }
  }

  async function saveFact(type: MemoryFact['type'], content: string): Promise<void> {
    await orionApi.memory.save(type, content)
    await loadFacts()
  }

  return { facts, isLoading, error, loadFacts, saveFact }
})
