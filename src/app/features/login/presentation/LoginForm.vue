<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')
const password = ref('')
</script>

<template>
  <form>
    <PrimeFloatLabel>
      <PrimeInputText class="w-full" id="email" v-model="email" />
      <label for="email">{{ $t('labels.email') }}</label>
    </PrimeFloatLabel>

    <PrimeFloatLabel class="mt-3">
      <PrimePassword class="w-full" inputClass="w-full" v-model="password" inputId="password" />
      <label for="password">{{ $t("labels.password") }}</label>
    </PrimeFloatLabel>

    <PrimeButton class="w-full mt-4" :label="$t('actions.login')" />
  </form>
</template>
