<template>
  <div v-loading.fullscreen.lock="loading">
    <Header :show-search="show" />
    <div class="pt-20">
      <Card class="w-2/4">
        <Search />
      </Card>
    </div>
    <keep-alive>
      <TreeCard />
    </keep-alive>
    <HotCode />
    <Footer />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { scrollHandler } from '~/utils/scroll'

const { show } = scrollHandler()
const { $emitter } = useNuxtApp()
const loading = ref(false)
$emitter.on('loading', (flag: boolean) => {
  loading.value = flag
})
</script>
