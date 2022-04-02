<template>
  <div>
    <el-card v-if="routePath !== '/barcode'" class="searchCard">
          <!-- 搜索区域 -->
          <transition name="emerge" appear>
            <keep-alive>
              <el-input
                placeholder="请输入商品名称或商品编码"
                v-model="keyWord"
                @keyup.enter="inputKeyUpEnter"
                clearable
              >
                <el-button
                  slot="append"
                  icon="el-icon-search"
                  @click="inputKeyUpEnter"
                ></el-button>
              </el-input>
            </keep-alive>
          </transition>
        </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    
  },
})
</script>
