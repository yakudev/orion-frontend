<script setup lang="ts">
import AppHeader from '@/components/layout/AppHeader.vue'
import AppSidebar from '@/components/layout/AppSidebar.vue'
import RightPanel from '@/components/layout/RightPanel.vue'
</script>

<template>
  <div class="app">
    <AppHeader />
    <div class="app__main">
      <AppSidebar />
      <main class="app__content">
        <RouterView />
      </main>
      <RightPanel />
    </div>
  </div>
</template>

<style>
:root {
  --bg: #080810;
  --bg2: #0d0d1a;
  --bg3: #12122a;
  --surface: #14142b;
  --surface2: #1a1a35;
  --border: rgba(120,100,255,0.12);
  --border2: rgba(120,100,255,0.25);
  --purple: #7c6fff;
  --purple2: #a78bff;
  --blue: #4fc3f7;
  --blue2: #81d4fa;
  --text: #e8e8f0;
  --text2: #8888aa;
  --text3: #4a4a6a;
  --success: #4ade80;
  --warning: #fbbf24;
  --danger: #ff6b8a;
  --mono: 'Space Mono', monospace;
  --sans: 'DM Sans', sans-serif;
}
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html, body, #app { height: 100%; }
body { background: var(--bg); color: var(--text); font-family: var(--sans); }
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: var(--border2); border-radius: 2px; }
a { text-decoration: none; }
</style>

<style scoped>
.app { height: 100vh; display: flex; flex-direction: column; }
.app__main { flex: 1; display: grid; grid-template-columns: 200px 1fr 300px; overflow: hidden; }
.app__content { overflow: hidden; display: flex; flex-direction: column; }
</style>
