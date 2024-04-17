<script setup lang="ts">
import { ref, onMounted, type Ref } from 'vue'
import { FilterMatchMode } from 'primevue/api'
import { useToast } from 'primevue/usetoast'
import { useContainerStore } from '@/stores/container'
import { getApiErrors } from '@/app/utils/helper'
import { AxiosError } from 'axios'
import { useI18n } from 'vue-i18n'

import CreateDialog from './CreateView.vue'
import DeleteDialog from './DeleteView.vue'
import type { Container } from '@/@types/model'

const { t } = useI18n()
const toast = useToast()
const objectStore = useContainerStore()

let objects: Ref<Array<Container>> = ref([])

const home = ref({
  icon: 'pi pi-home'
})

const breadcrumbItems = ref([{ label: t('labels.container', 2) }])

const columns = [
  { field: 'name', header: t('labels.name') },
  { field: 'barcode', header: t('labels.barcode') },
  { field: 'sku', header: t('labels.sku') }
]

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  name: { value: null, matchMode: FilterMatchMode.CONTAINS },
  barcode: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  sku: { value: null, matchMode: FilterMatchMode.STARTS_WITH }
})

const isEditDialog = ref(false)
const editData: Ref<Container | null> = ref(null)

const isDeleteDialog = ref(false)
const deleteId = ref(0)

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

function clearEditData() {
  editData.value = null
}

function getStateSeverity(state: string) {
  if (state == 'Nouveau' || state == 'Bon') {
    return 'success'
  } else if (state == 'Pièces manquantes') {
    return 'warning'
  } else if (state == 'Endommagé') {
    return 'danger'
  } else return null
}

function updateObjectsList(payload?: Container) {
  // update edited item data
  if (editData.value && payload) {
    for (let i = 0; i < objects.value.length; i++) {
      if (editData.value.id == objects.value[i].id) {
        objects.value.splice(i, 1, payload)
      }
    }
  } 
  // add new item to list
  else if (!editData.value && payload) {
    objects.value.unshift(payload)
  }

  // Remove deleted item from list
  if (deleteId.value > 0 && !payload) {
    for (let i = 0; i < objects.value.length; i++) {
      if (deleteId.value == objects.value[i].id) {
        objects.value.splice(i, 1)
      }
    }
  }

  // Finish the list update by sorting items
  sortObjectsList()
}

function showDeleteDialog(id: number) {
  deleteId.value = id
  isDeleteDialog.value = true
}

function showEditDialog(payload: Container) {
  editData.value = payload
  toggleEditDialog(true)
}

function sortObjectsList() {
  objects.value.sort((a: Container, b: Container) => {
    if (a.name > b.name) return 1
    else if (b.name > a.name) return -1
    return 0
  })
}

function toggleEditDialog(value: boolean) {
  isEditDialog.value = value
  if (value == false) {
    clearEditData()
  }
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
          <span class="font-medium text-xl md:text-4xl">{{ $t('labels.containerList') }}</span>
        </template>
        <template #end>
          <PrimeButton
            @click="toggleEditDialog(true)"
            :label="$t('labels.newContainer')"
          ></PrimeButton>
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
                <PrimeInputText
                  v-model="filters['global'].value"
                  :placeholder="$t('labels.search')"
                  class="py-3"
                />
              </PrimeIconField>
            </div>
          </template>
          <template #empty v-if="!objectStore.loading">{{
            $t('app.features.container.index.emptyMessage')
          }}</template>
          <template #loading>{{ $t('labels.loadingMessage') }}</template>
          <PrimeColumn
            v-for="col of columns"
            :key="col.field"
            :field="col.field"
            :header="col.header"
            sortable
          ></PrimeColumn>

          <PrimeColumn :header="$t('labels.state')">
            <template #body="slotProps">
              <PrimeTag
                :value="slotProps.data.state"
                :severity="getStateSeverity(slotProps.data.state)"
              />
            </template>
          </PrimeColumn>

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


    <CreateDialog
      v-if="isEditDialog"
      v-model="isEditDialog"
      :data="editData"
      @close="toggleEditDialog(false)"
      @submitted="(payload: Container) => { updateObjectsList(payload) }"
    />

    <DeleteDialog
      v-if="isDeleteDialog"
      v-model="isDeleteDialog"
      @close="isDeleteDialog = false"
      :id="deleteId"
      @submitted="updateObjectsList()"
    />
  </div>
</template>