<script setup lang="ts">
import MemoryList from '@/components/memory/MemoryList.vue'
</script>

<template>
  <main class="memory-view">
    <div class="memory-view__header">
      <h1>Memoria de Orion</h1>
      <p>Lo que Orion sabe sobre ti y usa en cada conversación.</p>
    </div>
    <MemoryList />
  </main>
</template>

<style scoped>
.memory-view { max-width: 720px; margin: 0 auto; padding: 2rem 1rem; }
.memory-view__header { margin-bottom: 1.5rem; }
.memory-view__header h1 { font-size: 1.25rem; color: #e0e0e0; margin: 0 0 0.25rem; }
.memory-view__header p { color: #555; font-size: 0.875rem; margin: 0; }
</style>
