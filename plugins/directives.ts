import { ElLoadingDirective } from 'element-plus/dist/index.full'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('loading', ElLoadingDirective)
})
