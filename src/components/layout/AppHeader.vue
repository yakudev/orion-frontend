<script setup lang="ts"></script>

<template>
  <header class="header">
    <div class="header__brand">
      <div class="header__icon">🌌</div>
      <span class="header__name">ORION</span>
      <span class="header__tag">AI Agent</span>
    </div>
    <div class="header__right">
      <div class="header__status">
        <span class="status-dot" />
        <span class="status-label">gemini-2.5-flash</span>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
  height: 52px;
  background: var(--bg2);
  border-bottom: 1px solid var(--border);
  position: relative;
  z-index: 10;
  flex-shrink: 0;
}
.header::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--purple), var(--blue), transparent);
  opacity: 0.5;
}
.header__brand {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}
.header__icon {
  width: 26px;
  height: 26px;
  border-radius: 7px;
  background: linear-gradient(135deg, var(--purple), var(--blue));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
}
.header__name {
  font-family: var(--mono);
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--text);
  letter-spacing: 0.08em;
}
.header__tag {
  font-size: 0.6rem;
  color: var(--purple2);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  opacity: 0.7;
}
.header__right {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.header__status {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}
.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--success);
  box-shadow: 0 0 6px var(--success);
  animation: pulse 2s infinite;
}
.status-label {
  font-size: 0.7rem;
  color: var(--text3);
  font-family: var(--mono);
}
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
}
</style>
