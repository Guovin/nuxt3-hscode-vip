<template>
  <div>
    <NuxtLayout name="default">
      <keep-alive>
        <TreeCard />
      </keep-alive>
      <HotCode />
    </NuxtLayout>
  </div>
</template>

<script lang="ts" setup>
const pageTitle = useState('pageTitle')
pageTitle.value = 'index'
</script>
