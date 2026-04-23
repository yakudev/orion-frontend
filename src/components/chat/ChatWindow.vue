<script setup lang="ts">
import { onMounted, watch, nextTick, ref } from 'vue'
import { useChatStore } from '@/stores/chat.store'
import { useFinanceStore } from '@/stores/finance.store'
import MessageBubble from './MessageBubble.vue'
import MessageInput from './MessageInput.vue'

const store = useChatStore()
const finance = useFinanceStore()
const scrollRef = ref<HTMLElement | null>(null)

async function scrollToBottom(): Promise<void> {
  await nextTick()
  if (scrollRef.value) scrollRef.value.scrollTop = scrollRef.value.scrollHeight
}

watch(() => store.messages.length, scrollToBottom)
onMounted(() => {
  scrollToBottom()
  finance.loadSummary()
})

watch(
  () => store.messages.at(-1),
  (last) => {
    if (last?.role === 'assistant') finance.loadSummary()
  },
)

async function handleSend(message: string): Promise<void> {
  await store.sendMessage(message)
}
</script>

<template>
  <div class="chat">
    <div class="chat__bg">
      <div class="chat__orb chat__orb--1" />
      <div class="chat__orb chat__orb--2" />
    </div>
    <div ref="scrollRef" class="chat__messages">
      <div v-if="store.messages.length === 0" class="chat__empty">
        <div class="chat__empty-icon">🌌</div>
        <p class="chat__empty-title">Hola, soy Orion</p>
        <p class="chat__empty-sub">Tu agente personal. Cuéntame en qué puedo ayudarte.</p>
        <div class="chat__suggestions">
          <button class="suggestion" @click="handleSend('gaste 50 soles en almuerzo')">
            Gaste 50 soles en almuerzo
          </button>
          <button class="suggestion" @click="handleSend('como voy con mis gastos esta semana?')">
            Resumen semanal
          </button>
        </div>
      </div>
      <MessageBubble v-for="(msg, i) in store.messages" :key="i" :message="msg" />
      <div v-if="store.isLoading" class="chat__typing">
        <div class="typing-avatar">O</div>
        <div class="typing-dots">
          <span /><span /><span />
        </div>
      </div>
      <div v-if="store.error" class="chat__error">{{ store.error }}</div>
    </div>
    <MessageInput @send="handleSend" :disabled="store.isLoading" />
  </div>
</template>

<style scoped>
.chat { display: flex; flex-direction: column; height: 100%; position: relative; }
.chat__bg { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
.chat__orb { position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.035; }
.chat__orb--1 { width: 380px; height: 380px; background: var(--purple); top: -100px; right: -80px; }
.chat__orb--2 { width: 280px; height: 280px; background: var(--blue); bottom: 80px; left: -60px; }
.chat__messages {
  flex: 1; overflow-y: auto; padding: 1.5rem;
  display: flex; flex-direction: column; gap: 1rem;
  position: relative; z-index: 1;
}
.chat__empty { text-align: center; margin: auto; display: flex; flex-direction: column; align-items: center; gap: 0.5rem; }
.chat__empty-icon { font-size: 2.5rem; margin-bottom: 0.25rem; }
.chat__empty-title { font-size: 1.1rem; font-weight: 600; color: var(--text); }
.chat__empty-sub { font-size: 0.85rem; color: var(--text2); }
.chat__suggestions { display: flex; flex-direction: column; gap: 0.4rem; margin-top: 0.75rem; }
.suggestion {
  padding: 0.5rem 1rem; border-radius: 8px; border: 1px solid var(--border2);
  background: rgba(124,111,255,0.05); color: var(--text2);
  font-size: 0.8rem; cursor: pointer; transition: all 0.15s; font-family: var(--sans);
}
.suggestion:hover { background: rgba(124,111,255,0.12); color: var(--text); border-color: var(--purple); }
.chat__typing { display: flex; align-items: center; gap: 0.6rem; }
.typing-avatar {
  width: 26px; height: 26px; border-radius: 7px; flex-shrink: 0;
  background: linear-gradient(135deg, var(--purple), var(--blue));
  display: flex; align-items: center; justify-content: center;
  font-size: 11px; font-family: var(--mono); color: white;
}
.typing-dots { display: flex; gap: 4px; padding: 0.6rem 0.9rem; background: var(--surface); border: 1px solid var(--border); border-radius: 10px; border-bottom-left-radius: 3px; }
.typing-dots span { width: 5px; height: 5px; border-radius: 50%; background: var(--purple2); animation: bounce 1.2s infinite; }
.typing-dots span:nth-child(2) { animation-delay: 0.2s; }
.typing-dots span:nth-child(3) { animation-delay: 0.4s; }
@keyframes bounce { 0%,60%,100%{transform:translateY(0)} 30%{transform:translateY(-5px)} }
.chat__error { color: var(--danger); font-size: 0.8rem; text-align: center; }
</style>