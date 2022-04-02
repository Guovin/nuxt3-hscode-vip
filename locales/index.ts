import { createI18n } from 'vue-i18n'
import zh_CN from './zh-CN'
import en from './en'
import { useI18n } from '~~/store/i18n'
import { createPinia } from 'pinia'

const pinia = createPinia()
const i18nStore = useI18n(pinia)

const i18n = createI18n({
  globalInjection: true,
  locale: i18nStore.locale,
  messages: {
    'zh-CN': zh_CN,
    en: en,
  },
})

export default i18n
