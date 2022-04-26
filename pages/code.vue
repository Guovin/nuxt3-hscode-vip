<template>
  <div>
    <NuxtLayout name="code">
      <Barcode />
    </NuxtLayout>
  </div>
</template>

<script lang="ts" setup>
const pageTitle = useState('pageTitle')
pageTitle.value = 'code'
</script>