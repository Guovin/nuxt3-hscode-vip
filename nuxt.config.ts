import { defineNuxtConfig } from 'nuxt3'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  meta: {
    title: 'HSCode编码查询-首页',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'keywords',
        name: 'keywords',
        content: '外贸、跨境、海关编码、查询、hscode查询、hscode编码、搜索',
      },
      {
        hid: 'description',
        name: 'description',
        content: '最全面、方便、准确的外贸、跨境、海关编码查询、hscode查询',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/assets/img/hscode.png' },
      {
        rel: 'stylesheet',
        href: 'https://cdn.staticfile.org/element-plus/2.1.7/theme-chalk/index.min.css',
      },
      {
        rel: 'stylesheet',
        href: 'https://cdn.staticfile.org/nprogress/0.2.0/nprogress.min.css',
      },
    ],
    script: [
      { src: 'https://cdn.staticfile.org/vue/3.2.31/vue.global.prod.min.js' },
      {
        src: 'https://cdn.staticfile.org/element-plus/2.1.7/index.full.min.js',
      },
      { src: 'https://cdn.staticfile.org/axios/0.26.1/axios.min.js' },
      { src: 'https://cdn.staticfile.org/nprogress/0.2.0/nprogress.min.js' },
      {
        src: 'https://cdn.staticfile.org/jsbarcode/3.11.5/JsBarcode.all.min.js',
      },
      { src: 'https://cdn.staticfile.org/Sortable/1.15.0/Sortable.min.js' },
    ],
  },

  css: ['@/assets/css/global.css', '@/assets/font/iconfont.css'],

  components: true,

  vueuse: {
    ssrHandlers: true,
  },

  plugins: [
    { src: '@/plugins/axios', ssr: true }
  ],

  vite: {
    plugins: [
      Components({
        dts: true,
        resolvers: [IconsResolver({})],
      }),
    ],
  },
})
