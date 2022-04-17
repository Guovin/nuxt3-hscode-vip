<template>
  <div class="loading h-full"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount } from 'vue'
import { ElLoading, ElMain } from 'element-plus/dist/index.full'

export default defineComponent({
  components: {
    ElMain,
  },
  setup() {
    const locale = useCookie('i18nLocale')
    const text = locale.value === 'zh-CN' ? '加载中' : 'Loading'
    let loadingInstance
    onMounted(() => {
      setTimeout(() => {
        const options = {
          target: '.loading',
          text: text,
        }
        loadingInstance = ElLoading.service(options)
      }, 200)
    }),
      onBeforeUnmount(() => {
        loadingInstance.close()
      })
  },
})
</script>
