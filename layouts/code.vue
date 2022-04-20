<template>
  <div v-loading.fullscreen.lock="loading">
    <Header />
    <slot />
    <Footer />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const { $emitter } = useNuxtApp()
const loading = ref(false)
$emitter.on('loading', (flag: boolean) => {
  loading.value = flag
})
</script>
