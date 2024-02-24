<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { useProductStore } from '@/stores/product'
import { useI18n } from 'vue-i18n'
import { FilterMatchMode } from 'primevue/api';
import { useToast } from 'primevue/usetoast'

import { getApiErrors } from '@/app/utils/helper'
import { AxiosError } from 'axios'
import { useRouter } from 'vue-router';

const productStore = useProductStore()
const { t } = useI18n()
const toast = useToast()
const router = useRouter()

let objects = ref()

const home = ref({
  icon: 'pi pi-home'
})

const breadcrumbItems = ref([{ label: t('labels.product', 2) }])

const columns = [
  { field: 'name', header: 'Nom' },
  { field: 'sku', header: 'SKU' },
  { field: 'barcode', header: 'Barcode' },
  { field: 'container', header: 'Conteneur' },
  { field: 'quantity', header: 'Quantity' }
]

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.CONTAINS },
    sku: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    barcode: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    categories: { value: null, matchMode: FilterMatchMode.IN },
});

onMounted(async () => {
  try {
    objects.value = await productStore.getAll({ itemsPerPage: -1, sortBy: ['products.name'] })
  } catch (error) {
    console.log(getApiErrors(error as AxiosError))
    toast.add({
      severity: 'error',
      summary: t('labels.error'),
      detail: error,
      life: 3000
    })
  }
})
</script>

<template>
  <div class="pb-6 md:pb-3">
    <nav>
      <div class="card flex justify-content-center">
        <PrimeBreadcrumb :home="home" :model="breadcrumbItems" class="w-full bg-transparent" />
      </div>
      <PrimeToolbar class="bg-transparent mt-1 border-none">
        <template #start>
          <span class="font-medium text-xl md:text-4xl">{{ $t('labels.productList') }}</span>
        </template>
        <template #end>
          <PrimeButton @click="router.push({ name: 'products.create' })" :label="$t('labels.newProduct')"></PrimeButton>
        </template>
      </PrimeToolbar>
    </nav>
    <div class="mt-4">
      <div class="card shadow-1">
        <PrimeDataTable
          v-model:filters="filters"
          :value="objects"
          stripedRows
          sortMode="multiple"
          filterDisplay="row"
          :globalFilterFields="['name', 'sku', 'barcode', 'categories', 'container']"
          paginator
          removableSort
          :rows="10"
          :rowsPerPageOptions="[5, 10, 20, 50]"
          tableStyle="min-width: 50rem"
        >
          <template #header>
            <div class="flex justify-content-end">
              <PrimeIconField iconPosition="left">
                <PrimeInputIcon>
                  <i class="pi pi-search" />
                </PrimeInputIcon>
                <PrimeInputText v-model="filters['global'].value" placeholder="Rechercher" class="py-3" />
              </PrimeIconField>
            </div>
          </template>
          <template #empty> Aucun matériel trouvé </template>
          <template #loading> Chargement en cours... </template>
          <PrimeColumn
            v-for="col of columns"
            :key="col.field"
            :field="col.field"
            :header="col.header"
            sortable
          ></PrimeColumn>
        </PrimeDataTable>
      </div>
    </div>
  </div>
</template>
