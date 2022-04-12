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

export default defineComponent({
  setup() {
    const themeStore = useThemeStore()
    const theme = ref(themeStore.theme)
    const changeTheme = () => {
      themeStore.changeTheme()
      theme.value = themeStore.theme
    }
    provide('theme', theme)
    provide('changeTheme', changeTheme)
    return {
      theme,
    }
  },
})
</script>
