<template>
  <div>
    <el-container>
      <el-header>
        <div class="flexRow">
          <!-- 面包屑导航区域 -->
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
              <el-button @click="changeLang">{{ $t(lang) }}</el-button>
            </el-breadcrumb-item>
          </el-breadcrumb>
          <!-- logo区域 -->
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
import { merge } from 'webpack-merge'

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
    const { $http } = useNuxtApp()
    const keyWord = ref(null)
    const child = ref(null)
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

    const inputKeyUpEnter = () => {
      if (keyWord !== '') {
        if (routePath.value === '/table') {
          // url的query参数根据搜索而变化，实现源码也能动态刷新
          router.push({
            query: merge<any>(router.currentRoute.value.query, {
              key: encodeURIComponent(keyWord),
            }),
          })
          // return child.getListByKey(encodeURIComponent(keyWord))
        } else {
          // getKey()
        }
      } else {
        return ElMessage.info({
          message: '请输入搜索内容！',
          center: true,
        })
      }
    }

    const getKey = async () => {
      if (keyWord !== '') {
        // 判断搜索关键词合法性
        const { data: res } = await $http.post(
          `search?keyword=${encodeURIComponent(keyWord)}`
        )
        if (res.code !== 200) {
          return ElMessage.error({ message: `${res.data}`, center: true })
        } else {
          router.push({
            path: 'table',
            query: {
              // 链接携带的参数转码传输
              key: encodeURIComponent(keyWord),
            },
          })
        }
      } else {
        return ElMessage.info({
          message: '请输入搜索内容！',
          center: true,
        })
      }
    }

    return {
      keyWord,
      drawer,
      dialogFormVisible,
      routePath,
      lang,
      changeTitle,
      goHome,
      changeLang,
      inputKeyUpEnter,
      getKey,
    }
  },
})
</script>
