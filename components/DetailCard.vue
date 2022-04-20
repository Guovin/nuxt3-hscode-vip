<template>
  <div
    :class="`transition duration-300 ease-in-out ${
      app ? 'w-full' : 'w-2/4 mx-auto'
    } my-6`"
  >
    <el-row>
      <el-col :span="app ? 12 : 24" :offset="app ? 6 : 0">
        <Card class="h-full">
          <div class="dark:text-gray-400">
            <i :class="iconfontName"></i>
            <span class="pl-2">{{ $t(title) }}</span>
          </div>
          <div class="pt-2">
            <template v-if="mode">
              <div
                v-for="(item, index) in data"
                :key="index"
                class="flex justify-between py-1"
              >
                <span class="font-bold text-gray-700 dark:text-gray-500">{{
                  $t(item.title)
                }}</span>
                <span class="dark:text-gray-400">{{ item.content }}</span>
              </div>
            </template>
            <template v-else>
              <div
                v-for="(item, index) in data"
                :key="index"
                class="flex justify-between py-1"
              >
                <template v-if="!element">
                  <span class="font-bold text-gray-700 dark:text-gray-500">{{
                    item.split(':')[0]
                  }}</span>
                  <span class="dark:text-gray-400">{{ item.split(':')[1] }}</span>
                </template>
                <template v-else>
                  <span class="font-bold text-gray-700 dark:text-gray-500">{{ index }}</span>
                  <span class="dark:text-gray-400">{{ item }}</span>
                </template>
              </div>
            </template>
          </div>
        </Card>
      </el-col>
      <el-col v-if="app" :span="4" :offset="1">
        <Card class="text-center mx-auto">
          <div>
            <i class="iconfont iconsaoma"></i>
            <span class="text-xs">{{ $t('label.app') }}</span>
          </div>
          <img
            src="~/assets/img/code.jpg"
            alt="小程序码"
            class="w-2/3 h-2/3 mx-auto my-3"
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
    mode: {
      type: Boolean,
      default: true,
    },
    element: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    return {}
  },
})
</script>
