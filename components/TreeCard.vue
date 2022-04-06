<template>
  <div>
    <el-card v-if="routePath === '/'" class="treeCard">
      <transition name="emerge" appear>
        <keep-alive>
          <div class="tree_card">
            <div class="cate_title">
              <i class="iconfont iconfenleishouye"></i>HSCode商品编码分类
            </div>
            <el-tree-v2 :data="treeData" lazy :props="treeProps">
              <template class="span-ellipsis" #default="{ node, data }">
                <span>
                  <el-button
                    type="text"
                    size="mini"
                    v-show="node.isLeaf == true"
                    @click="() => searchPrefix(data)"
                  >
                    HSCode查询
                  </el-button>
                </span>
                <span class="parentFont">{{ node.label }}</span>
              </template>
            </el-tree-v2>
          </div>
        </keep-alive>
      </transition>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElCard, ElTreeV2, ElButton } from 'element-plus/dist/index.full'
import Header from './Header.vue'

export default defineComponent({
  components: {
    ElCard,
    ElTreeV2,
    ElButton,
  },
  async setup() {
    interface Tree {
      id: string
      label: string
      children?: Tree[]
    }
    const { router, routePath } = Header
    const { $http } = useNuxtApp()
    const treeProps = { value: 'id', label: 'label', children: 'children' }
    const { data: response } = await $http.post('/hscode/getAllHscodeClassify')
    const initData = (res): Tree[] => {
      const arr = Array.from({ length: res.data.class.length })
      res.data.info.forEach((item) => {
        arr.fill(item)
      })
      return arr.map((child) => {
        return {
          id: child.id,
          label: child.main_class,
          children: child.sub_class
        }
      })
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
      treeProps,
      treeData,
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
.treeCard {
  margin: auto;
  margin-top: 30px;
  margin-bottom: 10px;
  width: 65%;
  background-color: rgba(255, 255, 255, 0.01);
  border: rgba(255, 255, 255, 0.01);

  .tree_card {
    border: 1px solid #ebeef5;
    background-color: #fff;
    color: #303133;
    -webkit-transition: 0.3s;
    transition: 0.3s;
    border-radius: 4px;
    overflow: hidden;
    box-shadow: 0 1px 10px rgba(0, 0, 0, 0.15) !important;
    padding: 10px 20px 20px 20px;
    .parentFont {
      font-size: 15px;
    }
  }
}
</style>
