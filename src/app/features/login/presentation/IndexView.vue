<script setup lang="ts">
import LoginForm from '@/app/features/login/presentation/LoginForm.vue';
</script>
<template>
  <div class="flex h-full align-items-center justify-content-center mx-4 md:mx-none">
    <PrimeCard class="w-26rem">
      <template #title><span class="font-semibold">{{ $t('app.features.login.login') }}</span></template>
      <template #content>
        <LoginForm class="mt-4"/>
      </template>
    </PrimeCard>
  </div>
</template>

<style></style>
