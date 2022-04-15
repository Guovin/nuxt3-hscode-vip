<template>
  <div>
    <Header :show-search="show" />
    <div class="pt-20">
      <Card class="w-2/4">
        <Search />
      </Card>
    </div>
    <Suspense>
      <template #default>
        <asyncTable />
      </template>
      <template #fallback>
        <div>Loading...</div>
      </template>
    </Suspense>
    <Footer />
  </div>
</template>

<script lang="ts">
import { defineAsyncComponent } from 'vue'
import { scrollHandler } from '~/utils/scroll'

export default {
  components: {
    asyncTable: defineAsyncComponent(() => import('~/components/Table.vue')),
  },
  setup() {
    const { show } = scrollHandler()
    return {
      show,
    }
  },
}
</script>
