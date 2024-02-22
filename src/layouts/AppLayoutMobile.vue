<script setup lang="ts">
import { ref } from 'vue'
import { useAppStore } from '@/stores/app'
import { RouterView, useRouter } from 'vue-router'

const appStore = useAppStore()
const router = useRouter()

const search = ref('')
</script>

<template>
  <PrimeProgressBar
    v-if="appStore.appLoading"
    mode="indeterminate"
    class="app-progress-bar"
  ></PrimeProgressBar>
  <PrimeToolbar
    class="m-1 my-2 shadow-1"
  >
    <template #start>
      <PrimeIconField iconPosition="left">
        <PrimeInputIcon>
          <i class="pi pi-search" />
        </PrimeInputIcon>
        <PrimeInputText
          class="py-2 border-none shadow-none"
          v-model="search"
          placeholder="Search"
        />
      </PrimeIconField>
    </template>

    <template #end>
      <!-- Mobile nav items -->
      <div class="flex align-items-center gap-2">
        <PrimeAvatar
          v-badge.danger="4"
          class="p-overlay-badge border-1 border-circle bg-white"
          icon="pi pi-bell"
        />
        <!-- <PrimeAvatar
          image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
          style="width: 32px; height: 32px"
        /> -->
      </div>
    </template>
  </PrimeToolbar>
</template>

<style scoped>
.app-main {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
}
.app-progress-bar {
  height: 6px;
  width: 100%;
  border-radius: 0;
}
.aside {
  flex: 1;
  width: 100%;
}
</style>
