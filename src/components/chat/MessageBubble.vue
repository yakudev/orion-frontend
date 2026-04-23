<script setup lang="ts">
import type { Message } from '@/types/orion.types'
defineProps<{ message: Message }>()
</script>

<template>
  <div :class="['msg', `msg--${message.role}`]">
    <div v-if="message.role === 'assistant'" class="msg__avatar">🌌</div>
    <div v-else class="msg__avatar msg__avatar--user">Y</div>
    <div class="msg__body">
      <div class="msg__bubble">{{ message.content }}</div>
    </div>
  </div>
</template>

<style scoped>
.msg { display: flex; gap: 0.65rem; max-width: 88%; }
.msg--user { flex-direction: row-reverse; align-self: flex-end; }
.msg--assistant { align-self: flex-start; }
.msg__avatar {
  width: 26px; height: 26px; border-radius: 7px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center; font-size: 12px;
  margin-top: 2px;
  background: linear-gradient(135deg, var(--purple), var(--blue));
  box-shadow: 0 0 10px rgba(124,111,255,0.25);
}
.msg__avatar--user { background: var(--surface2); color: var(--text2); box-shadow: none; font-size: 11px; font-family: var(--mono); }
.msg__bubble {
  padding: 0.65rem 1rem; border-radius: 11px;
  font-size: 0.875rem; line-height: 1.6; white-space: pre-wrap;
}
.msg--assistant .msg__bubble {
  background: var(--surface); border: 1px solid var(--border);
  border-bottom-left-radius: 3px; color: var(--text);
}
.msg--user .msg__bubble {
  background: linear-gradient(135deg, rgba(124,111,255,0.18), rgba(79,195,247,0.12));
  border: 1px solid rgba(124,111,255,0.22);
  border-bottom-right-radius: 3px; color: var(--text);
}
</style>
