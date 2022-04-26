<template>
  <div>
    <NuxtLayout name="default">
      <Detail />
    </NuxtLayout>
  </div>
</template>

<script lang="ts" setup>
const pageTitle = useState('pageTitle')
pageTitle.value = 'content'
</script>