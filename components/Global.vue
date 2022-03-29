<template>
  <div>
    <el-container>
      <el-header>
        <div class="flexRow">
          <!-- 面包屑导航区域 -->
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }" @click.native="changeTitle"
              ><i class="iconfont iconshouye"></i>首页
            </el-breadcrumb-item>
            <el-breadcrumb-item
              v-if="routePath === '/table' || routePath === '/detail'"
              ><i class="iconfont iconsousuo"></i>搜索结果
            </el-breadcrumb-item>
            <el-breadcrumb-item v-if="routePath === '/detail'"
              ><i class="iconfont iconpicixiangqing"></i>内容详情
            </el-breadcrumb-item>
            <el-breadcrumb-item v-if="routePath === '/barcode'"
              ><i class="iconfont iconpicixiangqing"></i>条形码生成器
            </el-breadcrumb-item>
          </el-breadcrumb>
          <!-- logo区域 -->
          <el-link
            class="barcodeLink"
            href="/barcode"
            type="warning"
            v-if="routePath !== '/barcode'"
            >条形码生成器
          </el-link>
        </div>
        <div class="logo_container">
          <!-- <span class="logo" @click="goHome">
            <span class="logo_hs">HS</span><span>Code<span class="logo_vip">.VIP</span></span>
          </span> -->
          <img
            class="logo_img"
            src="../assets/logo.png"
            alt="HSCode.VIP"
            @click="goHome"
          /><img />
        </div>
      </el-header>
      <el-main>
        <el-card v-if="routePath !== '/barcode'" class="searchCard">
          <!-- 搜索区域 -->
          <transition name="emerge" appear>
            <keep-alive>
              <el-input
                placeholder="请输入商品名称或商品编码"
                v-model="keyWord"
                @keyup.enter.native="inputKeyUpEnter"
                clearable
              >
                <el-button
                  slot="append"
                  icon="el-icon-search"
                  @click="inputKeyUpEnter"
                ></el-button>
              </el-input>
            </keep-alive>
          </transition>
        </el-card>
      </el-main>
      <el-footer class="footer">
        copyright
        <a
          href="https://www.hscode.vip"
          style="color: #317eb2; text-decoration: none"
          target="blank"
          >www.hscode.vip</a
        >
        版权归 HSCode编码网
        <span style="color: #317eb2" @click="drawer = true" class="statement"
          >网站声明</span
        >
        <div class="note">
          本站所有数据仅供学习与参考，如有疑问，请<span
            class="feedback"
            style="color: #317eb2"
            @click="dialogFormVisible = true"
          >
            反馈
          </span>
        </div>
        <a
          href="https://beian.miit.gov.cn/"
          style="color: #317eb2; text-decoration: none"
          target="blank"
          >粤ICP备20062496号</a
        >
      </el-footer>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, toRefs, inject } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

export default defineComponent({
  setup(context) {
    const axios: any = inject('axios')
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

    const methods = reactive({
      changeTitle: () => {
        document.title = 'HSCode编码查询-首页'
      },

      goHome: () => {
        if (routePath.value !== '/') {
          document.title = 'HSCode编码查询-首页'
          return router.push('/')
        }
      },

      inputKeyUpEnter() {
        if (keyWord !== '') {
          if (routePath.value === '/table') {
            // url的query参数根据搜索而变化，实现源码也能动态刷新
            const { merge } = require('webpack-merge')
            router.push({
              query: merge(router.currentRoute.value.query, {
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
      },

      async getKey() {
        if (keyWord !== '') {
          // 判断搜索关键词合法性
          const { data: res } = await axios.post(
            `search?keyword=${encodeURIComponent(keyWord)}`
          )
          if (res.code !== 200) {
            return this.$message.error({ message: `${res.data}`, center: true })
          } else {
            this.$router.push({
              path: 'table',
              query: {
                // 链接携带的参数转码传输
                key: encodeURIComponent(keyWord),
              },
            })
          }
        } else {
          return this.$message.info({
            message: '请输入搜索内容！',
            center: true,
          })
        }
      },
    })

    return {
      keyWord,
      drawer,
      dialogFormVisible,
      routePath,
      ...toRefs(methods),
    }
  },
})
</script>
