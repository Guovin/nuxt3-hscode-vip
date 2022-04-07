<template>
  <div>
    <!-- <el-card v-if="routePath === '/'" class="treeCard"> -->
    <el-card class="tree-card-container">
      <transition name="emerge" appear>
        <keep-alive>
          <div class="tree-card">
            <div class="cate-title">
              <i class="iconfont iconfenleishouye"></i
              >{{ $t('label.category') }}
            </div>
            <el-input
              v-model="query"
              :placeholder="$t('placeHolder.treeFilter')"
              @input="onQueryChanged"
              class="filter-input"
            />
            <el-tree-v2
              ref="treeRef"
              :data="treeData"
              :props="treeProps"
              :filter-method="filterTree"
              :empty-text="$t('tip.noData')"
              :height="300"
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
                <span class="sub-title">{{ node.label }}</span>
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

<style lang="scss" scoped>
.el-tree {
  border-radius: 0.5%;
}

.el-tree-node__children span {
  font-size: 12px;
}

.tree-card-container {
  margin: auto;
  margin-top: 30px;
  margin-bottom: 10px;
  width: 65%;
  background-color: rgba(255, 255, 255, 0.01);
  border: rgba(255, 255, 255, 0.01);

  .tree-card {
    border: 1px solid #ebeef5;
    background-color: #fff;
    color: #303133;
    -webkit-transition: 0.3s;
    transition: 0.3s;
    border-radius: 4px;
    overflow: hidden;
    box-shadow: 0 1px 10px rgba(0, 0, 0, 0.15) !important;
    padding: 10px 20px 20px 20px;
    .cate-title {
      font-size: 16px;
      color: #409eff;
      font-weight: bold;
      margin: 0 auto 5px auto;
      text-align: center;
    }
    .filter-input {
      margin: 12px 8px;
    }
    @media screen and (max-width: 1350px) {
      .span-ellipsis {
        display: block;
        white-space: nowrap;
        overflow: auto;
        text-overflow: ellipsis;
      }
    }
    .sub-title {
      font-size: 15px;
      padding-left: 8px;
    }
  }
}
</style>
