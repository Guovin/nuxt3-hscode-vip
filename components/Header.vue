<template>
  <div>
    <el-container>
      <el-header class="py-2 h-auto dark:bg-gray-900">
        <div class="flex justify-between">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }" @click="changeTitle"
              ><i class="iconfont iconshouye"></i>
              <span class="pl-2 dark:text-gray-200">
                {{ $t('label.home') }}
              </span>
            </el-breadcrumb-item>
            <el-breadcrumb-item
              v-if="routePath === '/table' || routePath === '/detail'"
              ><i class="iconfont iconsousuo"></i>
              <span class="pl-2 dark:text-gray-200">
                {{ $t('label.result') }}
              </span>
            </el-breadcrumb-item>
            <el-breadcrumb-item v-if="routePath === '/detail'"
              ><i class="iconfont iconpicixiangqing"></i>
              <span class="pl-2 dark:text-gray-200">
                {{ $t('label.detail') }}
              </span>
            </el-breadcrumb-item>
            <el-breadcrumb-item v-if="routePath === '/barcode'"
              ><i class="iconfont iconpicixiangqing"></i>
              <span class="pl-2 dark:text-gray-200">
                {{ $t('label.barcode') }}
              </span>
            </el-breadcrumb-item>
            <el-breadcrumb-item>
              <el-button @click="changeLang" size="small" circle>{{
                $t(lang)
              }}</el-button>
            </el-breadcrumb-item>
            <el-breadcrumb-item>
              <el-button @click="changeTheme" size="small" circle>
                <i v-if="theme === 'light'" class="iconfont iconsunny"></i>
                <i v-else class="iconfont iconmoon"></i>
              </el-button>
            </el-breadcrumb-item>
          </el-breadcrumb>
          <el-link
            class="barcodeLink"
            href="/barcode"
            type="warning"
            v-if="routePath !== '/barcode'"
            >{{ $t('label.barcode') }}
          </el-link>
        </div>
      </el-header>
      <div class="my-4">
        <img
          class="cursor-pointer m-auto"
          src="../assets/img/logo.png"
          alt="HSCode.VIP"
          @click="goHome"
        /><img />
      </div>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, toRefs, inject } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useI18nStore } from '~~/store/i18n'
import {
  ElContainer,
  ElHeader,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElLink,
  ElButton,
} from 'element-plus/dist/index.full'

export default defineComponent({
  components: {
    ElContainer,
    ElHeader,
    ElBreadcrumb,
    ElBreadcrumbItem,
    ElLink,
    ElButton,
  },
  setup() {
    const { locale } = useI18n()
    const i18nStore = useI18nStore()
    const router = useRouter()
    const theme = inject('theme')
    const state = {
      lang: 'label.lang',
      keyWord: null,
      drawer: false,
      dialogFormVisible: false,
    }
    const routePath = computed({
      get: () => {
        return router.currentRoute.value.path
      },
      set: () => {},
    })

    const changeTitle = () => {
      document.title = 'HSCode编码查询-首页'
    }

    const goHome = () => {
      if (routePath.value !== '/') {
        document.title = 'HSCode编码查询-首页'
        return router.push('/')
      }
    }

    const changeLang = () => {
      i18nStore.changeLang()
      locale.value = i18nStore.locale
    }

    const changeTheme = inject('changeTheme')

    return {
      ...toRefs(state),
      theme,
      router,
      routePath,
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
