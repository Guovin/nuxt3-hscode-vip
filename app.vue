<template>
  <Html :class="`${theme === 'dark' ? 'dark' : 'light'}`">
    <Body class="dark:bg-black-dark dark:text-gray-200">
      <div>
        <NuxtPage />
      </div>
    </Body>
  </Html>
</template>

<script lang="ts">
import { defineComponent, provide } from 'vue'
import { useThemeStore } from '~~/store/theme'
import { useI18n } from 'vue-i18n'
import { useI18nStore } from '~~/store/i18n'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'

export default defineComponent({
  setup() {
    const themeStore = useThemeStore()
    const theme = ref(themeStore.theme)
    const { locale } = useI18n()
    const i18nStore = useI18nStore()
    const lang = i18nStore.locale === 'en' ? ref(en) : ref(zhCn)
    const changeTheme = () => {
      themeStore.changeTheme()
      theme.value = themeStore.theme
    }
    const changeLang = () => {
      i18nStore.changeLang()
      locale.value = i18nStore.locale
      lang.value = i18nStore.locale === 'en' ? en : zhCn
    }
    provide('theme', theme)
    provide('lang', lang)
    provide('changeTheme', changeTheme)
    provide('changeLang', changeLang)
    return {
      theme,
    }
  },
})
</script>
