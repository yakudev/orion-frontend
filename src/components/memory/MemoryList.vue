<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useMemoryStore } from '@/stores/memory.store'
import type { MemoryFact } from '@/types/orion.types'

const store = useMemoryStore()
const newContent = ref('')
const newType = ref<MemoryFact['type']>('fact')

onMounted(() => store.loadFacts())

async function handleSave(): Promise<void> {
  if (!newContent.value.trim()) return
  await store.saveFact(newType.value, newContent.value.trim())
  newContent.value = ''
}

const typeLabels: Record<MemoryFact['type'], string> = {
  goal: 'Meta',
  preference: 'Preferencia',
  fact: 'Hecho',
  pattern: 'Patrón',
}
</script>

<template>
  <div class="memory-list">
    <div class="memory-list__add">
      <select v-model="newType" class="memory-list__select">
        <option value="goal">Meta</option>
        <option value="preference">Preferencia</option>
        <option value="fact">Hecho</option>
        <option value="pattern">Patrón</option>
      </select>
      <input
        v-model="newContent"
        class="memory-list__input"
        placeholder="Agregar un recuerdo sobre ti..."
        @keydown.enter="handleSave"
      />
      <button class="memory-list__btn" @click="handleSave">Guardar</button>
    </div>

    <div v-if="store.isLoading" class="memory-list__state">Cargando...</div>
    <div v-else-if="store.facts.length === 0" class="memory-list__state">
      Sin recuerdos aún. Agrega tu primera meta.
    </div>
    <ul v-else class="memory-list__items">
      <li v-for="fact in store.facts" :key="fact.id" class="memory-item">
        <span :class="['memory-item__tag', `memory-item__tag--${fact.type}`]">
          {{ typeLabels[fact.type] }}
        </span>
        <span class="memory-item__content">{{ fact.content }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.memory-list { padding: 1.5rem; display: flex; flex-direction: column; gap: 1.5rem; }
.memory-list__add { display: flex; gap: 0.5rem; }
.memory-list__select, .memory-list__input {
  padding: 0.6rem 0.9rem;
  background: #1a1a1a;
  border: 1px solid #2a2a2a;
  border-radius: 8px;
  color: #e0e0e0;
  font-size: 0.875rem;
  outline: none;
}
.memory-list__select { width: 130px; }
.memory-list__input { flex: 1; }
.memory-list__btn {
  padding: 0 1rem;
  background: #2a2a4a;
  color: #a0a0ff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.875rem;
}
.memory-list__btn:hover { background: #3a3a6a; }
.memory-list__state { color: #555; text-align: center; padding: 2rem; }
.memory-list__items { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.75rem; }
.memory-item { display: flex; align-items: flex-start; gap: 0.75rem; padding: 0.75rem; background: #1a1a1a; border-radius: 8px; }
.memory-item__tag {
  font-size: 0.7rem;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  white-space: nowrap;
}
.memory-item__tag--goal { background: #1a2a1a; color: #6bff6b; }
.memory-item__tag--preference { background: #2a1a2a; color: #ff6bff; }
.memory-item__tag--fact { background: #1a2a3a; color: #6bb5ff; }
.memory-item__tag--pattern { background: #2a2a1a; color: #ffdb6b; }
.memory-item__content { font-size: 0.875rem; color: #c0c0c0; line-height: 1.4; }
</style>
