<script setup lang="ts">
import { onMounted, ref, watch, type Ref } from 'vue'

import { AxiosError } from 'axios'
import categoriesList from '@/assets/data/categories.json'
import type { Container } from '@/@types/model'
import FileUploader from '@/components/FileUploader.vue'
import { getApiErrors } from '@/app/utils/helper'
import productTypes from '@/assets/data/productTypes.json'
import states from '@/assets/data/states.json'
import statuses from '@/assets/data/statuses.json'
import type { Product as Obj } from '@/@types/model'
import { useContainerStore } from '@/stores/container'
import { useI18n } from 'vue-i18n'
import { useProductStore } from '@/stores/product'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'

const containerStore = useContainerStore()
const emit = defineEmits(['close', 'massCreated'])
const model = defineModel()
const objectStore = useProductStore()
const router = useRouter()
const { t } = useI18n()
const toast = useToast()

const componentLoading = ref(false)
const containers: Ref<Array<Container>> = ref([])
const editingRows = ref([])
const objects: Ref<Array<Obj>> = ref([])
const rowCount = ref(100)

onMounted(async () => {
  componentLoading.value = true
  if (containerStore.objects.length > 0) {
    containers.value = containerStore.objects
  } else {
    containers.value = await containerStore.getAll({
      itemsPerPage: -1,
      sortBy: ['containers.name']
    })
  }
  fillTableRows(rowCount.value)
  componentLoading.value = false
})

watch(rowCount, () => {
  // todo
  // if (newVal)
  // fillTableRows(rowCount.value)
})

function clearRows() {
  objects.value = []
  fillTableRows(rowCount.value)
}

function closeDialog() {
  emit('close')
  clearRows()
}

function fillTableRows(numberOfRows: number) {
  for (let i = 0; i < numberOfRows; i++) {
    objects.value.push({
      id: 0,
      productAttributes: [],
      barcode: '',
      brand: '',
      categories: '',
      color: '',
      container: '',
      // cost: 0,
      description: '',
      dimensions: '',
      images: '',
      locale: '',
      material: '',
      name: '',
      parent: 0,
      // price: 0,
      qrCode: '',
      quantity: 1,
      serial: '',
      sku: '',
      slug: uuidv4(),
      // FIXME: Stop filling default values for state and status, instead add ui text-fields to allow user to fill em
      state: 'Bon',
      status: 'Disponible',
      tags: [],
      type: '',
      // FIXME: stop default values instead add ui dropdown to user fill it
      unitOfMeasure: 'm',
      warehouse: ''
    })
  }
}

function removeEmptyObjects(payload: Array<Obj>): Array<Obj> {
  return payload.filter((val) => {
      return (
        val.name != '' &&
        val.type != '' &&
        val.container != '' &&
        val.sku != '' &&
        val.barcode != ''
      )
    })
}

const onRowEditSave = (event: any) => {
  let { newData, index } = event

  objects.value[index] = newData
}

async function submit() {
  objectStore.setLoading(true)
  try {
    const payload = removeEmptyObjects(objects.value)

    const response = await objectStore.massCreate(payload)
    if (response.data) {
      toast.add({
        severity: 'success',
        summary: 'Info',
        detail: t('app.features.product.create.successMessage'),
        life: 3000
      })
      emit('massCreated', response.data)
      closeDialog()
    } else {
      alert('Error while creating data, try again by reloading your page or contact admin')
    }
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: t('labels.error'),
      detail: getApiErrors(error as AxiosError),
      life: 10000
    })
  } finally {
    objectStore.setLoading(false)
  }
}

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}
</script>

