<script setup lang="ts">
import LoginForm from '@/app/features/login/presentation/LoginForm.vue';
</script>
<template>
  <div class="h-full">
    <div class="flex mt-8 mb-5">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-1 mx-auto" viewBox="0 0 24 24">
        <g fill="none" stroke="#10b981" stroke-width="1.5">
          <path
            d="M2 16c0-2.828 0-4.243.879-5.121C3.757 10 5.172 10 8 10h8c2.828 0 4.243 0 5.121.879C22 11.757 22 13.172 22 16c0 2.828 0 4.243-.879 5.121C20.243 22 18.828 22 16 22H8c-2.828 0-4.243 0-5.121-.879C2 20.243 2 18.828 2 16Z"
          />
          <path stroke-linecap="round" d="M6 10V8a6 6 0 0 1 11.811-1.5M12 14v4" opacity="0.5" />
        </g>
      </svg>
    </div>
    <div class="flex align-items-center justify-content-center mx-4 md:mx-none">
      <PrimeCard class="w-26rem">
        <template #title><span class="font-semibold">{{ $t('app.features.login.login') }}</span></template>
        <template #content>
          <LoginForm class="mt-4"/>
        </template>
      </PrimeCard>
    </div>
  </div>
</template>

<style></style>
