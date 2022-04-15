<template>
  <div>
    <Header :show-search="show" />
    <Search />
    <Detail />
    <Footer />
  </div>
</template>

<script lang="ts" setup>
import { scrollHandler } from '~/utils/scroll'

const { show } = scrollHandler()
</script>
