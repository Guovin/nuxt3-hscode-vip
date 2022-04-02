import { defineStore } from 'pinia'

export const useI18nStore = defineStore('i18n', {
  state: () => {
    return { locale: 'en' }
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
