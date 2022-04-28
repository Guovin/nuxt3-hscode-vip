<template>
  <div class="fixed w-full bg-white z-50 shadow-lg">
    <el-container>
      <el-header class="px-2 sm:px-4 py-4 h-auto dark:bg-gray-800">
        <div class="flex justify-between items-center whitespace-nowrap">
          <div class="flex items-center">
            <div class="pr-2 sm:pr-6">
              <NuxtLink to="/">
                <img
                  class="cursor-pointer m-auto sm:h-6"
                  src="../assets/img/logo.png"
                  alt="HSCode.VIP"
                />
              </NuxtLink>
            </div>
            <div class="hidden sm:block">
              <el-breadcrumb :separator-icon="ArrowRight">
                <el-breadcrumb-item :to="{ path: '/' }">
                  <i class="iconfont iconshouye"></i>
                  <span class="pl-2">
                    {{ $t('label.home') }}
                  </span>
                </el-breadcrumb-item>
                <el-breadcrumb-item v-if="routePath === '/result'">
                  <i class="iconfont iconsousuo"></i>
                  <span class="pl-2">
                    {{ $t('label.result') }}
                  </span>
                </el-breadcrumb-item>
                <el-breadcrumb-item
                  v-if="routePath === '/content'"
                  @click="goBackResult"
                >
                  <div
                    class="transition duration-300 ease-in-out hover:text-bread-blue hover:cursor-pointer font-bold dark:text-gray-200 dark:hover:text-bread-blue"
                  >
                    <i class="iconfont iconsousuo"></i>
                    <span class="pl-2">
                      {{ $t('label.result') }}
                    </span>
                  </div>
                </el-breadcrumb-item>
                <el-breadcrumb-item v-if="routePath === '/content'"
                  ><i class="iconfont iconpicixiangqing"></i>
                  <span class="pl-2">
                    {{ $t('label.detail') }}
                  </span>
                </el-breadcrumb-item>
                <el-breadcrumb-item v-if="routePath === '/code'"
                  ><i class="iconfont icontiaoxingma1"></i>
                  <span class="pl-2">
                    {{ $t('label.barcode') }}
                  </span>
                </el-breadcrumb-item>
              </el-breadcrumb>
            </div>
          </div>
          <div class="h-8 w-full min-w-max pr-2 sm:w-1/3 sm:pr-0">
            <transition
              appear
              enter-active-class="transition duration-300 ease-in-out"
              enter-from-class="opacity-0"
              enter-to-class="opacity-100"
              leave-active-class="transition duration-300 ease-in-out"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0"
            >
              <Search v-if="showSearch"></Search>
            </transition>
          </div>
          <div class="flex items-center">
            <el-button
              @click="changeLang"
              :color="theme === 'dark' ? '#0d1117' : ''"
              size="small"
              circle
              >{{ $t(lang) }}</el-button
            >
            <el-button
              @click="changeTheme"
              :color="theme === 'dark' ? '#0d1117' : ''"
              size="small"
              circle
            >
              <i v-if="theme === 'light'" class="iconfont iconsunny"></i>
              <i v-else class="iconfont iconmoon"></i>
            </el-button>
            <div class="pl-2 sm:pl-6">
              <i class="iconfont icontiaoxingma1 text-yellow-500 pr-1"></i>
              <span class="hidden sm:inline">
                <el-link href="/code" type="warning">
                  {{ $t('label.barcode') }}
                </el-link>
              </span>
            </div>
          </div>
        </div>
      </el-header>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, reactive, toRefs, inject } from 'vue'
import { useRouter } from 'vue-router'
import {
  ElContainer,
  ElHeader,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElLink,
  ElButton,
} from 'element-plus/dist/index.full'
import { ArrowRight } from '@element-plus/icons-vue'

export default defineComponent({
  components: {
    ElContainer,
    ElHeader,
    ElBreadcrumb,
    ElBreadcrumbItem,
    ElLink,
    ElButton,
  },
  props: {
    showSearch: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const router = useRouter()
    const theme = inject('theme')
    const state = reactive({
      key: '',
      lang: 'label.lang',
      keyWord: null,
      drawer: false,
      dialogFormVisible: false,
    })
    const routePath = computed({
      get: () => {
        return router.currentRoute.value.path
      },
      set: () => {},
    })

    const goBackResult = () => {
      router.go(-1)
    }

    const changeLang = inject('changeLang')

    const changeTheme = inject('changeTheme')

    return {
      ArrowRight,
      ...toRefs(state),
      theme,
      router,
      routePath,
      goBackResult,
      changeLang,
      changeTheme,
    }
  },
})
</script>
