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
    const { $emitter } = useNuxtApp()
    const keyWord = ref('')
    const router = useRouter()
    const routePath = router.currentRoute.value.path
    const inputKeyUpEnter = () => {
      getKey()
    }
    const getKey = async () => {
      if (keyWord.value) {
        $emitter.emit('loading', true)
        const encodeKey = encodeURIComponent(keyWord.value)
        const { data } = await useFetch(
          `https://hscode.vip/api/search?keyword=${encodeKey}`,
          {
            method: 'post',
          }
        )
        const res = toRaw(unref(data))
        $emitter.emit('loading', false)
        if (res.code !== 200) {
          return ElMessage.error({ message: `${res.data}`, center: true })
        } else {
          if (routePath === '/result') {
            $emitter.emit('search-change', { key: keyWord.value, res: res })
          } else {
            router.push({
              path: 'result',
              query: {
                key: encodeKey,
              },
            })
          }
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
