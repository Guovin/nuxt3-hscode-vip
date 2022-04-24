<template>
  <div class="pt-10 dark:text-gray-400">
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
      <el-drawer
        v-model="drawer"
        :title="$t('footer.statement')"
        direction="btt"
      >
        <div>
          {{ $t('footer.statementContent1') }}
        </div>
        <div>
          {{ $t('footer.statementContent2') }}
        </div>
        <div>
          {{ $t('footer.statementContent3') }}
        </div>
        <div>
          {{ $t('footer.statementContent4') }}
        </div>
        <div>
          {{ $t('footer.statementContent5') }}
        </div>
        <div>
          {{ $t('footer.statementContent6') }}
        </div>
      </el-drawer>
    </el-footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElFooter, ElDrawer } from 'element-plus/dist/index.full'

export default defineComponent({
  components: {
    ElFooter,
    ElDrawer,
  },
  setup() {
    const drawer = ref(false)
    return {
      drawer,
    }
  },
})
</script>
