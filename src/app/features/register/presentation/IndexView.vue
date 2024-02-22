<script setup lang="ts">
import RegisterForm from '@/app/features/register/presentation/RegisterForm.vue'
</script>

<template>
  <div class="flex h-full align-items-center justify-content-center mx-4 md:mx-none">
    <PrimeCard class="w-26rem">
      <template #title><span class="font-semibold">{{ $t('app.features.register.register') }}</span></template>
      <template #content>
        <RegisterForm class="mt-4"/>
      </template>
    </PrimeCard>
  </div>
</template>