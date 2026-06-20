<script setup>
import { ref, watch } from 'vue'
import Board from './components/Board.vue'

const THEME_KEY = 'theme'

function getInitialTheme() {//permet de recuperer le theme initial
  const saved = localStorage.getItem(THEME_KEY)//recupere le theme du localStorage
  if (saved === 'light' || saved === 'dark') return saved
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'//si dark on retourne dark sinon on retourne light
}

const theme = ref(getInitialTheme())

watch(
  theme,
  (value) => {
    document.documentElement.dataset.theme = value
    localStorage.setItem(THEME_KEY, value)
  },
  { immediate: true }
)

function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}
</script>

<template>
  <div class="app">
    <header class="app-header">
      <h1>Task Board</h1>
      <button
        type="button"
        class="theme-toggle"
        :aria-label="theme === 'light' ? 'Activer le thème sombre' : 'Activer le thème clair'"
        @click="toggleTheme"
      >
        {{ theme === 'light' ? 'Mode sombre' : 'Mode clair' }}
      </button>
    </header>
    <main class="app-main">
      <Board />
    </main>
  </div>
</template>

<style scoped>
.app {
  width: 100%;
}

.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
}

.app-header h1 {
  color: var(--color-heading);
  font-size: 1.75rem;
  font-weight: 600;
  margin: 0;
}

.theme-toggle {
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: 1px solid var(--color-border);
  background: var(--color-background-soft);
  color: var(--color-heading);
  cursor: pointer;
  font-size: 0.9rem;
  transition: border-color 0.2s, background-color 0.2s;
}

.theme-toggle:hover {
  border-color: var(--color-border-hover);
  background: var(--color-background-mute);
}

.app-main {
  min-height: 50vh;
}
</style>
