<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n';

const { t } = useI18n()

const home = ref({
  icon: 'pi pi-home'
})

const items = ref([
  { label: t("labels.product", 2) }
])
</script>

<template>
  <nav>
    <div class="card flex justify-content-center">
      <PrimeBreadcrumb :home="home" :model="items" class="w-full bg-transparent" />
    </div>
    <PrimeToolbar class="bg-transparent mt-1 border-none">
      <template #start>
        <span class="font-medium text-4xl">{{ $t("labels.newProduct")  }}</span>
      </template>

      <template #end>
        <PrimeButton :label="$t('labels.newProduct')"></PrimeButton>
      </template>
    </PrimeToolbar>
  </nav>
</template>
