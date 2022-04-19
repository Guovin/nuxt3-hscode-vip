<template>
  <div class="fixed w-full bg-white z-50 shadow-lg">
    <el-container>
      <el-header class="py-4 h-auto dark:bg-gray-800">
        <div class="flex justify-between items-center">
          <div class="flex items-center">
            <div class="pr-6">
              <img
                class="cursor-pointer m-auto h-6"
                src="../assets/img/logo.png"
                alt="HSCode.VIP"
                @click="goHome"
              />
            </div>
            <el-breadcrumb :separator-icon="ArrowRight">
              <el-breadcrumb-item :to="{ path: '/' }" @click="changeTitle"
                ><i class="iconfont iconshouye"></i>
                <span class="pl-2">
                  {{ $t('label.home') }}
                </span>
              </el-breadcrumb-item>
              <el-breadcrumb-item v-if="routePath === '/result'"
                ><i class="iconfont iconsousuo"></i>
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
                ><i class="iconfont iconpicixiangqing"></i>
                <span class="pl-2">
                  {{ $t('label.barcode') }}
                </span>
              </el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <div class="h-8 w-1/3">
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
            <el-button @click="changeLang" size="small" circle>{{
              $t(lang)
            }}</el-button>
            <el-button @click="changeTheme" size="small" circle>
              <i v-if="theme === 'light'" class="iconfont iconsunny"></i>
              <i v-else class="iconfont iconmoon"></i>
            </el-button>
            <div class="pl-6">
              <el-link class="barcodeLink" href="/code" type="warning"
                >{{ $t('label.barcode') }}
              </el-link>
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

    const changeTitle = () => {
      document.title = 'HSCode编码查询-首页'
    }

    const goHome = () => {
      if (routePath.value !== '/') {
        document.title = 'HSCode编码查询-首页'
        return router.push('/')
      }
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
      changeTitle,
      goHome,
      changeLang,
      changeTheme,
    }
  },
})
</script>

<style lang="scss" scoped>
.barcodeLink::before {
  font-family: 'iconfont';
  content: '\e642';
}
</style>
