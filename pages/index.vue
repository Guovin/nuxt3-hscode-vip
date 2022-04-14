<template>
  <div>
    <Header :show-search="show" />
    <Search />
    <TreeCard />
    <HotCode />
    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent, watchEffect, onMounted } from 'vue'

export default defineComponent({
  setup() {
    const show = ref(false)
    let scrollTop = 0
    onMounted(() => {
      window.addEventListener('scroll', () => {
        scrollTop = document.documentElement.scrollTop
        if (scrollTop >= 100) {
          show.value = true
        } else {
          show.value = false
        }
      })
    })
    // watchEffect(() => {
    //   console.log(scrollTop)
    // })
    return {
      show,
    }
  },
})
</script>