<template>
  <PrimeSidebar
    class="overflow-y-auto pb-4"
    :dismissable="false"
    position="full"
    v-model:visible="model"
  >
    <template #container>
      <div v-if="componentLoading" class="h-full w-full">
        <PrimeProgressBar mode="indeterminate" style="height: 4px"></PrimeProgressBar>
      </div>

      <div v-else class="content w-full px-4 pt-4">
        <!-- HEADER -->
        <div class="mb-5 flex">
          <span class="text-xl md:text-3xl font-bold">{{ t('labels.massCreateProduct') }}</span>
          <PrimeInputNumber
            v-model="rowCount"
            showButtons
            buttonLayout="horizontal"
            :step="1"
            mode="decimal"
            inputClass="py-3"
            class="ml-auto"
          >
            <template #incrementbuttonicon>
              <span class="pi pi-plus" />
            </template>
            <template #decrementbuttonicon>
              <span class="pi pi-minus" />
            </template>
          </PrimeInputNumber>
        </div>

        <!-- CONTENT -->
        <form class="m-0 w-full">
          <PrimeDataTable
            v-model:editingRows="editingRows"
            :value="objects"
            editMode="row"
            dataKey="slug"
            @row-edit-save="onRowEditSave"
            :pt="{
              table: { style: 'min-width: 50rem' },
              column: {
                bodycell: ({ state }: any) => ({
                  style: state['d_editing'] && 'padding-top: 0.6rem; padding-bottom: 0.6rem'
                })
              }
            }"
          >
            <PrimeColumn field="name" :header="$t('labels.name')" style="width: 20%">
              <template #editor="{ data, field }">
                <PrimeInputText v-model="data[field]" />
              </template>
            </PrimeColumn>

            <PrimeColumn field="container" :header="$t('labels.container')" style="width: 20%">
              <template #editor="{ data, field }">
                <PrimeDropdown
                  v-model="data[field]"
                  :options="containers"
                  optionLabel="name"
                  optionValue="sku"
                  :placeholder="$t('labels.container')"
                >
                </PrimeDropdown>
              </template>
            </PrimeColumn>

            <PrimeColumn field="type" :header="$t('labels.productType')" style="width: 20%">
              <template #editor="{ data, field }">
                <PrimeDropdown
                  v-model="data[field]"
                  :options="productTypes"
                  :placeholder="$t('labels.productType')"
                >
                </PrimeDropdown>
              </template>
            </PrimeColumn>


            <PrimeColumn field="sku" :header="$t('labels.sku')" style="width: 20%">
              <template #editor="{ data, field }">
                <PrimeInputText v-model="data[field]" />
              </template>
            </PrimeColumn>

            <PrimeColumn field="barcode" :header="$t('labels.barcode')" style="width: 20%">
              <template #editor="{ data, field }">
                <PrimeInputText v-model="data[field]" />
              </template>
            </PrimeColumn>

            <PrimeColumn field="categories" :header="$t('labels.category', 2)" style="width: 20%">
              <template #editor="{ data, field }">
                <PrimeDropdown
                  v-model="data[field]"
                  :options="categoriesList"
                  :placeholder="$t('placeholders.selectCategory')"
                >
                </PrimeDropdown>
              </template>
            </PrimeColumn>

            <PrimeColumn field="dimensions" :header="`${$t('labels.dimension', 2)} (lxLxh)`" style="width: 20%">
              <template #editor="{ data, field }">
                <PrimeInputText v-model="data[field]" />
              </template>
            </PrimeColumn>

            <PrimeColumn
              :rowEditor="true"
              style="width: 10%; min-width: 8rem"
              bodyStyle="text-align:center"
            ></PrimeColumn>
          </PrimeDataTable>
        </form>

        <footer id="footer" class="gap-4 shadow-4">
          <PrimeButton
            @click="closeDialog"
            size="large"
            severity="secondary"
            :label="$t('actions.cancel')"
          />
          <PrimeButton
            @click="submit"
            size="large"
            :label="$t('actions.save')"
            :loading="objectStore.loading"
          />
        </footer>
      </div>
    </template>
  </PrimeSidebar>
</template>

<style lang="scss" scoped>
table.mass-create-table {
  border-collapse: collapse;
  width: 100%;
  border: 1px solid #ddd;

  th,
  td {
    text-align: left;
    padding: 0.3rem;
    border: 1px solid #ddd;
  }
  td {
    padding: 0 0.2rem;
  }
}

#footer {
  align-items: center;
  background-color: white;
  border-top: 1px solid lightgray;
  padding: 0.5rem 1rem;
  bottom: 0;
  display: flex;
  justify-content: end;
  left: 0;
  position: fixed;
  width: 100%;
}
</style>
