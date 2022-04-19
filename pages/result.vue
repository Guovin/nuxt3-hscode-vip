<template>
  <div>
    <Header :show-search="show" />
    <div class="pt-20">
      <Card class="w-2/4">
        <Search />
      </Card>
    </div>
    <keep-alive>
      <Table />
    </keep-alive>
    <Footer />
  </div>
</template>

<script lang="ts" setup>
import { scrollHandler } from '~/utils/scroll'

const { show } = scrollHandler()
</script>
