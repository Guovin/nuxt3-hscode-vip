<template>
  <Card class="my-10 w-3/5">
    <div
      class="border border-solid border-gray-200 bg-white text-black duration-300 rounded shadow p-10 dark:bg-black-dark dark:border-gray-50 dark:border-opacity-10"
    >
      <div class="text-base text-blue-400 font-bold text-center mb-2">
        <i class="iconfont iconfenleishouye pr-1"></i>{{ $t('label.category') }}
      </div>
      <div v-loading="loading">
        <el-input
          v-model="query"
          :placeholder="$t('placeHolder.treeFilter')"
          @input="onQueryChanged"
          class="m-3 pr-5"
        />
        <el-tree
          ref="treeRef"
          :data="treeData"
          :props="treeProps"
          :filter-node-method="filterTree"
          :empty-text="$t('tip.noData')"
          :height="300"
          class="dark:bg-black-dark dark:text-gray-400"
        >
          <template class="span-ellipsis" #default="{ node, data }">
            <span>
              <el-button
                type="text"
                v-show="node.isLeaf == true"
                @click="() => searchByTree(data)"
              >
                {{ $t('label.search') }}
              </el-button>
            </span>
            <span class="text-sm pl-4">{{ node.label }}</span>
          </template>
        </el-tree>
      </div>
    </div>
  </Card>
</template>

<script lang="ts">
import { defineComponent, ref, unref, toRaw } from 'vue'
import {
  ElCard,
  ElTree,
  ElButton,
  ElInput,
  ElSkeleton,
  ElSkeletonItem,
} from 'element-plus/dist/index.full'

export default defineComponent({
  components: {
    ElCard,
    ElTree,
    ElButton,
    ElInput,
    ElSkeleton,
    ElSkeletonItem,
  },
  async setup() {
    const { $emitter } = useNuxtApp()
    const router = useRouter()
    const treeProps = {
      value: 'id',
      label: 'label',
      children: 'children',
    }
    const response = ref(null)
    const state = reactive({
      loading: true,
      query: '',
      treeRef: <InstanceType<typeof ElTree>>null,
      treeData: [],
    })
    interface Tree {
      id: number
      label: string
      children?: Tree[]
    }
    const { data } = await useLazyAsyncData('class', () =>
      $fetch('https://hscode.vip/api/hscode/getAllHscodeClassify', {
        method: 'post',
      })
    )

    const initTree = (response) => {
      const data = []
      response.data.class.forEach((item, index) => {
        const info = {
          id: index,
          label: item,
          children: response.data.info[item].map((child) => {
            return {
              id: child.id,
              label: child.sub_class,
              hscode_prefix: child.hscode_prefix,
            }
          }),
        }
        data.push(info)
        state.loading = false
      })
      return data
    }

    const resolveData = (value) => {
      response.value = toRaw(unref(value))
      if (response.value) {
        state.treeData = initTree(response.value)
      }
    }

    watch(
      data,
      (newData) => {
        resolveData(newData)
      },
      { immediate: true }
    )

    const onQueryChanged = (query: string) => {
      state.treeRef!.filter(query)
    }

    const filterTree = (value: string, data: Tree) => {
      if (!value) return true
      return data.label.includes(value)
    }
    const searchByTree = (data) => {
      $emitter.emit('loading', true)
      router.push({
        path: 'result',
        query: {
          key: encodeURIComponent(data.hscode_prefix),
        },
      })
    }
    return {
      ...toRefs(state),
      treeProps,
      onQueryChanged,
      filterTree,
      searchByTree,
    }
  },
})
</script>
