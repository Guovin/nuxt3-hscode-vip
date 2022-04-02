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
        版权归 HSCode编码网
        <span style="color: #317eb2" @click="drawer = true" class="statement"
          >网站声明</span
        >
        <div class="note">
          本站所有数据仅供学习与参考，如有疑问，请<span
            class="feedback"
            style="color: #317eb2"
            @click="dialogFormVisible = true"
          >
            反馈
          </span>
        </div>
        <a
          href="https://beian.miit.gov.cn/"
          style="color: #317eb2; text-decoration: none"
          target="blank"
          >粤ICP备20062496号</a
        >
      </el-footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    
  },
})
</script>
