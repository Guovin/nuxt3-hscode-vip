<template>
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
</template>

<script lang="ts">
import { defineComponent, unref, toRaw } from 'vue'
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
  emits: ['search'],
  setup(_, context) {
    const keyWord = ref('')
    const router = useRouter()
    const routePath = router.currentRoute.value.path
    const inputKeyUpEnter = () => {
      if (keyWord.value !== '') {
        if (routePath === '/result') {
          // router.push({
          //   query: merge<any>(router.currentRoute.value.query, {
          //     key: encodeURIComponent(keyWord.value),
          //   }),
          // })
          context.emit('search', keyWord.value)
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
      if (keyWord.value !== '') {
        const { data: response } = await useAsyncData(keyWord.value, () =>
          $fetch(
            `https://hscode.vip/api/search?keyword=${encodeURIComponent(
              keyWord.value
            )}`,
            {
              method: 'post',
            }
          )
        )
        const res = toRaw(unref(response))
        if (res.code !== 200) {
          return ElMessage.error({ message: `${res.data}`, center: true })
        } else {
          router.push({
            path: 'result',
            query: {
              key: encodeURIComponent(keyWord.value),
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
