<template>
  <div>
    <el-container>
      <el-header>
        <div class="flexRow">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }" @click="changeTitle"
              ><i class="iconfont iconshouye"></i>{{ $t('label.home') }}
            </el-breadcrumb-item>
            <el-breadcrumb-item
              v-if="routePath === '/table' || routePath === '/detail'"
              ><i class="iconfont iconsousuo"></i>{{ $t('label.result') }}
            </el-breadcrumb-item>
            <el-breadcrumb-item v-if="routePath === '/detail'"
              ><i class="iconfont iconpicixiangqing"></i
              >{{ $t('label.detail') }}
            </el-breadcrumb-item>
            <el-breadcrumb-item v-if="routePath === '/barcode'"
              ><i class="iconfont iconpicixiangqing"></i
              >{{ $t('label.barcode') }}
            </el-breadcrumb-item>
            <el-breadcrumb-item>
              <el-button @click="changeLang" size="small" circle>{{
                $t(lang)
              }}</el-button>
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
        <div class="logo_container">
          <img
            class="logo_img"
            src="../assets/img/logo.png"
            alt="HSCode.VIP"
            @click="goHome"
          /><img />
        </div>
      </el-header>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, toRefs, inject } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useI18nStore } from '~~/store/i18n'
import {
  ElContainer,
  ElHeader,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElLink,
  ElMessage,
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
  setup(context) {
    const { locale } = useI18n()
    const i18nStore = useI18nStore()
    const lang = ref('label.lang')
    const keyWord = ref(null)
    const drawer = ref(false)
    const dialogFormVisible = ref(false)
    const router = useRouter()
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

    return {
      keyWord,
      drawer,
      dialogFormVisible,
      router,
      routePath,
      lang,
      changeTitle,
      goHome,
      changeLang,
    }
  },
})
</script>

<style lang="scss" scoped>
.flexRow {
  display: flex;
  justify-content: space-between;
  .el-breadcrumb {
    margin-top: 10px;
  }
  .barcodeLink::before {
    font-family: 'iconfont';
    content: '\e642';
  }
}

.logo_container {
  text-align: center;
  -moz-user-select: none;
  -o-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  .logo_img:hover {
    cursor: pointer;
  }
}
</style>
