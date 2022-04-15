<template>
  <el-card class="mx-auto bg-white bg-opacity-1 dark:bg-black-dark">
    <slot />
  </el-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElCard } from 'element-plus/dist/index.full'

export default defineComponent({
  components: {
    ElCard,
  },
})
</script>
