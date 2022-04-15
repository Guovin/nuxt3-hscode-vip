<template>
  <div>
    <Header :show-search="show" />
    <div class="pt-20">
      <Card class="w-2/4">
        <Search />
      </Card>
    </div>
    <TreeCard />
    <HotCode />
    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted } from 'vue'

export default defineComponent({
  setup() {
    const show = ref(false)
    let scrollTop = 0
    const scrollListener = () => {
      scrollTop = document.documentElement.scrollTop
      if (scrollTop >= 100) {
        show.value = true
      } else {
        show.value = false
      }
    }
    onMounted(() => {
      window.addEventListener('scroll', scrollListener)
    })
    onUnmounted(() => {
      window.removeEventListener('scroll', scrollListener)
    })
    return {
      show,
    }
  },
})
</script>
