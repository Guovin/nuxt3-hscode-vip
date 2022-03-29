import Vue from 'vue'
import axios from 'axios'
import NProgress from 'nprogress'

// 绑定axios默认访问地址
axios.defaults.baseURL = 'https://hscode.vip/api/'

// 设置全局axios配置属性
const app = Vue.createApp({})
app.provide('axios', axios)

// 发起request请求时展示进度条 Nprogress.start()
// 当是客户端时才配置
if (process.client) {
  axios.interceptors.request.use((config) => {
    NProgress.start()
    return config // 在最后必须return config
  })
  // 接收到response时隐藏进度条 Nprogress.done()
  axios.interceptors.response.use((config) => {
    NProgress.done()
    return config
  })
}
