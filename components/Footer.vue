<template>
  <div>
    <el-footer class="w-full text-center text-sm h-auto">
      copyright
      <a
        href="https://www.hscode.vip"
        style="color: #317eb2; text-decoration: none"
        target="blank"
        >www.hscode.vip</a
      >
      {{ $t('footer.copyRight') }}
      <span
        style="color: #317eb2"
        @click="drawer = true"
        class="cursor-pointer whitespace-nowrap"
        >{{ $t('footer.statement') }}</span
      >
      <div class="text-xs">
        {{ $t('footer.note')
        }}<span
          class="cursor-pointer"
          style="color: #317eb2"
          @click="dialogFormVisible = true"
        >
          {{ $t('footer.feedBack') }}
        </span>
      </div>
      <a
        href="https://beian.miit.gov.cn/"
        style="color: #317eb2; text-decoration: none"
        target="blank"
        >{{ $t('footer.siteId') }}</a
      >
    </el-footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElFooter } from 'element-plus/dist/index.full'

export default defineComponent({
  components: {
    ElFooter,
  },
  setup() {},
})
</script>
