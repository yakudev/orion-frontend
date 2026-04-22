<script setup lang="ts">
import ChatWindow from '@/components/chat/ChatWindow.vue'
</script>

<template>
  <main class="chat-view">
    <ChatWindow />
  </main>
</template>

<style scoped>
.chat-view { height: calc(100vh - 56px); display: flex; flex-direction: column; }
</style>
