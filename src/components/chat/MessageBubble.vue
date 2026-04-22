<script setup lang="ts">
import type { Message } from '@/types/orion.types'
defineProps<{ message: Message }>()
</script>

<template>
  <div :class="['bubble', `bubble--${message.role}`]">
    <span class="bubble__label">{{ message.role === 'user' ? 'Tú' : 'Orion' }}</span>
    <p class="bubble__content">{{ message.content }}</p>
  </div>
</template>

<style scoped>
.bubble { display: flex; flex-direction: column; gap: 0.25rem; max-width: 80%; }
.bubble--user { align-self: flex-end; align-items: flex-end; }
.bubble--assistant { align-self: flex-start; align-items: flex-start; }
.bubble__label { font-size: 0.7rem; color: #555; text-transform: uppercase; letter-spacing: 0.05em; }
.bubble__content {
  margin: 0;
  padding: 0.65rem 1rem;
  border-radius: 12px;
  font-size: 0.9rem;
  line-height: 1.5;
  white-space: pre-wrap;
}
.bubble--user .bubble__content { background: #1a1a2e; color: #e0e0ff; border-bottom-right-radius: 4px; }
.bubble--assistant .bubble__content { background: #1a1a1a; color: #e0e0e0; border-bottom-left-radius: 4px; }
</style>
