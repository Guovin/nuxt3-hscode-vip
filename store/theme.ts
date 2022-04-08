import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => {
    return { theme: 'light' }
  },
  actions: {
    changeTheme() {
      if (this.theme === 'light') {
        this.theme = 'dark'
      } else {
        this.theme = 'light'
      }
    },
  },
})
