<template>
  <div class="pt-10 text-gray-700 dark:text-gray-400">
    <el-footer class="w-full text-center text-xs sm:text-sm h-auto">
      copyright
      <a
        href="https://www.hscode.vip"
        class="text-bread-blue no-underline"
        target="blank"
        >www.hscode.vip</a
      >
      {{ $t('footer.copyRight') }}
      <span
        @click="drawer = true"
        class="text-bread-blue cursor-pointer whitespace-nowrap"
        >{{ $t('footer.statement') }}</span
      >
      <div>
        {{ $t('footer.note')
        }}<span
          class="text-bread-blue cursor-pointer"
          @click="fbDialogVisiable"
        >
          {{ $t('footer.feedBack') }}
        </span>
      </div>
      <a
        href="https://beian.miit.gov.cn/"
        class="text-bread-blue no-underline"
        target="blank"
        >{{ $t('footer.siteId') }}</a
      >
      <el-drawer
        v-model="drawer"
        :title="$t('footer.statement')"
        direction="btt"
      >
        <div class="text-justify text-gray-600 px-4 sm:px-16 dark:text-gray-300">
          <p class="mb-1">
            {{ $t('footer.statementContent1') }}
          </p>
          <p class="mb-1">
            {{ $t('footer.statementContent2') }}
          </p>
          <p class="mb-1">
            {{ $t('footer.statementContent3') }}
          </p>
          <p class="mb-1">
            {{ $t('footer.statementContent4') }}
          </p>
          <p class="mb-1">
            {{ $t('footer.statementContent5') }}
          </p>
          <p class="mb-1">
            {{ $t('footer.statementContent6') }}
          </p>
        </div>
      </el-drawer>
      <FeedBack
        :visiable="feedBackVisiable"
        @fbDialogVisiable="fbDialogVisiable"
      />
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
    const feedBackVisiable = ref(false)
    const fbDialogVisiable = () => {
      feedBackVisiable.value = !feedBackVisiable.value
    }
    return {
      drawer,
      feedBackVisiable,
      fbDialogVisiable,
    }
  },
})
</script>
