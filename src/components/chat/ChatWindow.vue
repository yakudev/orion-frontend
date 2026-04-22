<script setup lang="ts">
import { onMounted, watch, nextTick, ref } from 'vue'
import { useChatStore } from '@/stores/chat.store'
import MessageBubble from './MessageBubble.vue'
import MessageInput from './MessageInput.vue'

const store = useChatStore()
const scrollRef = ref<HTMLElement | null>(null)

async function scrollToBottom(): Promise<void> {
  await nextTick()
  if (scrollRef.value) scrollRef.value.scrollTop = scrollRef.value.scrollHeight
}

watch(() => store.messages.length, scrollToBottom)
onMounted(scrollToBottom)
</script>

<template>
  <div class="chat-window">
    <div ref="scrollRef" class="chat-window__messages">
      <div v-if="store.messages.length === 0" class="chat-window__empty">
        <p>Hola, soy <strong>Orion</strong>. Cuéntame en qué puedo ayudarte.</p>
        <p class="hint">Prueba: "gasté 50 soles en supermercado"</p>
      </div>
      <MessageBubble v-for="(msg, i) in store.messages" :key="i" :message="msg" />
      <div v-if="store.isLoading" class="chat-window__loading">
        <span>Orion está pensando...</span>
      </div>
      <div v-if="store.error" class="chat-window__error">{{ store.error }}</div>
    </div>
    <MessageInput @send="store.sendMessage" />
  </div>
</template>

<style scoped>
.chat-window { display: flex; flex-direction: column; height: 100%; }
.chat-window__messages {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.chat-window__empty { text-align: center; color: #555; margin: auto; }
.chat-window__empty strong { color: #a0a0ff; }
.hint { font-size: 0.8rem; margin-top: 0.5rem; color: #444; }
.chat-window__loading { color: #555; font-size: 0.85rem; font-style: italic; align-self: flex-start; }
.chat-window__error { color: #ff6b6b; font-size: 0.85rem; align-self: center; }
</style>
