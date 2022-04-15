export function scrollHandler() {
  let show = ref(false)
  let scrollTop = 0
  const scrollListener = () => {
    scrollTop = document.documentElement.scrollTop
    if (scrollTop >= 100) {
      show.value = true
    } else {
      show.value = false
    }
  }
  onMounted(() => {
    window.addEventListener('scroll', scrollListener)
  })
  onUnmounted(() => {
    window.removeEventListener('scroll', scrollListener)
  })
  return {
    show,
  }
}
