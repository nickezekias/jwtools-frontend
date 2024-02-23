<script setup lang="ts">
import { ref } from 'vue'

const sku = ref('')
const barcode = ref('')
const categories = ref('')
const description = ref('')
</script>

<template>
  <div class="grid">
    <div class="col-12 md:col-4 lg:col-3">
      <div class="h-16rem w-full bg-gray-100"></div>
    </div>
    <div class="col-12 md:col-8 lg:col-9">
      <h1 class="text-primary font-medium text-3xl md:text-6xl mt-4 md:mt-0 mb-4">Product Name</h1>

      <div class="grid gap-2 px-4 py-4">
        <div class="w-16rem">
          <PrimeFloatLabel>
            <PrimeInputText class="w-full" size="large" id="sku" v-model="sku" variant="filled" />
            <label for="sku">{{ $t('labels.sku') }}</label>
          </PrimeFloatLabel>

          <PrimeFloatLabel class="mt-5">
            <PrimeInputText
              class="shadow-none w-full"
              size="large"
              id="barcode"
              v-model="barcode"
              variant="filled"
            />
            <label for="barcode">{{ $t('labels.barcode') }}</label>
          </PrimeFloatLabel>

          <PrimeFloatLabel class="mt-5">
            <PrimeInputText
              class="shadow-none w-full"
              size="large"
              id="categories"
              v-model="categories"
              variant="filled"
            />
            <label for="categories">{{ $t('labels.category', 2) }}</label>
          </PrimeFloatLabel>
        </div>
        <div class="col-12 md:col flex flex-column pt-0 mt-0">
            <h3 class="p-0 m-0">Description</h3>
            <PrimeEditor v-model="description" class="h-auto w-full" />
        </div>
      </div>
    </div>
  </div>
</template>
