<template>
  <div>
    <DetailCard
      :app="true"
      iconfont-name="iconfont iconjibenxinxi"
      title="label.baseInfo"
      :data="baseInfo"
    />
    <DetailCard
      :app="false"
      iconfont-name="iconfont iconjiliang-xian"
      title="label.unit"
      :data="unitInfo"
    />
    <DetailCard
      :app="false"
      iconfont-name="iconfont iconexchangerate"
      title="label.ordinary"
      :data="ordinaryInfo"
    />
    <DetailCard
      :app="false"
      iconfont-name="iconfont iconjiandu"
      title="label.regulatory"
      :data="regulatoryInfo"
    />
    <DetailCard
      :app="false"
      iconfont-name="iconfont iconjianyanjianyi"
      title="label.ciq"
      :data="ciqInfo"
    />
    <DetailCard
      :app="false"
      iconfont-name="iconfont iconxinshenqing"
      title="label.element"
      :data="elementInfo"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRaw, unref } from 'vue'
import { ElRow, ElCol, ElCard, ElMessage } from 'element-plus/dist/index.full'

export default defineComponent({
  components: {
    ElRow,
    ElCol,
    ElCard,
    ElMessage,
  },
  async setup() {
    const state = reactive({
      query: null,
      data: null,
      title: '',
      elementList: [],
      codeName: [],
      codeDetail: [],
      ciqName: [],
      ciqDetail: [],
      example: '',
      baseInfo: [],
      unitInfo: [],
      ordinaryInfo: [],
      regulatoryInfo: [],
      ciqInfo: [],
      elementInfo: [],
    })

    const router = useRouter()
    const query = router.currentRoute.value.query
    state.query = query
    state.title = query.title as string
    state.example = query.example as string

    const resolveData = (data) => {
      const info = data.info
      const codeList = info.regulatory_code_name
      const ciqList = info.ciq_code_name
      if (codeList && codeList.length > 0) {
        codeList.forEach((item) => {
          let name = item.split(':')
          state.codeName.push(name[0])
          state.codeDetail.push(name[1])
        })
      }

      if (ciqList && ciqList.length > 0) {
        ciqList.forEach((item) => {
          let name = item.split(':')
          state.ciqName.push(name[0])
          state.ciqDetail.push(name[1])
        })
      }

      const element = info.element_require
      if (element && element.length > 0) {
        const list = element.split(';')
        const newList = []
        list.forEach((item) => {
          if (item !== '') {
            let Index = item.indexOf(':')
            newList.push(item.slice(Index + 1))
          }
        })
        state.elementList = newList
      }

      info.ordinary = (info.ordinary * 100).toFixed(0) + '%'
      info.most_discount = (info.most_discount * 100).toFixed(0) + '%'
      info.export_rate = (info.export_rate * 100).toFixed(0) + '%'
      info.add_tax_rate = (info.add_tax_rate * 100).toFixed(0) + '%'
      info.customs_rate = (info.customs_rate * 100).toFixed(0) + '%'

      state.data = info
      state.baseInfo = [
        { title: 'content.name', content: state.title },
        { title: 'content.hscode', content: info.hscode },
        { title: 'content.category', content: info.hscode_name },
      ]
      state.unitInfo = [
        { title: 'content.lawUnitName', content: info.unit_1_name },
        { title: 'content.lawUnit', content: info.unit_1 },
        { title: 'content.lawUnitName2', content: info.unit_2_name },
        { title: 'content.lawUnit2', content: info.unit_2 },
      ]
      state.ordinaryInfo = [
        { title: 'content.ordinaryTax', content: info.ordinary },
        { title: 'content.discountTax', content: info.most_discount },
        { title: 'content.exportTax', content: info.export_rate },
        { title: 'content.exportRetax', content: info.export_retax },
        { title: 'content.addTaxRate', content: info.add_tax_rate },
      ]
      state.regulatoryInfo = []
      state.ciqInfo = []
      state.elementInfo = []
    }

    const { data } = await useLazyAsyncData('detail', () =>
      $fetch(`https://hscode.vip/api/hscode?hscode=${state.query.hscode}`, {
        method: 'post',
      })
    )

    watch(
      data,
      (newData) => {
        const rawData = toRaw(unref(newData)).data
        if (rawData) {
          try {
            resolveData(rawData)
          } catch (err) {
            throw new Error(err)
          }
        }
      },
      { immediate: true }
    )

    return {
      ...toRefs(state),
    }
  },
})
</script>
