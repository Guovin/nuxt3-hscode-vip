import { defineStore } from 'pinia'

export const useI18n = defineStore('i18n', {
  state: () => {
    return { locales: ['en', 'zh-CN'], locale: 'zh-CN' }
  },
  actions: {
    SET_LANG(locale) {
      if (this.locales.indexOf(locale) !== -1) {
        this.locale = locale
      }
    },
  },
})
