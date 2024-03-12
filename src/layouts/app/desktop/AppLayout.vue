<script setup lang="ts">
import { computed, watch, ref } from 'vue';
import { useAppStore } from '@/stores/app'
import { RouterView } from 'vue-router'
import AppSidebar from './AppSidebar.vue';

import { useLayout } from '@/layouts/composables/layout';

const { layoutConfig, layoutState, isSidebarActive } = useLayout();
const appStore = useAppStore()

const outsideClickListener = ref(null);

watch(isSidebarActive, (newVal) => {
    if (newVal) {
        bindOutsideClickListener();
    } else {
        unbindOutsideClickListener();
    }
});

const containerClass = computed(() => {
    return {
        'layout-theme-light': layoutConfig.darkTheme.value === 'light',
        'layout-theme-dark': layoutConfig.darkTheme.value === 'dark',
        'layout-overlay': layoutConfig.menuMode.value === 'overlay',
        'layout-static': layoutConfig.menuMode.value === 'static',
        'layout-static-inactive': layoutState.staticMenuDesktopInactive.value && layoutConfig.menuMode.value === 'static',
        'layout-overlay-active': layoutState.overlayMenuActive.value,
        'layout-mobile-active': layoutState.staticMenuMobileActive.value,
        'p-input-filled': layoutConfig.inputStyle.value === 'filled',
        'p-ripple-disabled': !layoutConfig.ripple.value
    };
});
const bindOutsideClickListener = () => {
    if (!outsideClickListener.value) {
        outsideClickListener.value = (event) => {
            if (isOutsideClicked(event)) {
                layoutState.overlayMenuActive.value = false;
                layoutState.staticMenuMobileActive.value = false;
                layoutState.menuHoverActive.value = false;
            }
        };
        document.addEventListener('click', outsideClickListener.value);
    }
};
const unbindOutsideClickListener = () => {
    if (outsideClickListener.value) {
        document.removeEventListener('click', outsideClickListener);
        outsideClickListener.value = null;
    }
};
const isOutsideClicked = (event) => {
    const sidebarEl = document.querySelector('.layout-sidebar');
    const topbarEl = document.querySelector('.layout-menu-button');

    return !(sidebarEl.isSameNode(event.target) || sidebarEl.contains(event.target) || topbarEl.isSameNode(event.target) || topbarEl.contains(event.target));
};
</script>

<template>
  <div class="layout-wrapper" :class="containerClass">
    <PrimeProgressBar
      v-if="appStore.appLoading"
      mode="indeterminate"
      class="app-progress-bar"
    ></PrimeProgressBar>
    <div>
      <div class="layout-sidebar">
        <AppSidebar class="app-sidebar"/>
      </div>
      <div class="layout-main-container">
        <PrimeToolbar
          class=" app-toolbar shadow-1"
          style="border-radius: 8px; padding: 1rem 1rem 1rem 1.5rem"
        >
          <!-- <template #start>
            <PrimeIconField iconPosition="left">
              <PrimeInputIcon>
                <i class="pi pi-search" />
              </PrimeInputIcon>
              <PrimeInputText class="py-2 border-none shadow-none" v-model="search" placeholder="Search" />
            </PrimeIconField>
          </template> -->

          <template #end>
            <div class="flex align-items-center gap-3">
              <PrimeAvatar v-badge.danger="1" class="p-overlay-badge border-1 border-circle bg-white" icon="pi pi-bell" />
              <PrimeAvatar
                image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
                style="width: 32px; height: 32px"
              />
            </div>
          </template>
        </PrimeToolbar>

        <div class="layout-main">
          <RouterView />
        </div>
      </div>
      <div class="layout-mask"></div>
    </div>
  </div>
  <PrimeToast />
</template>

<style scoped>
.app-progress-bar {
  height: 6px;
  width: 100%;
  border-radius: 0;
}
</style>
