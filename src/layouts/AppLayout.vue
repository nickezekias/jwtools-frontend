<script setup lang="ts">
import { ref } from 'vue'
import { useAppStore } from '@/stores/app'
import { RouterView, useRouter } from 'vue-router'

const appStore = useAppStore()
const router = useRouter()

const visible = true
const search = ref('')
</script>

<template>
  <main class="app-main overflow-x-hidden">
    <PrimeProgressBar
      v-if="appStore.appLoading"
      mode="indeterminate"
      class="app-progress-bar"
    ></PrimeProgressBar>
    <div class="aside">
      <PrimeSidebar
        v-model:visible="visible"
        :dismissable="false"
        :modal="false"
        header="JW Tools"
        :baseZIndex="0"
        :autoZIndex="false"
        style="width: 265px; z-index: 0!important;"
        class="text-sm flex relative"
      >
        <template #container>
          <div class="flex flex-column h-full">
            <div class="flex align-items-center justify-content-between px-4 pt-3 flex-shrink-0">
              <span class="inline-flex align-items-center gap-2">
                <span class="font-semibold text-4xl text-primary">JW Tools</span>
              </span>
            </div>
            <div class="overflow-y-auto mt-4">
              <ul class="list-none px-2 m-0">
                <li>
                  <a
                    v-ripple
                    class="flex align-items-center cursor-pointer px-3 py-2 border-round text-700 hover:surface-100 active:text-primary transition-duration-150 transition-colors p-ripple"
                  >
                    <i class="pi pi-home mr-2"></i>
                    <span class="font-medium">{{ $t('layouts.appLayout.dashboard') }}</span>
                  </a>
                </li>
                <li>
                  <div
                    v-ripple
                    v-styleclass="{
                      selector: '@next',
                      enterClass: 'hidden',
                      enterActiveClass: 'slidedown',
                      leaveToClass: 'hidden',
                      leaveActiveClass: 'slideup'
                    }"
                    class="px-3 py-2 flex align-items-center justify-content-between text-600 cursor-pointer p-ripple"
                  >
                    <span>
                      <i class="pi pi-home mr-2"></i>
                      <span class="font-medium">{{ $t('layouts.appLayout.inventory') }}</span>
                    </span>
                    <i class="pi pi-chevron-down"></i>
                  </div>
                  <ul class="list-none p-0 pl-3 m-0 overflow-hidden">
                    <li>
                      <a
                        v-ripple
                        class="flex align-items-center active cursor-pointer px-3 py-2 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
                      >
                        <i class="pi pi-home mr-2"></i>
                        <span class="font-medium">{{ $t('layouts.appLayout.newProduct') }}</span>
                      </a>
                    </li>
                    <li>
                      <a
                        v-ripple
                        class="flex align-items-center cursor-pointer px-3 py-2 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
                      >
                        <i class="pi pi-bookmark mr-2"></i>
                        <span class="font-medium">{{ $t('layouts.appLayout.productsList') }}</span>
                      </a>
                    </li>

                    <hr class="mx-3 border-top-1 border-none surface-border" />

                    <li>
                      <a
                        v-ripple
                        class="flex align-items-center cursor-pointer px-3 py-2 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
                      >
                        <i class="pi pi-home mr-2"></i>
                        <span class="font-medium">{{ $t('layouts.appLayout.newContainer') }}</span>
                      </a>
                    </li>
                    <li>
                      <a
                        v-ripple
                        class="flex align-items-center cursor-pointer px-3 py-2 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
                      >
                        <i class="pi pi-bookmark mr-2"></i>
                        <span class="font-medium">{{
                          $t('layouts.appLayout.containersList')
                        }}</span>
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </template>
      </PrimeSidebar>
      <div class="h-full overflow-x-none flex flex-column" style="margin-left: 266px;">
        <PrimeToolbar
          class="m-1 mt-3 md:m-4 md:mt-4 shadow-1"
          style="border-radius: 8px; padding: 1rem 1rem 1rem 1.5rem"
        >
          <template #start>
            <PrimeIconField iconPosition="left">
              <PrimeInputIcon>
                <i class="pi pi-search" />
              </PrimeInputIcon>
              <PrimeInputText class="py-2 border-none shadow-none" v-model="search" placeholder="Search" />
            </PrimeIconField>
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
              <PrimeButton
                size="small"
                @click="router.push({ name: 'register' })"
                :label="$t('actions.register')"
                text
                plain
              />
            </div>
            <div class="hidden md:flex align-items-center gap-3">
              <PrimeAvatar v-badge.danger="4" class="p-overlay-badge border-1 border-circle bg-white" icon="pi pi-user" />
              <PrimeAvatar
                image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
                style="width: 32px; height: 32px"
              />
            </div>
          </template>
        </PrimeToolbar>

        <div class="content flex-grow-1 mx-4">
          <RouterView />
        </div>
      </div>
    </div>
  </main>
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
