<script setup lang="">
import { ref } from 'vue'

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const tel = ref('')
const password = ref('')
</script>

<template>
  <form>
    <PrimeFloatLabel>
      <PrimeInputText class="w-full" id="last-name" v-model="lastName" />
      <label for="last-name">{{ $t('labels.lastName') }}</label>
    </PrimeFloatLabel>

    <PrimeFloatLabel>
      <PrimeInputText class="w-full mt-3" id="first-name" v-model="firstName" />
      <label for="first-name">{{ $t('labels.firstName') }}</label>
    </PrimeFloatLabel>

    <PrimeFloatLabel>
      <PrimeInputText class="w-full mt-3" id="email" v-model="email" />
      <label for="email">{{ $t('labels.email') }}</label>
    </PrimeFloatLabel>

    <PrimeFloatLabel>
      <PrimeInputText class="w-full mt-3" id="tel" v-model="tel" />
      <label for="tel">{{ $t('labels.tel') }}</label>
    </PrimeFloatLabel>

    <PrimeFloatLabel class="mt-3">
      <PrimePassword class="w-full" inputClass="w-full" v-model="password" inputId="password" />
      <label for="password">{{ $t("labels.password") }}</label>
    </PrimeFloatLabel>

    <PrimeButton class="w-full mt-4" :label="$t('actions.login')" />
  </form>
</template>