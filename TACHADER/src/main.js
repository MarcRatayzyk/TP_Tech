import './assets/main.css'

const THEME_KEY = 'theme'
const savedTheme = localStorage.getItem(THEME_KEY)
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
const initialTheme =
  savedTheme === 'light' || savedTheme === 'dark'
    ? savedTheme
    : prefersDark
      ? 'dark'
      : 'light'

document.documentElement.dataset.theme = initialTheme

import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
