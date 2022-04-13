import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => {
    const themeCookie = useCookie('theme')
    return { theme: themeCookie.value || 'light' }
  },
  actions: {
    changeTheme() {
      if (this.theme === 'light') {
        this.theme = 'dark'
      } else {
        this.theme = 'light'
      }
      const themeCookie = useCookie('theme')
      themeCookie.value = this.theme
    },
  },
})
