<script setup lang="ts">
import { onMounted } from 'vue'
import { useAppStore } from '@/stores/app'
import { RouterView, useRouter } from 'vue-router'

const appStore = useAppStore()
const router = useRouter()

onMounted(() => {
  if (router.currentRoute.value.path == '/') {
    router.push({ name: 'login' })
  }
})
</script>

<template>
  <main class="guest-main">
    <PrimeProgressBar
      v-if="appStore.appLoading"
      mode="indeterminate"
      class="app-progress-bar"
    ></PrimeProgressBar>
    <PrimeToolbar class="m-1 mt-3 md:m-4 md:mt-4" style="border-radius: 3rem; padding: 1rem 1rem 1rem 1.5rem">
      <template #start>
        <span class="font-bold">JWTools</span>
      </template>

      <template #end>
        <div class="flex md:hidden align-items-center gap-2">
          <PrimeButton
            @click="
              () => {
                router.push({ name: 'login' })
              }
            "
            to="login"
            size="small"
            :label="$t('actions.login')"
            text
            plain
          />
          <PrimeButton size="small" @click="router.push({ name: 'register' })" :label="$t('actions.register')" text plain />
        </div>
        <div class="hidden md:flex align-items-center gap-2">
          <PrimeButton
            @click="
              () => {
                router.push({ name: 'login' })
              }
            "
            :label="$t('actions.login')"
            text
            plain
          />
          <PrimeButton @click="router.push({ name: 'register' })" :label="$t('actions.register')" text plain />
          <!-- <RouterLink to="/login">{{Hello}}</RouterLink> -->
          <!-- <PrimeButton :label="$t('labels.newProduct')" severity="contrast" size="small" />
          
          <PrimeAvatar
            image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
            style="width: 32px; height: 32px"
          /> -->
        </div>
      </template>
    </PrimeToolbar>
    <div class="content">
      <RouterView />
    </div>
  </main>
</template>

<style scoped>
.app-progress-bar {
  height: 6px;
  width: 100%;
  border-radius: 0;
}
.content {
  flex: 1;
  width: 100%;
}
.guest-main {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
}
</style>
