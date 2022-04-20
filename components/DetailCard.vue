<template>
  <div class="transition duration-300 ease-in-out">
    <el-row>
      <el-col :span="12">
        <Card>
          <div>
            <i :class="iconfontName"></i>
            <span>{{ $t(title) }}</span>
          </div>
          <div>
            <div v-for="(item, index) in data" :key="index">
              <span>{{ $t(item.title) }}</span>
              <span>{{ item.content }}</span>
            </div>
          </div>
        </Card>
      </el-col>
      <el-col v-if="app" :span="5">
        <Card>
          <div>
            <i class="iconfont iconsaoma"></i>
            <span>{{ $t('label.app') }}</span>
          </div>
          <img
            src="~/assets/img/code.jpg"
            alt="小程序码"
            style="width: 160px; height: 160px"
          />
        </Card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElRow, ElCol, ElCard } from 'element-plus/dist/index.full'

export default defineComponent({
  components: {
    ElRow,
    ElCol,
    ElCard,
  },
  props: {
    app: {
      type: Boolean,
      default: false,
    },
    iconfontName: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    data: {
      type: Array,
      default: [],
    },
  },
  setup() {
    return {}
  },
})
</script>
