import { defineStore } from 'pinia'

export const useI18nStore = defineStore('i18n', {
  state: () => {
    const i18nLocale = useCookie('i18nLocale')
    if (!i18nLocale.value) {
      i18nLocale.value = 'zh-CN'
    }
    return { locale: i18nLocale.value }
  },
  actions: {
    changeLang() {
      if (this.locale === 'zh-CN') {
        this.locale = 'en'
      } else {
        this.locale = 'zh-CN'
      }
      const i18nLocale = useCookie('i18nLocale')
      i18nLocale.value = this.locale
    },
  },
})
