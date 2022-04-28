<template>
  <Card class="w-11/12 lg:w-5/6 mt-10" v-loading="loading">
    <div v-if="needSlide">请向左滑动查看更多内容</div>
    <el-table :data="keyList" border :row-key="getRowKey">
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
            >{{ $t('label.detailBtn') }}
          </el-button>
          <div v-else>{{ scope.row[dropCol[index].prop] }}</div>
        </template>
      </el-table-column>
    </el-table>
    <nav class="mt-4 flex justify-end">
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
    </nav>
  </Card>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  inject,
  unref,
  toRaw,
  watch,
  nextTick,
} from 'vue'
import {
  ElTable,
  ElTableColumn,
  ElPagination,
  ElMessage,
  ElButton,
  ElConfigProvider,
} from 'element-plus/dist/index.full'
import { Sortable } from 'sortablejs'
import { col, dropCol } from '~~/defaultState'

export default defineComponent({
  components: {
    ElTable,
    ElTableColumn,
    ElPagination,
    ElMessage,
    ElButton,
    ElConfigProvider,
  },
  async setup() {
    const { $emitter } = useNuxtApp()
    const lang = inject('lang')
    const router = useRouter()
    const queryKey = router.currentRoute.value.query.key
    const state = reactive({
      res: null,
      locale: lang,
      needSlide: false,
      key: queryKey,
      keyWord: decodeURIComponent(queryKey as string),
      col: col,
      dropCol: dropCol,
      currentPage: 1,
      keyList: [],
      pageSize: 10,
      total: 0,
      loading: true,
    })

    const resolveResponse = (res) => {
      if (res.code !== 200) {
        return ElMessage.error({ message: `${res.data}`, center: true })
      }
      if (state.currentPage === 1) {
        state.keyList = res.data.list.slice(0, state.pageSize)
      } else {
        state.keyList = res.data.list.slice(
          (state.currentPage - 1) * state.pageSize,
          state.currentPage * state.pageSize
        )
      }
      state.total = res.data.length
      state.loading = false
      nextTick(() => {
        if (process.client) {
          columnDrop()
          if (!('ontouchstart' in document.documentElement)) {
            rowDrop()
          }
        }
      })
    }

    const { data } = await useLazyAsyncData(state.key as string, () =>
      $fetch(`https://hscode.vip/api/search?keyword=${state.key}`, {
        method: 'post',
      })
    )

    watch(
      data,
      (newData) => {
        state.res = toRaw(unref(newData))
        if (state.res) {
          resolveResponse(state.res)
        }
      },
      { immediate: true }
    )

    $emitter.on('loading', (flag: boolean) => {
      state.loading = flag
    })

    $emitter.on('search-change', (data) => {
      searchChange(data)
    })

    const searchChange = (data) => {
      state.key = data.key
      state.keyWord = decodeURIComponent(data.key)
      router.replace({ query: { key: encodeURIComponent(data.key) } })
      resolveResponse(data.res)
    }

    const tableChange = () => {
      if (state.currentPage === 1) {
        state.keyList = state.res.data.list.slice(0, state.pageSize)
      } else {
        state.keyList = state.res.data.list.slice(
          (state.currentPage - 1) * state.pageSize,
          state.currentPage * state.pageSize
        )
      }
      state.total = state.res.data.length
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
        const keys = state.keyWord.split('')
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
      tableChange()
    }
    const handleCurrentChange = (newPage) => {
      state.currentPage = newPage
      tableChange()
    }

    const getRowKey = (row) => {
      return row.hscode
    }

    const rowDrop = () => {
      const tbody = document.querySelector('.el-table__body-wrapper tbody')
      Sortable.create(tbody, {
        onEnd({ newIndex, oldIndex }) {
          const currRow = state.keyList.splice(oldIndex, 1)[0]
          state.keyList.splice(newIndex, 0, currRow)
        },
      })
    }

    const columnDrop = () => {
      const wrapperTr = document.querySelector('.el-table__header-wrapper tr')
      Sortable.create(wrapperTr, {
        animation: 180,
        delay: 0,
        onEnd: (evt) => {
          const oldItem = state.dropCol[evt.oldIndex]
          state.dropCol.splice(evt.oldIndex, 1)
          state.dropCol.splice(evt.newIndex, 0, oldItem)
        },
      })
    }

    return {
      ...toRefs(state),
      showDetail,
      showData,
      handleSizeChange,
      handleCurrentChange,
      getRowKey,
      searchChange,
    }
  },
})
</script>

<style lang="scss" scoped>
:deep(.el-table__header th) {
  &::before {
    font-family: 'iconfont';
    display: inline-block;
    font-size: 18px;
    position: relative;
    top: 3px;
  }
  &:nth-child(1)::before {
    content: '\e656';
  }
  &:nth-child(2)::before {
    content: '\e617';
  }
  &:nth-child(3)::before {
    content: '\e60e';
  }
  &:nth-child(4)::before {
    content: '\e631';
  }
  &:nth-child(5)::before {
    content: '\e679';
  }
  &:nth-child(6)::before {
    content: '\e721';
  }
  &:nth-child(7)::before {
    content: '\e618';
  }
  &:nth-child(8)::before {
    content: '\e69a';
  }
}
:deep(.el-table__header .cell) {
  width: auto !important;
  padding: 0 3px !important;
}
</style>
