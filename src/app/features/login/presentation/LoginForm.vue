<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const email = ref('admin@example.com')
const password = ref('password')
</script>

<template>
  <form>
    <PrimeFloatLabel>
      <PrimeInputText class="w-full" id="email" v-model="email" />
      <label for="email">{{ $t('labels.email') }}</label>
    </PrimeFloatLabel>

    <PrimeFloatLabel class="mt-6">
      <PrimePassword class="w-full" inputClass="w-full" v-model="password" inputId="password" />
      <label for="password">{{ $t('labels.password') }}</label>
    </PrimeFloatLabel>

    <PrimeButton @click="router.push({ name: 'products.index' })" class="w-full mt-4" :label="$t('actions.login')" />
  </form>
</template>
