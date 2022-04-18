<template>
  <Card class="w-5/6 mt-10">
    <div v-if="needSlide">请向左滑动查看更多内容</div>
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
import { defineComponent, computed, inject, unref, toRaw } from 'vue'
import {
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
    }

    const { data: response } = await useAsyncData(state.key as string, () =>
      $fetch(`https://hscode.vip/api/search?keyword=${state.key}`, {
        method: 'post',
      })
    )
    let res = toRaw(unref(response))
    resolveResponse(res)

    $emitter.on('search-change', (data) => {
      searchChange(data)
    })

    const searchChange = (data) => {
      state.key = data.key
      state.keyWord = decodeURIComponent(data.key)
      res = data.res
      router.replace({ query: { key: encodeURIComponent(data.key) } })
      resolveResponse(data.res)
    }

    const tableChange = () => {
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
