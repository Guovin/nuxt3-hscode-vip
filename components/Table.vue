<template>
  <div>
    <el-card v-if="showCard" class="w-5/6 mx-auto mt-10 dark:bg-black-dark">
      <div v-if="needSlide">请向左滑动查看更多内容</div>
      <transition name="emerge" appear>
        <keep-alive>
          <el-table :data="keyList" border stripe :row-key="getRowKey">
            <el-table-column
              v-for="(item, index) in col"
              :key="index"
              :prop="dropCol[index].prop"
              :label="locale.name === 'zh-cn' ? item.label : item.enLabel"
              header-align="center"
              align="center"
              min-width="100"
            >
              <template #default="scope">
                <span
                  v-if="dropCol[index].prop === 'product_name'"
                  v-html="showData(scope.row[dropCol[index].prop])"
                >
                </span>
                <el-button
                  v-else-if="dropCol[index].prop === 'element_example'"
                  @click="
                    showDetail(
                      scope.row.hscode,
                      scope.row.product_name,
                      scope.row.element_example
                    )
                  "
                  type="primary"
                  plain
                  size="default"
                  >详情
                </el-button>
                <div v-else>{{ scope.row[dropCol[index].prop] }}</div>
              </template>
            </el-table-column>
          </el-table>
        </keep-alive>
      </transition>
      <nav class="mt-4 flex justify-end">
        <transition name="emerge" appear>
          <keep-alive>
            <el-config-provider :locale="locale">
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
            </el-config-provider>
          </keep-alive>
        </transition>
      </nav>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed, inject } from 'vue'
import {
  ElCard,
  ElTable,
  ElTableColumn,
  ElPagination,
  ElMessage,
  ElButton,
  ElConfigProvider,
} from 'element-plus/dist/index.full'

import { col, dropCol } from '~~/hotCode'

export default defineComponent({
  components: {
    ElCard,
    ElTable,
    ElTableColumn,
    ElPagination,
    ElMessage,
    ElButton,
    ElConfigProvider,
  },
  setup() {
    const lang = inject('lang')
    const { $http } = useNuxtApp()
    const router = useRouter()
    const key = router.currentRoute.value.query.key
    onMounted(() => {
      getListByKey(key)
    })
    const state = reactive({
      locale: lang,
      showCard: false,
      needSlide: false,
      key: decodeURIComponent(key as string),
      urlKey: '',
      col: col,
      dropCol: dropCol,
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

    const showDetail = (hscode, title, example) => {
      router.push({
        path: 'content',
        query: {
          hscode: hscode,
          title: title,
          example: example,
        },
      })
    }

    const showData = computed(() => {
      return function (val) {
        val = val + ''
        const keys = state.key.split('')
        keys.forEach((item) => {
          if (val.indexOf(item) !== -1 && item !== '') {
            return (val = val.replace(
              eval(`/${item}/g`),
              '<font color="#409EFF">' + item + '</font>'
            ))
          } else {
            return (val = val)
          }
        })
        return val
      }
    })

    const handleSizeChange = (newPageSize) => {
      state.pageSize = newPageSize
      //需要转码后再执行搜索
      getListByKey(encodeURIComponent(state.urlKey))
    }
    // 分页当前页切换触发事件
    const handleCurrentChange = (newPage) => {
      state.currentPage = newPage
      getListByKey(encodeURIComponent(state.urlKey))
    }

    const getRowKey = (row) => {
      return row.hscode
    }

    // const rowDrop = () => {
    //   const tbody = document.querySelector('.el-table__body-wrapper tbody')
    //   Sortable.create(tbody, {
    //     onEnd({ newIndex, oldIndex }) {
    //       const currRow = keyList.splice(oldIndex, 1)[0]
    //       keyList.splice(newIndex, 0, currRow)
    //     }
    //   })
    // }

    // const columnDrop = () => {
    //   const wrapperTr = document.querySelector('.el-table__header-wrapper tr')
    //   sortable = Sortable.create(wrapperTr, {
    //     animation: 180,
    //     delay: 0,
    //     onEnd: evt => {
    //       const oldItem = dropCol[evt.oldIndex]
    //       dropCol.splice(evt.oldIndex, 1)
    //       dropCol.splice(evt.newIndex, 0, oldItem)
    //     }
    //   })
    // }

    return {
      ...toRefs(state),
      getListByKey,
      showDetail,
      showData,
      handleSizeChange,
      handleCurrentChange,
      getRowKey,
    }
  },
})
</script>
