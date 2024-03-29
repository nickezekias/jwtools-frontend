<script setup lang="ts">
import { ref, onMounted, type Ref } from 'vue'
import { useProductStore } from '@/stores/product';
import { useI18n } from 'vue-i18n'
import { FilterMatchMode } from 'primevue/api';
import { useToast } from 'primevue/usetoast'

import { getApiErrors } from '@/app/utils/helper'
import { AxiosError } from 'axios'
import { useRouter } from 'vue-router';
import { useDataTableUtil } from '@/app/composables/useDataTableUtil'

import DeleteDialog from './DeleteView.vue'
import EditDialog from './EditView.vue'
import type { Product } from '@/@types/model';


const objectStore = useProductStore()
const { t } = useI18n()
const toast = useToast()
const router = useRouter()

let objects: Ref<Array<Product>> = ref([])

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

const dialogMode = ref(objectStore.MODE_CREATE)

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.CONTAINS },
    sku: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    barcode: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    categories: { value: null, matchMode: FilterMatchMode.IN },
});

const { updateObjectsList } = useDataTableUtil()

const isEditDialog = ref(false)
const editData: Ref<Product | null> = ref(null)

const isDeleteDialog = ref(false)
const deleteId = ref(0)

onMounted(async () => {
  objectStore.setLoading(true)
  try {
    objects.value = await objectStore.getAll({ itemsPerPage: -1, sortBy: ['products.name'] })
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

function closeEditDialog() {
  isEditDialog.value = false
}

function onDeleted() {
  updateObjectsList({ deleteId, objects })
}

function onEdited(editedData: Product) {
  updateObjectsList({ editData, newData: editedData, objects})
  editData.value = null
}

function showDeleteDialog(id: number) {
  isDeleteDialog.value = true
  deleteId.value = id
}

function showEditDialog(data: Product) {
  isEditDialog.value = true
  editData.value = data
  dialogMode.value = objectStore.MODE_EDIT
}
</script>

<template>
  <div class="pb-6 md:pb-3">
    <nav>
      <div class="flex justify-content-center">
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
          :loading="objectStore.loading"
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
          <template #empty><span v-if="!objectStore.loading">{{ $t("app.features.product.index.emptyMessage") }}</span></template>
          <template #loading>{{ $t("app.features.product.index.loadingMessage") }}</template>
          <PrimeColumn
            v-for="col of columns"
            :key="col.field"
            :field="col.field"
            :header="col.header"
            sortable
          ></PrimeColumn>

          <PrimeColumn key="actions" field="actions" :header="$t('labels.action')">
            <template #body="{ data }">
              <div class="flex">
                <PrimeButton
                  @click="showEditDialog(data)"
                  class="mr-2"
                  icon="pi pi-pencil"
                  rounded
                  outlined
                  :aria-label="$t('labels.edit')"
                />
                <PrimeButton
                  @click="showDeleteDialog(data.id)"
                  icon="pi pi-trash"
                  severity="danger"
                  rounded
                  outlined
                  :aria-label="$t('labels.delete')"
                />
              </div>
            </template>
          </PrimeColumn>
        </PrimeDataTable>
      </div>
    </div>

    <DeleteDialog
      v-if="isDeleteDialog"
      v-model="isDeleteDialog"
      @close="isDeleteDialog = false"
      :id="deleteId"
      @deleted="onDeleted"
    />

    <EditDialog
      @close="closeEditDialog"
      :data="editData"
      @edited="(editedData: Product) => { onEdited(editedData) }"
      :mode="dialogMode"
      v-if="isEditDialog"
      v-model="isEditDialog"
    />
  </div>
</template>
