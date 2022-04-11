<template>
  <div class="py-10">
    <!-- <el-card v-if="routePath === '/'" class="treeCard"> -->
    <el-card
      class="mx-auto w-3/5 bg-white bg-opacity-1 border-white border-opacity-1 rounded dark:bg-gray-900"
    >
      <transition name="emerge" appear>
        <keep-alive>
          <div
            class="border border-solid border-gray-200 bg-white text-black duration-300 rounded shadow p-10 dark:bg-gray-900"
          >
            <div
              class="text-base text-blue-400 font-bold mt-0 mb-1 text-center"
            >
              <i class="iconfont iconfenleishouye"></i
              >{{ $t('label.category') }}
            </div>
            <el-input
              v-model="query"
              :placeholder="$t('placeHolder.treeFilter')"
              @input="onQueryChanged"
              class="m-3"
            />
            <el-tree-v2
              ref="treeRef"
              :data="treeData"
              :props="treeProps"
              :filter-method="filterTree"
              :empty-text="$t('tip.noData')"
              :height="300"
              class="dark:bg-gray-900"
            >
              <template class="span-ellipsis" #default="{ node, data }">
                <span>
                  <el-button
                    type="text"
                    v-show="node.isLeaf == true"
                    @click="() => searchPrefix(data)"
                  >
                    {{ $t('label.search') }}
                  </el-button>
                </span>
                <span class="text-sm pl-4">{{ node.label }}</span>
              </template>
            </el-tree-v2>
          </div>
        </keep-alive>
      </transition>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import {
  ElCard,
  ElTreeV2,
  ElButton,
  ElInput,
} from 'element-plus/dist/index.full'
import type { TreeNode } from 'element-plus/es/components/tree-v2/src/types'
import Header from './Header.vue'

export default defineComponent({
  components: {
    ElCard,
    ElTreeV2,
    ElButton,
    ElInput,
  },
  async setup() {
    const { router, routePath } = Header
    const { $http } = useNuxtApp()
    const treeProps = {
      value: 'id',
      label: 'label',
      children: 'children',
    }
    const query = ref('')
    const treeRef = ref<InstanceType<typeof ElTreeV2>>()
    const { data: response } = await $http.post('/hscode/getAllHscodeClassify')
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
      })
      return data
    }
    const treeData = initTree(response)
    const onQueryChanged = (query: string) => {
      treeRef.value!.filter(query)
    }
    const filterTree = (query: string, node: TreeNode) => {
      return node.label!.includes(query)
    }
    const searchPrefix = (data) => {
      router.push({
        path: 'table',
        query: {
          key: encodeURIComponent(data.prefix),
        },
      })
    }
    return {
      routePath,
      query,
      treeRef,
      treeProps,
      treeData,
      onQueryChanged,
      filterTree,
      searchPrefix,
    }
  },
})
</script>
