<template>
  <div :class="`${app ? 'w-full' : 'w-2/4 mx-auto'} my-8`">
    <el-row>
      <el-col :span="app ? 12 : 24" :offset="app ? 6 : 0">
        <Card class="h-full">
          <div
            class="dark:text-gray-400 text-sm border-b-2 pb-2 border-gray-200 dark:border-opacity-20"
          >
            <i :class="iconfontName"></i>
            <span class="pl-2">{{ $t(title) }}</span>
            <span v-if="subTitle" class="text-xs dark:text-gray-400 pl-2"
              >({{ subTitle }})</span
            >
          </div>
          <el-skeleton
            :loading="loading || !detailResolve"
            animated
            :throttle="500"
          >
            <template #template>
              <div
                v-for="item in app ? 3 : 4"
                :key="item"
                class="flex items-center justify-between py-4"
              >
                <el-skeleton-item variant="text" class="mr-10" />
                <el-skeleton-item variant="text" class="w-1/3" />
              </div>
            </template>
            <template #default>
              <div class="pt-2">
                <template v-if="mode">
                  <div
                    v-for="(item, index) in data"
                    :key="index"
                    class="flex justify-between py-1"
                  >
                    <div class="text-sm font-bold">
                      <span class="text-gray-700 dark:text-gray-400 pr-1"
                        >{{ index + 1 }}.</span
                      >
                      <span class="text-gray-600 dark:text-gray-500">{{
                        $t(item.title)
                      }}</span>
                    </div>
                    <span class="text-sm dark:text-gray-400">{{
                      item.content
                    }}</span>
                  </div>
                </template>
                <template v-else>
                  <div
                    v-for="(item, index) in data"
                    :key="index"
                    class="flex justify-between py-1"
                  >
                    <template v-if="!element">
                      <span
                        class="text-sm font-bold text-gray-600 dark:text-gray-500"
                        >{{ item.split(':')[0] }}</span
                      >
                      <span class="text-sm dark:text-gray-400">{{
                        item.split(':')[1]
                      }}</span>
                    </template>
                    <template v-else>
                      <span
                        class="text-sm font-bold text-gray-600 dark:text-gray-500"
                        >{{ index + 1 }}</span
                      >
                      <span class="text-sm dark:text-gray-400">{{ item }}</span>
                    </template>
                  </div>
                </template>
              </div>
            </template>
          </el-skeleton>
        </Card>
      </el-col>
      <el-col v-if="app" :span="4" :offset="1">
        <Card class="text-center mx-auto dark:text-gray-400">
          <div>
            <i class="iconfont iconsaoma"></i>
            <span class="text-xs pl-2">{{ $t('label.app') }}</span>
          </div>
          <el-skeleton
            :loading="loading || !detailResolve"
            animated
            :throttle="500"
          >
            <template #template>
              <el-skeleton-item
                variant="image"
                class="w-40 h-40 mx-auto my-3"
              />
            </template>
            <template #default>
              <img
                src="~/assets/img/code.jpg"
                alt="小程序码"
                class="w-40 h-40 mx-auto my-3"
              />
            </template>
          </el-skeleton>
        </Card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import {
  ElRow,
  ElCol,
  ElCard,
  ElSkeleton,
  ElSkeletonItem,
} from 'element-plus/dist/index.full'

export default defineComponent({
  components: {
    ElRow,
    ElCol,
    ElCard,
    ElSkeleton,
    ElSkeletonItem,
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
    subTitle: {
      type: String,
      default: '',
    },
    loading: {
      type: Boolean,
      default: true,
    },
  },
  setup() {
    const detailResolve = ref(false)
    onMounted(() => {
      detailResolve.value = true
    })

    return {
      detailResolve,
    }
  },
})
</script>
