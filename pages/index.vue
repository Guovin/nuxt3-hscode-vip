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
        <keep-alive>
          <asyncTreeCard />
        </keep-alive>
      </template>
      <template #fallback>
        <Card class="my-10 w-3/5 h-60">
          <Loading />
        </Card>
      </template>
    </Suspense>
    <HotCode />
    <Footer />
  </div>
</template>

<script lang="ts">
import { defineAsyncComponent } from 'vue'
import { scrollHandler } from '~/utils/scroll'

export default {
  components: {
    asyncTreeCard: defineAsyncComponent(
      () => import('~/components/TreeCard.vue')
    ),
  },
  setup() {
    const { show } = scrollHandler()
    return {
      show,
    }
  },
}
</script>
