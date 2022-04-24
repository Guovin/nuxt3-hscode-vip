<template>
  <Card class="w-4/6">
    <div
      class="border border-solid border-gray-200 bg-white text-black duration-300 rounded shadow p-10 dark:bg-black-dark dark:border-gray-50 dark:border-opacity-10"
    >
      <div class="text-base text-red-400 font-bold mt-0 mb-1 text-center">
        <i class="iconfont iconremen text-xl"></i>{{ $t('label.hotCode') }}
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
            @click="searchByHot(item)"
            class="h-full text-sm text-center box-border border border-solid border-gray-300 shadow rounded py-5 text-gray-600 hover:bg-gray-50 hover:text-blue-500 hover:cursor-pointer dark:hover:bg-gray-900 dark:border-gray-50 dark:border-opacity-20 dark:text-gray-400 dark:hover:text-blue-500"
          >
            <p>{{ item }}</p>
          </div>
        </el-col>
      </el-row>
      <transition
        appear
        enter-active-class="transition duration-500 ease-in-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
      >
        <el-row class="flex flex-wrap" :gutter="8" v-show="showMore">
          <el-col
            class="mt-2"
            v-show="index >= 60"
            v-for="(item, index) in hotData"
            :key="index"
            :span="4"
          >
            <div
              @click="searchByHot(item)"
              class="h-full text-sm text-center box-border border border-solid border-gray-300 shadow rounded py-5 text-gray-600 hover:bg-gray-50 hover:text-blue-500 hover:cursor-pointer dark:hover:bg-gray-900 dark:border-gray-50 dark:border-opacity-20 dark:text-gray-400 dark:hover:text-blue-500"
            >
              <p>{{ item }}</p>
            </div>
          </el-col>
        </el-row>
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
              :class="showMore ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"
            ></i>
          </div>
        </el-col>
      </el-row>
    </div>
  </Card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { hotCode } from '~~/defaultState'
import { ElCard, ElRow, ElCol } from 'element-plus/dist/index.full'

export default defineComponent({
  components: {
    ElCard,
    ElRow,
    ElCol,
  },
  setup() {
    const router = useRouter()
    const hotData = hotCode
    const showMore = ref(false)
    const { $emitter } = useNuxtApp()
    const toggle = () => {
      showMore.value = !showMore.value
    }
    const searchByHot = (item) => {
      $emitter.emit('loading', true)
      router.push({
        path: 'result',
        query: {
          key: encodeURIComponent(item),
        },
      })
    }
    return {
      hotData,
      showMore,
      toggle,
      searchByHot,
    }
  },
})
</script>
