<template>
  <div>
    <el-card v-if="showCard" class="table-card">
      <div v-if="needSlide" class="need-slide">请向左滑动查看更多内容</div>
      <transition name="emerge" appear>
        <keep-alive>
          <el-table
            :data="keyList"
            border
            stripe
            :row-key="getRowKey"
            class="out-table"
          >
            <el-table-column
              v-for="(item, index) in col"
              :key="index"
              :prop="dropCol[index].prop"
              :label="item.label"
              header-align="center"
              align="center"
              min-width="100"
            >
              <template #default="scope">
                <span
                  v-if="dropCol[index].prop === 'product_name'"
                  v-html="showDate(scope.row[dropCol[index].prop])"
                >
                </span>
                <el-button
                  v-else-if="dropCol[index].prop === 'element_example'"
                  type="primary"
                  @click="
                    showDetail(
                      scope.row.hscode,
                      scope.row.product_name,
                      scope.row.element_example
                    )
                  "
                  size="mini"
                  >详情
                </el-button>
                <div v-else>{{ scope.row[dropCol[index].prop] }}</div>
              </template>
            </el-table-column>
          </el-table>
        </keep-alive>
      </transition>
      <nav class="page" v-if="pcPage">
        <transition name="emerge" appear>
          <keep-alive>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[5, 7, 10]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
              background
            >
            </el-pagination>
          </keep-alive>
        </transition>
      </nav>

      <nav class="page" v-if="phonePage">
        <transition name="emerge" appear>
          <keep-alive>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[5, 7, 10]"
              :page-size="pageSize"
              :total="total"
              layout="total, sizes, prev, pager, next"
              background
            >
            </el-pagination>
          </keep-alive>
        </transition>
      </nav>
      <nav class="page" v-if="smallPhonePage">
        <transition name="emerge" appear>
          <keep-alive>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[5, 7, 10]"
              :page-size="pageSize"
              :total="total"
              layout="sizes, prev, pager, next"
              background
            >
            </el-pagination>
          </keep-alive>
        </transition>
      </nav>
      <nav class="page" v-if="miniPhonePage">
        <transition name="emerge" appear>
          <keep-alive>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-size="pageSize"
              :total="total"
              layout="prev, pager, next"
              background
            >
            </el-pagination>
          </keep-alive>
        </transition>
      </nav>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {
  ElCard,
  ElTable,
  ElTableColumn,
  ElPagination,
  ElMessage,
} from 'element-plus/dist/index.full'

export default defineComponent({
  components: {
    ElCard,
    ElTable,
    ElTableColumn,
    ElPagination,
    ElMessage,
  },
  setup() {
    const { $http } = useNuxtApp()
    const state = reactive({
      showCard: false,
      key: '',
      urlKey: '',
      currentPage: 1,
      keyList: [],
      pageSize: 10,
      total: 0,
    })
    const getListByKey = async (key) => {
      const decodeKey = decodeURIComponent(key)
      key = decodeKey
      state.urlKey = decodeKey
      const { data: res } = await $http.post(`search?keyword=${key}`)
      if (res.code !== 200) {
        return ElMessage.error({ message: `${res.data}`, center: true })
      }
      state.showCard = true
      if (state.currentPage === 1) {
        state.keyList = res.data.list.slice(0, state.pageSize)
      } else {
        state.keyList = res.data.list.slice(
          (state.currentPage - 1) * state.pageSize,
          state.currentPage * state.pageSize
        )
      }
      state.total = res.data.length
    }

    return {
      ...toRefs(state),
      getListByKey,
    }
  },
})
</script>

<style lang="scss" scoped>
.el-card__body {
  padding: 10px 20px 20px 20px !important;
}

.table-card {
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.15) !important;
  width: 80%;
  margin: auto;
  padding: 10 20px 20px 20px !important;
  background-color: rgba(255, 255, 255, 0.01);
  border: rgba(255, 255, 255, 0.01);
  .need-slide {
    font-size: 14px;
    color: gray;
    text-align: center;
    margin-bottom: 5px;
  }
  .out-table {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
  .page {
    text-align: center;
    .el-pagination {
      background-color: #fff;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
      padding: 10px 0 10px 0;
    }
  }

  .el-table__header th::before {
    font-family: 'iconfont';
    display: inline-block;
    font-size: 18px;
    position: relative;
    top: 4px;
  }

  .el-table__header th:nth-child(1)::before {
    content: '\e656';
  }

  .el-table__header th:nth-child(2)::before {
    content: '\e617';
  }

  .el-table__header th:nth-child(3)::before {
    content: '\e60e';
  }

  .el-table__header th:nth-child(4)::before {
    content: '\e631';
  }

  .el-table__header th:nth-child(5)::before {
    content: '\e679';
  }

  .el-table__header th:nth-child(6)::before {
    content: '\e721';
  }

  .el-table__header th:nth-child(7)::before {
    content: '\e618';
  }

  .el-table__header th:nth-child(8)::before {
    content: '\e69a';
  }

  .el-table__header .cell {
    width: auto !important;
    padding: 0 3px !important;
  }
}

@media screen and (max-width: 550px) {
  .table-card {
    width: 100%;
  }

  .table-card .el-card__body {
    padding: 5px 10px 20px 10px !important;
  }
}
</style>
