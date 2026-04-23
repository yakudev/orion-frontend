import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { orionApi } from '@/api/orion.api'
import type { WeeklyFinanceSummary } from '@/types/orion.types'

export const useFinanceStore = defineStore('finance', () => {
  const summary = ref<WeeklyFinanceSummary | null>(null)
  const isLoading = ref(false)

  const sortedCategories = computed(() => {
    if (!summary.value) return []
    const total = summary.value.totalExpenses || 1
    return Object.entries(summary.value.byCategory)
      .sort(([, a], [, b]) => b - a)
      .map(([name, amount]) => ({
        name,
        amount,
        percentage: Math.round((amount / total) * 100),
      }))
  })

  async function loadSummary(): Promise<void> {
    isLoading.value = true
    try {
      summary.value = await orionApi.finance.getWeeklySummary()
    } finally {
      isLoading.value = false
    }
  }

  return { summary, isLoading, sortedCategories, loadSummary }
})
