import axios from 'axios'
import NProgress from 'nprogress'

axios.defaults.baseURL = 'https://hscode.vip/api/'

if (process.client) {
  axios.interceptors.request.use((config) => {
    NProgress.start()
    return config
  })
  axios.interceptors.response.use((config) => {
    NProgress.done()
    return config
  })
}

export default defineNuxtPlugin(() => {
  return {
    provide: {
      http: axios,
    },
  }
})
