<script setup lang="ts">
import { onMounted } from 'vue'
import { useFinanceStore } from '@/stores/finance.store'
import { useMemoryStore } from '@/stores/memory.store'

const finance = useFinanceStore()
const memory = useMemoryStore()

onMounted(() => {
  finance.loadSummary()
  memory.loadFacts()
})

const typeLabels: Record<string, string> = {
  goal: 'Meta', preference: 'Pref', fact: 'Hecho', pattern: 'Patrón',
}
const typeColors: Record<string, string> = {
  goal: 'badge--goal', preference: 'badge--pref',
  fact: 'badge--fact', pattern: 'badge--pattern',
}
</script>

<template>
  <aside class="panel">
    <div class="panel__header">
      <span class="panel__title">Resumen semanal</span>
    </div>

    <div class="panel__body">
      <div v-if="finance.isLoading" class="panel__state">Cargando...</div>
      <template v-else-if="finance.summary">
        <div class="stats">
          <div class="stat">
            <span class="stat__label">Gastos</span>
            <span class="stat__value stat__value--expense">
              S/. {{ finance.summary.totalExpenses.toFixed(2) }}
            </span>
          </div>
          <div class="stat">
            <span class="stat__label">Ingresos</span>
            <span class="stat__value stat__value--income">
              S/. {{ finance.summary.totalIncome.toFixed(2) }}
            </span>
          </div>
        </div>

        <div class="chart" v-if="finance.sortedCategories.length > 0">
          <span class="chart__title">Por categoría</span>
          <div class="chart__bars">
            <div v-for="cat in finance.sortedCategories" :key="cat.name" class="bar-row">
              <span class="bar-row__label">{{ cat.name }}</span>
              <div class="bar-row__track">
                <div class="bar-row__fill" :style="{ width: cat.percentage + '%' }" />
              </div>
              <span class="bar-row__val">{{ cat.amount }}</span>
            </div>
          </div>
        </div>
      </template>
    </div>

    <div class="panel__divider" />
    <div class="panel__subtitle">Memoria activa</div>

    <div class="panel__memory">
      <div v-if="memory.isLoading" class="panel__state">Cargando...</div>
      <div v-else-if="memory.facts.length === 0" class="panel__state">Sin hechos aún.</div>
      <div v-else v-for="fact in memory.facts" :key="fact.id" class="fact">
        <span :class="['fact__badge', typeColors[fact.type]]">{{ typeLabels[fact.type] }}</span>
        <span class="fact__text">{{ fact.content }}</span>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.panel { background: var(--bg2); border-left: 1px solid var(--border); display: flex; flex-direction: column; overflow: hidden; }
.panel__header { padding: 0.9rem 1.25rem 0.75rem; border-bottom: 1px solid var(--border); }
.panel__title { font-size: 0.65rem; font-family: var(--mono); color: var(--text2); text-transform: uppercase; letter-spacing: 0.1em; }
.panel__body { padding: 1rem; display: flex; flex-direction: column; gap: 0.75rem; }
.panel__state { font-size: 0.75rem; color: var(--text3); text-align: center; padding: 1rem; }
.panel__divider { height: 1px; background: var(--border); margin: 0; }
.panel__subtitle { padding: 0.75rem 1.25rem 0.4rem; font-size: 0.65rem; font-family: var(--mono); color: var(--text3); text-transform: uppercase; letter-spacing: 0.1em; }
.panel__memory { padding: 0 1rem 1rem; display: flex; flex-direction: column; gap: 0.5rem; overflow-y: auto; }

.stats { display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; }
.stat { background: var(--surface); border: 1px solid var(--border); border-radius: 8px; padding: 0.75rem; }
.stat__label { display: block; font-size: 0.6rem; color: var(--text3); font-family: var(--mono); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 0.3rem; }
.stat__value { font-size: 1rem; font-family: var(--mono); font-weight: 700; }
.stat__value--expense { color: var(--danger); }
.stat__value--income { color: var(--success); }

.chart { background: var(--surface); border: 1px solid var(--border); border-radius: 8px; padding: 0.75rem; }
.chart__title { display: block; font-size: 0.6rem; color: var(--text3); font-family: var(--mono); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 0.6rem; }
.chart__bars { display: flex; flex-direction: column; gap: 0.5rem; }
.bar-row { display: flex; align-items: center; gap: 0.5rem; }
.bar-row__label { font-size: 0.68rem; color: var(--text2); width: 70px; flex-shrink: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.bar-row__track { flex: 1; height: 5px; background: var(--bg3); border-radius: 3px; overflow: hidden; }
.bar-row__fill { height: 100%; border-radius: 3px; background: linear-gradient(90deg, var(--purple), var(--blue)); transition: width 0.6s ease; }
.bar-row__val { font-size: 0.65rem; color: var(--text3); font-family: var(--mono); width: 28px; text-align: right; }

.fact { display: flex; align-items: flex-start; gap: 0.5rem; padding: 0.55rem 0.7rem; background: var(--surface); border: 1px solid var(--border); border-radius: 7px; }
.fact__badge { font-size: 0.58rem; padding: 0.15rem 0.4rem; border-radius: 3px; font-family: var(--mono); text-transform: uppercase; letter-spacing: 0.05em; white-space: nowrap; flex-shrink: 0; margin-top: 1px; }
.badge--goal { background: rgba(74,222,128,0.1); color: var(--success); }
.badge--pref { background: rgba(167,139,255,0.1); color: var(--purple2); }
.badge--fact { background: rgba(79,195,247,0.1); color: var(--blue2); }
.badge--pattern { background: rgba(251,191,36,0.1); color: var(--warning); }
.fact__text { font-size: 0.72rem; color: var(--text2); line-height: 1.4; }
</style>
