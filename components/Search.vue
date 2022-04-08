<template>
  <div>
    <el-card
      v-if="routePath !== '/barcode'"
      class="m-auto mb-10 w-2/4 bg-white bg-opacity-1 border-white border-opacity-1"
    >
      <transition name="emerge" appear>
        <keep-alive>
          <el-input
            :placeholder="$t('placeHolder.search')"
            v-model="keyWord"
            @keyup.enter="inputKeyUpEnter"
            clearable
          >
            <template #append>
              <el-button :icon="Search" @click="inputKeyUpEnter"></el-button>
            </template>
          </el-input>
        </keep-alive>
      </transition>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Header from './Header.vue'
import { merge } from 'webpack-merge'
import {
  ElCard,
  ElInput,
  ElMessage,
  ElButton,
} from 'element-plus/dist/index.full'
import { Search } from '@element-plus/icons-vue'

export default defineComponent({
  components: {
    ElCard,
    ElInput,
    ElButton,
  },
  setup() {
    const { keyWord, routePath } = Header
    const { $http } = useNuxtApp()
    const router = useRouter()
    const inputKeyUpEnter = () => {
      if (keyWord !== '') {
        if (routePath.value === '/table') {
          router.push({
            query: merge<any>(router.currentRoute.value.query, {
              key: encodeURIComponent(keyWord),
            }),
          })
          // return child.getListByKey(encodeURIComponent(keyWord))
        } else {
          getKey()
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
        const { data: res } = await $http.post(
          `search?keyword=${encodeURIComponent(keyWord)}`
        )
        if (res.code !== 200) {
          return ElMessage.error({ message: `${res.data}`, center: true })
        } else {
          router.push({
            path: 'table',
            query: {
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
      routePath,
      inputKeyUpEnter,
      Search,
    }
  },
})
</script>
