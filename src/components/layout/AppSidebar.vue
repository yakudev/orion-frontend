<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<template>
  <aside class="sidebar">
    <div class="sidebar__section">
      <span class="sidebar__label">Dominios</span>
    </div>
    <RouterLink to="/chat" :class="['sidebar__item', { active: route.path === '/chat' }]">
      <span class="sidebar__icon">💬</span> Chat
    </RouterLink>
    <RouterLink to="/memory" :class="['sidebar__item', { active: route.path === '/memory' }]">
      <span class="sidebar__icon">🧠</span> Memoria
    </RouterLink>
    <div class="sidebar__divider" />
    <div class="sidebar__section">
      <span class="sidebar__label">Próximamente</span>
    </div>
    <div class="sidebar__item sidebar__item--disabled">
      <span class="sidebar__icon">🎯</span> Hábitos
    </div>
    <div class="sidebar__item sidebar__item--disabled">
      <span class="sidebar__icon">🚀</span> Carrera
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  background: var(--bg2);
  border-right: 1px solid var(--border);
  padding: 1rem 0;
  display: flex; flex-direction: column; gap: 0.15rem;
}
.sidebar__section { padding: 0.6rem 1rem 0.3rem; }
.sidebar__label { font-size: 0.6rem; color: var(--text3); text-transform: uppercase; letter-spacing: 0.12em; font-family: var(--mono); }
.sidebar__item {
  display: flex; align-items: center; gap: 0.6rem;
  padding: 0.5rem 0.75rem; margin: 0 0.5rem;
  border-radius: 6px; font-size: 0.8rem; color: var(--text2);
  transition: all 0.15s; cursor: pointer;
}
.sidebar__item:hover { background: var(--surface); color: var(--text); }
.sidebar__item.active { background: rgba(124,111,255,0.1); color: var(--purple2); }
.sidebar__item--disabled { opacity: 0.35; cursor: not-allowed; }
.sidebar__item--disabled:hover { background: none; color: var(--text2); }
.sidebar__icon { font-size: 13px; width: 18px; text-align: center; }
.sidebar__divider { height: 1px; background: var(--border); margin: 0.5rem 1rem; }
</style>
