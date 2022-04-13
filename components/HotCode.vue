<template>
  <div>
    <!-- <el-card v-if="this.$route.path === '/'" class="treeCard"> -->
    <el-card class="mx-auto w-4/6 bg-white bg-opacity-1 dark:bg-black-dark">
      <transition name="emerge" appear>
        <keep-alive>
          <div
            class="border border-solid border-gray-200 bg-white text-black duration-300 rounded shadow p-10 dark:bg-black-dark dark:border-gray-50 dark:border-opacity-10"
          >
            <div class="text-base text-red-400 font-bold mt-0 mb-1 text-center">
              <i class="iconfont iconremen text-xl"></i
              >{{ $t('label.hotCode') }}
            </div>
            <el-row class="flex flex-wrap" :gutter="8">
              <el-col
                class="mt-2"
                v-show="index < 60"
                v-for="(item, index) in hotData"
                :key="index"
                :span="4"
              >
                <div
                  @click="hotSearch(item)"
                  class="h-full text-center box-border border border-solid border-gray-300 shadow rounded py-5 text-gray-600 hover:bg-gray-50 hover:text-blue-500 hover:cursor-pointer dark:hover:bg-gray-900 dark:border-gray-50 dark:border-opacity-20 dark:text-gray-400 dark:hover:text-blue-500"
                >
                  <p>{{ item }}</p>
                </div>
              </el-col>
            </el-row>
            <transition name="hotEmerge">
              <keep-alive>
                <el-row class="flex flex-wrap" :gutter="8" v-show="showMore">
                  <el-col
                    class="mt-2"
                    v-show="index >= 60"
                    v-for="(item, index) in hotData"
                    :key="index"
                    :span="4"
                  >
                    <div
                      @click="hotSearch(item)"
                      class="h-full text-center box-border border border-solid border-gray-300 shadow rounded py-5 text-gray-600 hover:bg-gray-50 hover:text-blue-500 hover:cursor-pointer dark:hover:bg-gray-900 dark:border-gray-50 dark:border-opacity-20 dark:text-gray-400 dark:hover:text-blue-500"
                    >
                      <p>{{ item }}</p>
                    </div>
                  </el-col>
                </el-row>
              </keep-alive>
            </transition>
            <el-row class="flex flex-wrap justify-center">
              <el-col class="mt-2" :span="5">
                <div
                  class="text-sm cursor-pointer text-gray-500 text-center mt-2 hover:text-blue-500"
                  v-if="hotData.length > 60"
                  @click="toggle()"
                >
                  {{ showMore ? $t('label.fold') : $t('label.showMore') }}
                  <i
                    :class="
                      showMore ? 'el-icon-arrow-up' : 'el-icon-arrow-down'
                    "
                  ></i>
                </div>
              </el-col>
            </el-row>
          </div>
        </keep-alive>
      </transition>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { hotCode } from '~~/hotCode'
import { ElCard, ElRow, ElCol } from 'element-plus/dist/index.full'
import Header from './Header.vue'

export default defineComponent({
  components: {
    ElCard,
    ElRow,
    ElCol,
  },
  setup() {
    const { router } = Header
    const hotData = hotCode
    const showMore = ref(false)
    const toggle = () => {
      showMore.value = !showMore.value
    }
    const hotSearch = (item) => {
      router.push({
        path: 'table',
        query: {
          key: encodeURIComponent(item),
        },
      })
    }
    return {
      hotData,
      showMore,
      toggle,
      hotSearch,
    }
  },
})
</script>

<style lang="scss" scoped>
.hotEmerge-enter-active {
  transition: all 0.5s linear;
}

.hotEmerge-enter {
  transform: translateY(100%);
}
</style>
