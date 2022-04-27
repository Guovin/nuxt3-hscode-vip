import { defineStore } from 'pinia'

export const useFeedBackStore = defineStore('feedBack', {
  state: () => {
    const feedBackCookie = useCookie('feedBack')
    if (!feedBackCookie.value) {
      feedBackCookie.value = JSON.parse(JSON.stringify([]))
    }
    return { log: JSON.parse(JSON.stringify(feedBackCookie.value)) }
  },
  actions: {
    changeFeedBack(log) {
      this.log.push(log)
      const feedBackCookie = useCookie('feedBack')
      feedBackCookie.value = JSON.stringify(this.log)
    },
  },
})
