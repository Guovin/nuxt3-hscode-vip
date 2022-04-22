import { defineNuxtConfig } from 'nuxt'
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
        href: 'https://cdn.staticfile.org/element-plus/2.1.8/theme-chalk/index.min.css',
      },
      {
        rel: 'stylesheet',
        href: 'https://cdn.staticfile.org/tailwindcss/2.2.19/tailwind.min.css',
      },
    ],
    script: [
      { src: 'https://cdn.staticfile.org/vue/3.2.31/vue.global.prod.min.js' },
      {
        src: 'https://cdn.staticfile.org/element-plus/2.1.8/index.full.min.js',
      },
      {
        src: 'https://cdn.staticfile.org/jsbarcode/3.11.5/JsBarcode.all.min.js',
      },
      { src: 'https://cdn.staticfile.org/Sortable/1.15.0/Sortable.min.js' },
      {
        src: 'https://cdn.staticfile.org/vue-i18n/9.2.0-beta.33/vue-i18n.global.prod.min.js',
      },
      { src: 'https://cdn.staticfile.org/pinia/2.0.12/pinia.iife.prod.min.js' },
    ],
  },

  css: [
    '@/assets/css/global.scss',
    '@/assets/font/iconfont.css',
    '~/assets/css/tailwind.css',
  ],

  components: true,

  vueuse: {
    ssrHandlers: true,
  },

  ssr: false,

  buildModules: ['@pinia/nuxt', '@nuxtjs/tailwindcss'],

  vite: {
    plugins: [
      Components({
        dts: true,
        resolvers: [IconsResolver({})],
      }),
    ],
  },
})
