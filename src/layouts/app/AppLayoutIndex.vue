<script setup lang="ts">
import AppLayoutDesktop from './desktop/AppLayout.vue';
import AppLayoutMobile from './AppLayoutMobile.vue';
import { computed } from 'vue'

const isMobile = computed(() => {
  return screen.width <= 760
})
</script>

<template>
  <div>
    <PrimeToast />
    <AppLayoutMobile v-if="isMobile" />
    <AppLayoutDesktop v-else/>
  </div>
</template>./desktop/AppLayout.vue