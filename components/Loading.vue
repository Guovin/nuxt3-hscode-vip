<template>
  <div class="loading"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElLoading } from 'element-plus/dist/index.full'

export default defineComponent({
  setup() {
    const options = {
      target: '.loading',
      text: '加载中'
    }
    const loadingInstance = ElLoading.service(options)
    loadingInstance.close()
  },
})
</script>
