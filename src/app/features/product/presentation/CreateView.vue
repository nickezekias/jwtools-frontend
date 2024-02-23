<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import CreateForm from './CreateForm.vue'

const { t } = useI18n()

const home = ref({
  icon: 'pi pi-home'
})

const items = ref([{ label: t('labels.product', 2) }, { label: t('labels.newProduct') }])
</script>

<template>
  <div class="pb-6 md:pb-3">
    <nav>
      <div class="card flex justify-content-center">
        <PrimeBreadcrumb :home="home" :model="items" class="w-full bg-transparent" />
      </div>
      <PrimeToolbar class="hidden md:flex bg-transparent mt-1 border-none">
        <template #start>
          <span class="font-medium text-xl md:text-4xl">{{ $t('labels.newProduct') }}</span>
        </template>

        <template #end>
          <PrimeButton :label="$t('actions.save')"></PrimeButton>
        </template>
      </PrimeToolbar>
    </nav>
    <div class="mt-4">
      <CreateForm />
    </div>
    <PrimeToolbar
      class="flex md:hidden py-1 bg-primary text-white w-full shadow-4 mt-1 border-none border-noround fixed bottom-0 left-0"
    >
      <template #start>
        <span class="font-medium text-xl md:text-4xl">{{ $t('labels.newProduct') }}</span>
      </template>
      <template #end>
        <PrimeButton class="bg-white text-primary" :label="$t('actions.save')"></PrimeButton>
      </template>
    </PrimeToolbar>
  </div>
</template>
