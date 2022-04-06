<template>
  <div>
    <el-footer class="footer">
      copyright
      <a
        href="https://www.hscode.vip"
        style="color: #317eb2; text-decoration: none"
        target="blank"
        >www.hscode.vip</a
      >
      {{ $t('footer.copyRight') }}
      <span style="color: #317eb2" @click="drawer = true" class="statement">{{
        $t('footer.statement')
      }}</span>
      <div class="note">
        {{ $t('footer.note')
        }}<span
          class="feedback"
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

<style lang="scss" scoped>
.footer {
  width: 100%;
  text-align: center;
  font-size: 14px;
  // background-color: #273446;
  height: auto !important;
  .statement {
    cursor: pointer;
    white-space: nowrap;
  }

  .feedback {
    cursor: pointer;
  }
  .note {
    font-size: 10px;
  }
}
</style>
