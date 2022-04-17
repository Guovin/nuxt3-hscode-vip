<template>
  <el-main class="h-full"></el-main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElLoading, ElMain } from 'element-plus/dist/index.full'

export default defineComponent({
  components: {
    ElMain,
  },
  setup() {
    const locale = useCookie('i18nLocale')
    const text = locale.value === 'zh-CN' ? '加载中' : 'Loading'
    setTimeout(() => {
      const options = {
        target: '.el-main',
        text: text,
      }
      const loadingInstance = ElLoading.service(options)
    }, 200)
  },
})
</script>
