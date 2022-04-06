import { defineStore } from 'pinia'

export const useI18nStore = defineStore('i18n', {
  state: () => {
    return { locale: 'zh-CN' }
  },
  actions: {
    changeLang() {
      if (this.locale === 'zh-CN') {
        this.locale = 'en'
      } else {
        this.locale = 'zh-CN'
      }
    },
  },
})
