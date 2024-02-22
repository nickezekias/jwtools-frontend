import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  const appLoading = ref(false)
  function setAppLoading(value: boolean) {
    appLoading.value = value
  }

  return { appLoading, setAppLoading }
})
