<template>
  <div>
    <NuxtLayout name="default">
      <keep-alive>
        <Table />
      </keep-alive>
    </NuxtLayout>
  </div>
</template>

<script lang="ts" setup>
const pageTitle = useState('pageTitle')
pageTitle.value = 'result'
</script>