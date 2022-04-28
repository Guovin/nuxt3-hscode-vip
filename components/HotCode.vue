<template>
  <Card class="w-11/12 w-min-max xl:w-3/5">
    <div
      class="border border-solid border-gray-200 bg-white text-black duration-300 rounded-xl shadow p-2 sm:p-10 dark:bg-black-dark dark:border-gray-50 dark:border-opacity-10"
    >
      <div class="text-base text-red-400 font-bold text-center mb-2">
        <i class="iconfont iconremen text-xl pr-1"></i>{{ $t('label.hotCode') }}
      </div>
      <div class="flex flex-wrap justify-between">
        <div
          class="mt-2"
          v-show="index < 60"
          v-for="(item, index) in hotData"
          :key="index"
        >
          <div
            @click="searchByHot(item)"
            class="w-24 h-full text-sm text-center box-border border border-solid border-gray-300 shadow rounded-xl py-5 text-gray-600 hover:bg-gray-50 hover:text-blue-500 hover:cursor-pointer dark:hover:bg-gray-900 dark:border-gray-50 dark:border-opacity-20 dark:text-gray-400 dark:hover:text-blue-500"
          >
            <p>{{ item }}</p>
          </div>
        </div>
      </div>
      <transition
        appear
        enter-active-class="transition duration-500 ease-in-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
      >
        <div
          class="flex flex-wrap justify-between"
          :gutter="8"
          v-show="showMore"
        >
          <div
            class="mt-2"
            v-show="index >= 60"
            v-for="(item, index) in hotData"
            :key="index"
            :span="4"
          >
            <div
              @click="searchByHot(item)"
              class="w-24 h-full text-sm text-center box-border border border-solid border-gray-300 shadow rounded-xl py-5 text-gray-600 hover:bg-gray-50 hover:text-blue-500 hover:cursor-pointer dark:hover:bg-gray-900 dark:border-gray-50 dark:border-opacity-20 dark:text-gray-400 dark:hover:text-blue-500"
            >
              <p>{{ item }}</p>
            </div>
          </div>
        </div>
      </transition>
      <div class="flex flex-wrap justify-center">
        <div class="mt-2" :span="5">
          <div
            class="text-sm whitespace-nowrap cursor-pointer text-gray-500 text-center mt-2 hover:text-blue-500"
            v-if="hotData.length > 60"
            @click="toggle()"
          >
            {{ showMore ? $t('label.fold') : $t('label.showMore') }}
            <i
              :class="
                showMore ? 'iconfont iconxiangshang' : 'iconfont iconxiangxia'
              "
            ></i>
          </div>
        </div>
      </div>
    </div>
  </Card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { hotCode } from '~~/defaultState'
import { ElCard } from 'element-plus/dist/index.full'

export default defineComponent({
  components: {
    ElCard,
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
