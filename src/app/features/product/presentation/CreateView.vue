<script setup lang="ts">
import { AxiosError } from 'axios'
import { computed, onMounted, ref, type Ref } from 'vue'
import type { Container } from '@/@types/model'
import FileUploader from '@/components/FileUploader.vue'
import { getApiErrors } from '@/app/utils/helper'
import productTypes from '@/assets/data/productTypes.json'
import type { Product as Obj } from '@/@types/model'
import { useContainerStore } from '@/stores/container'
import { useI18n } from 'vue-i18n'
import { useProductStore } from '@/stores/product'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
// import CreateForm from './CreateForm.vue'

const containerStore = useContainerStore()
const objectStore = useProductStore()
const router = useRouter()
const { t } = useI18n()
const toast = useToast()

const home = ref({
  icon: 'pi pi-home'
})

const items = ref([{ label: t('labels.product', 2) }, { label: t('labels.newProduct') }])

const barcode = ref('')
const container = ref()
const containers: Ref<Array<Container>> = ref([])
const name = ref()
const sku = ref()
const type = ref()
const images: Ref<string | File> = ref('')

const form = computed((): Obj => {
  return {
    id: 0,
    productAttributes: [],
    barcode: barcode.value,
    container: container.value,
    images: images.value,
    locale: '',
    name: name.value,
    parent: 0,
    quantity: 1,
    sku: sku.value,
    slug: name.value.toLowerCase().replace(' ', '-'),
    state: '',
    status: '',
    tags: [],
    type: type.value,
    warehouse: ''
  }
})

const formData = computed(() => {
  const formData = new FormData()
  for(let [key, value] of Object.entries(form.value)) {
    if (key == 'productAttributes' || key == 'tags') {
      formData.append(`${key}`, value.toString())
    } else {
      formData.append(`${key}`, `${value}`)
    }
  }
  formData.append('file', images.value)
  return formData
})

onMounted(async () => {
  if (containerStore.objects.length > 0) {
    containers.value = containerStore.objects
  } else {
    containers.value = await containerStore.getAll({
      itemsPerPage: -1,
      sortBy: ['containers.name']
    })
  }
})

function clearForm() {
  barcode.value = ''
  container.value = ''
  name.value = ''
  sku.value = ''
  type.value = ''
}

async function submit() {
  objectStore.setLoading(true)
  try {
    const response = await objectStore.create(formData.value)
    if (response) {
      toast.add({
        severity: 'success',
        summary: 'Info',
        detail: t('app.features.product.create.successMessage'),
        life: 3000
      })
      router.push(`/products?editId=${response.id}&new=1`)
      window.setTimeout(() => {
      }, 3000)
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
</script>

<template>
  <div class="pb-6 md:pb-3">
    <nav>
      <div class="flex justify-content-center">
        <PrimeBreadcrumb :home="home" :model="items" class="w-full bg-transparent" />
      </div>
      <PrimeToolbar class="bg-transparent mt-1 border-none">
        <template #start>
          <span class="font-medium text-xl md:text-4xl">{{ $t('labels.newProduct') }}</span>
        </template>
      </PrimeToolbar>
    </nav>
    <div class="mt-4">
      <!-- <CreateForm /> -->
      <form class="card">
        <section class="grid">
          <div class="col-12 text-lg md:text-2xl font-regular mb-3">
            {{ $t('app.features.product.create.productInformation') }}
          </div>
          <!-- PRODUCT IMAGE -->
          <div class="col-12 md:col-5">
            <FileUploader @file-selected="(event: File | string) => { images = event }" />
          </div>

          <!-- PRODUCT MAIN INFO -->
          <div class="col-12 md:col-7">
            <div class="field text-base md:text-lg">
              <label for="name">{{ $t('labels.name') }}</label>
              <input
                v-model="name"
                id="name"
                type="text"
                class="text-color text-sm md:text-lg surface-overlay p-3 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
              />
            </div>

            <div class="formgrid grid">
              <div class="field col-12 md:col">
                <label for="sku">{{ $t('labels.sku') }}</label>
                <input
                  v-model="sku"
                  id="sku"
                  type="text"
                  class="text-color text-sm md:text-lg surface-overlay p-3 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
                />
              </div>
              <div class="field col-12 md:col">
                <label for="barcode">{{ $t('labels.barcode') }}</label>
                <input
                  v-model="barcode"
                  id="barcode"
                  type="text"
                  class="text-color text-sm md:text-lg surface-overlay p-3 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
                />
              </div>
            </div>

            <div class="formgrid grid">
              <div class="col-12 md:col-7 field text-base md:text-lg">
                <label for="name">{{ $t('labels.container') }}</label>
                <PrimeDropdown
                  v-model="container"
                  optionLabel="name"
                  optionValue="sku"
                  :options="containers"
                  :placeholder="$t('placeholders.selectContainer')"
                  class="w-full py-1"
                />
              </div>

              <div class="col-12 md:col-5 field text-base md:text-lg">
                <label for="type">{{ $t('labels.productType') }}</label>
                <PrimeDropdown
                  v-model="type"
                  :options="productTypes"
                  :placeholder="$t('placeholders.selectProductType')"
                  class="w-full py-1"
                />
              </div>
            </div>
          </div>

          <div class="col-12 mt-5">
            <div class="flex justify-content-end gap-4">
              <PrimeButton
                @click="router.push({ name: 'products.index' })"
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
            </div>
          </div>
        </section>
      </form>
    </div>
    <!-- <PrimeToolbar
      class="flex md:hidden py-1 bg-primary text-white w-full shadow-4 mt-1 border-none border-noround fixed bottom-0 left-0"
    >
      <template #start>
        <span class="font-medium text-xl md:text-4xl">{{ $t('labels.newProduct') }}</span>
      </template>
      <template #end>
        <PrimeButton class="bg-white text-primary" :label="$t('actions.save')"></PrimeButton>
      </template>
    </PrimeToolbar> -->
  </div>
</template>
