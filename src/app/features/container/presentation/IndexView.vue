<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { FilterMatchMode } from 'primevue/api';
import { useToast } from 'primevue/usetoast'
import { useContainerStore } from '@/stores/container'
import { getApiErrors } from '@/app/utils/helper'
import { AxiosError } from 'axios'
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const toast = useToast()
const router = useRouter()
const objectStore = useContainerStore()

let objects = ref()

const home = ref({
  icon: 'pi pi-home'
})

const breadcrumbItems = ref([{ label: t('labels.container', 2) }])

const columns = [
  { field: 'name', header: t('labels.name') },
  { field: 'barcode', header: t('labels.barcode') },
  { field: 'sku', header: t('labels.sku') },
]

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.CONTAINS },
    barcode: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    sku: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
});

onMounted(async () => {
  objectStore.setLoading(true)
  try {
    objects.value = await objectStore.getAll({ itemsPerPage: -1, sortBy: ['containers.name'] })
  } catch (error) {
    console.log(getApiErrors(error as AxiosError))
    toast.add({
      severity: 'error',
      summary: t('labels.error'),
      detail: error,
      life: 3000
    })
  } finally {
    objectStore.setLoading(false)
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
          <span class="font-medium text-xl md:text-4xl">{{ $t('labels.containerList') }}</span>
        </template>
        <template #end>
          <PrimeButton @click="() => {}" :label="$t('labels.newContainer')"></PrimeButton>
        </template>
      </PrimeToolbar>
    </nav>
    <div class="mt-4">
      <div class="card shadow-1">
        <PrimeDataTable
          v-model:filters="filters"
          :value="objects"
          :loading="objectStore.loading"
          stripedRows
          sortMode="multiple"
          filterDisplay="row"
          :globalFilterFields="['name', 'sku', 'barcode']"
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
          <template #empty v-if="!objectStore.loading">{{ $t('app.features.container.index.emptyMessage') }}</template>
          <template #loading>{{ $t('labels.loadingMessage') }}</template>
          <PrimeColumn
            v-for="col of columns"
            :key="col.field"
            :field="col.field"
            :header="col.header"
            sortable
          ></PrimeColumn>

          <PrimeColumn 
            key="actions"
            field="actions"
            :header="$t('labels.action')"
          >
            <template #body>
              <div class="flex">
                <PrimeButton class="mr-2" icon="pi pi-pencil" rounded outlined :aria-label="$t('labels.edit')" />
                <PrimeButton icon="pi pi-trash" severity="danger" rounded outlined :aria-label="$t('labels.delete')" />
              </div>
            </template>
          </PrimeColumn>
        </PrimeDataTable>
      </div>
    </div>
  </div>
</template>