<script setup lang="ts">
import { ref, onMounted, type Ref } from 'vue'
import { FilterMatchMode } from 'primevue/api'
import { useToast } from 'primevue/usetoast'
import { useTerritoryStore } from '@/stores/territory.store'
import { getApiErrors } from '@/app/utils/helper'
import { AxiosError } from 'axios'
import { useI18n } from 'vue-i18n'

import type { Territory as Obj } from '@/@types/model'

import CreateView from './CreateView.vue'


const { t } = useI18n()
const toast = useToast()
const objectStore = useTerritoryStore()

const loading = ref(false)
let objects: Ref<Array<Obj>> = ref([])

const home = ref({
  icon: 'pi pi-home'
})

const breadcrumbItems = ref([{ label: t('labels.territory', 2) }])

const columns = [
  { field: 'code', header: t('labels.code') },
  { field: 'quarter', header: t('labels.quarter') },
  { field: 'created_at', header: t('labels.createdAt') }
]

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  quarter: { value: null, matchMode: FilterMatchMode.CONTAINS },
  code: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
})

const isEditDialog = ref(false)
const editData: Ref<Obj | null> = ref(null)

onMounted(async () => {
  loading.value = true
  try {
    await objectStore.getAll({ itemsPerPage: -1, sortBy: ['territories.name'] })
    objects.value = objectStore.territories
  } catch (error) {
    console.error(getApiErrors(error as AxiosError))
    toast.add({
      severity: 'error',
      summary: t('labels.error'),
      detail: error,
      life: 3000
    })
  } finally {
    loading.value = false
  }
})

function clearEditData() {
  editData.value = null
}

function updateObjectsList(payload?: Obj) {
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
  /* if (deleteId.value > 0 && !payload) {
    for (let i = 0; i < objects.value.length; i++) {
      if (deleteId.value == objects.value[i].id) {
        objects.value.splice(i, 1)
      }
    }
  } */
  // Finish the list update by sorting items
  sortObjectsList()
}

function showEditDialog(payload: Obj) {
  editData.value = payload
  toggleEditDialog(true)
}

function sortObjectsList() {
  objects.value.sort((a: Obj, b: Obj) => {
    if (a.code > b.code) return 1
    else if (b.code > a.code) return -1
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
          <span class="font-medium text-xl md:text-4xl">{{ $t('labels.territoriesList') }}</span>
        </template>
        <template #end>
          <PrimeButton @click="toggleEditDialog(true)" :label="$t('labels.newTerritory')"></PrimeButton>
        </template>
      </PrimeToolbar>
    </nav>
    <div class="mt-4">
      <div class="card shadow-1">
        <PrimeDataTable v-model:filters="filters" :value="objects" :loading="loading" stripedRows sortMode="multiple"
          filterDisplay="row" :globalFilterFields="['quarter', 'code']" paginator removableSort @row-click="(event: any) => {
            // showShowDialog(event)
          }
            " :rows="10" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem">
          <template #header>
            <div class="flex justify-content-end">
              <PrimeIconField iconPosition="left">
                <PrimeInputIcon>
                  <i class="pi pi-search" />
                </PrimeInputIcon>
                <PrimeInputText v-model="filters['global'].value" :placeholder="$t('labels.search')" class="py-3" />
              </PrimeIconField>
            </div>
          </template>
          <template #empty v-if="!loading">{{
            $t('labels.emptyMessage')
          }}</template>
          <template #loading>{{ $t('labels.loadingMessage') }}</template>
          <PrimeColumn v-for="col of columns" :key="col.field" :field="col.field" :header="col.header" sortable>
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
                <!-- <PrimeButton
                  @click="showDeleteDialog(data.id)"
                  icon="pi pi-trash"
                  severity="danger"
                  rounded
                  outlined
                  :aria-label="$t('labels.delete')"
                /> -->
              </div>
            </template>
          </PrimeColumn>
        </PrimeDataTable>
      </div>
    </div>

    <!-- EDIT DIALOGS -->
    <CreateView
      v-if="isEditDialog"
      v-model="isEditDialog"
      :data="editData"
      @close="toggleEditDialog(false)"
      @submitted="
        (payload: Obj) => {
          updateObjectsList(payload)
        }
      "
    />
  </div>
</template>
