<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{ send: [message: string] }>()
const input = ref('')

function handleSend(): void {
  const message = input.value.trim()
  if (!message) return
  emit('send', message)
  input.value = ''
}

function handleKeydown(e: KeyboardEvent): void {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    handleSend()
  }
}
</script>

<template>
  <div class="input-area">
    <textarea
      v-model="input"
      class="input-area__textarea"
      placeholder="Escríbele a Orion... (Enter para enviar)"
      rows="1"
      @keydown="handleKeydown"
    />
    <button class="input-area__btn" :disabled="!input.trim()" @click="handleSend">
      Enviar
    </button>
  </div>
</template>

<style scoped>
.input-area { display: flex; gap: 0.5rem; padding: 1rem; border-top: 1px solid #1e1e1e; }
.input-area__textarea {
  flex: 1;
  padding: 0.65rem 1rem;
  background: #1a1a1a;
  border: 1px solid #2a2a2a;
  border-radius: 8px;
  color: #e0e0e0;
  font-size: 0.9rem;
  resize: none;
  outline: none;
  font-family: inherit;
  transition: border-color 0.15s;
}
.input-area__textarea:focus { border-color: #444; }
.input-area__btn {
  padding: 0 1.25rem;
  background: #2a2a4a;
  color: #a0a0ff;
  border: none;
  border-radius: 8px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background 0.15s;
}
.input-area__btn:hover:not(:disabled) { background: #3a3a6a; }
.input-area__btn:disabled { opacity: 0.4; cursor: not-allowed; }
</style>
