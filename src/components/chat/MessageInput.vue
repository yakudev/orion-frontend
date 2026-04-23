<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{ disabled?: boolean }>()
const emit = defineEmits<{ send: [message: string] }>()
const input = ref('')

function handleSend(): void {
  const message = input.value.trim()
  if (!message || props.disabled) return
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
    <div :class="['input-wrap', { 'input-wrap--disabled': disabled }]">
      <textarea
        v-model="input"
        class="input-textarea"
        placeholder="Escríbele a Orion... (↵ enviar, ⇧↵ nueva línea)"
        rows="1"
        :disabled="disabled"
        @keydown="handleKeydown"
      />
      <div class="input-actions">
        <span class="input-hint">↵</span>
        <button class="send-btn" :disabled="!input.trim() || disabled" @click="handleSend">
          ➤
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.input-area { padding: 0.875rem 1.25rem 1.1rem; border-top: 1px solid var(--border); background: var(--bg2); position: relative; z-index: 1; }
.input-wrap {
  display: flex; align-items: flex-end; gap: 0.6rem;
  background: var(--surface); border: 1px solid var(--border2);
  border-radius: 11px; padding: 0.55rem 0.7rem;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.input-wrap:focus-within { border-color: var(--purple); box-shadow: 0 0 0 3px rgba(124,111,255,0.08); }
.input-wrap--disabled { opacity: 0.5; }
.input-textarea {
  flex: 1; background: none; border: none; outline: none;
  color: var(--text); font-family: var(--sans); font-size: 0.875rem;
  resize: none; line-height: 1.5; min-height: 20px;
}
.input-textarea::placeholder { color: var(--text3); }
.input-actions { display: flex; align-items: center; gap: 0.4rem; padding-bottom: 1px; }
.input-hint { font-size: 0.6rem; color: var(--text3); font-family: var(--mono); }
.send-btn {
  width: 30px; height: 30px; border-radius: 7px; border: none; cursor: pointer;
  background: linear-gradient(135deg, var(--purple), var(--blue));
  color: white; font-size: 12px;
  display: flex; align-items: center; justify-content: center;
  transition: opacity 0.15s, transform 0.1s;
}
.send-btn:hover:not(:disabled) { opacity: 0.85; transform: scale(1.05); }
.send-btn:disabled { opacity: 0.3; cursor: not-allowed; }
</style>
