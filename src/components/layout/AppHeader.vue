<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<template>
  <header class="header">
    <div class="header__brand">
      <span class="header__logo">🌌</span>
      <span class="header__name">Orion</span>
    </div>
    <nav class="header__nav">
      <RouterLink to="/chat" :class="['nav-link', { active: route.path === '/chat' }]">
        Chat
      </RouterLink>
      <RouterLink to="/memory" :class="['nav-link', { active: route.path === '/memory' }]">
        Memoria
      </RouterLink>
    </nav>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
  height: 56px;
  background: #0f0f0f;
  border-bottom: 1px solid #1e1e1e;
}
.header__brand { display: flex; align-items: center; gap: 0.5rem; }
.header__logo { font-size: 1.25rem; }
.header__name { font-weight: 600; font-size: 1rem; color: #fff; }
.header__nav { display: flex; gap: 0.5rem; }
.nav-link {
  padding: 0.4rem 0.9rem;
  border-radius: 6px;
  font-size: 0.875rem;
  color: #888;
  text-decoration: none;
  transition: all 0.15s;
}
.nav-link:hover { color: #fff; background: #1a1a1a; }
.nav-link.active { color: #fff; background: #1e1e1e; }
</style>
