<script setup lang="ts">
import { computed, onMounted, ref, type Ref } from 'vue'

import { AxiosError } from 'axios'
import categoriesList from '@/assets/data/categories.json'
import FileUploader from '@/components/FileUploader.vue'
import { getApiErrors } from '@/app/utils/helper'
import productTypes from '@/assets/data/productTypes.json'
import states from '@/assets/data/states.json'
import statuses from '@/assets/data/statuses.json'
import type { Product } from '@/@types/model'
import { useContainerStore } from '@/stores/container'
import { useI18n } from 'vue-i18n'
import { useProductStore } from '@/stores/product'
import { useToast } from 'primevue/usetoast'

const containerStore = useContainerStore()
const emit = defineEmits(['close', 'edited'])
const model = defineModel()
const objectStore = useProductStore()
const props = defineProps<{ data: Product | null; mode: number }>()
const { t } = useI18n()
const toast = useToast()

const productAttributes: Ref<Array<string>> = ref([])
const barcode = ref('')
const containers = ref()
const brand = ref()
const categories = ref()
const color = ref()
const colorPicker = ref('')
const componentLoading = ref(false)
const container = ref()
const cost = ref()
const description = ref()
const images = ref()
const locale = ref('fr-FR')
const name = ref()
const price = cost
const quantity = ref(1)
const qrCode = ref()
const serial = ref()
const sku = ref()
const state = ref()
const status = ref()
const tags: Ref<Array<string>> = ref([])
const type = ref()
const unitOfMeasure = ref()
const warehouse = ref()

const form = computed(() => {
  return {
    productAttributes: productAttributes.value.toString(),
    barcode: barcode.value,
    brand: brand.value,
    categories: categories.value,
    color: color.value,
    container: container.value,
    cost: cost.value,
    description: description.value,
    images: images.value.toString(),
    locale: locale.value,
    name: name.value,
    price: price.value,
    quantity: quantity.value,
    qrCode: qrCode.value,
    serial: serial.value,
    sku: sku.value,
    slug: name.value.toLowerCase().replace(' ', '-'),
    state: state.value,
    status: status.value,
    tags: tags.value.toString(),
    type: type.value,
    unitOfMeasure: unitOfMeasure.value,
    warehouse: warehouse.value
  }
})

onMounted(async () => {
  componentLoading.value = true
  containers.value = await containerStore.getAll({ itemsPerPage: -1, sortBy: ['containers.name'] })
  if (props.mode == objectStore.MODE_EDIT && props.data) {
    if (props.data) {
      fillForm(props.data)
    } else {
      toast.add({
        severity: 'error',
        summary: t('labels.error'),
        detail: t('labels.editDataLoadError'),
        life: 3000
      })
      console.error('DATA PROP not passed properly')
    }
  }
  componentLoading.value = false
})

function clearForm() {
  productAttributes.value = []
  barcode.value = ''
  brand.value = ''
  categories.value = ''
  color.value = ''
  container.value = ''
  cost.value = ''
  description.value = ''
  images.value = []
  locale.value = ''
  name.value = ''
  price.value = ''
  quantity.value = -1
  qrCode.value = ''
  serial.value = ''
  sku.value = ''
  state.value = ''
  status.value = ''
  tags.value = []
  type.value = ''
  unitOfMeasure.value = ''
  warehouse.value = ''
}

function closeDialog() {
  emit('close')
  clearForm()
}

function fillForm(data: Product) {
  productAttributes.value = data.attributes
  barcode.value = data.barcode
  brand.value = data.brand
  categories.value = data.categories
  color.value = data.color
  container.value = data.container
  cost.value = data.cost
  description.value = data.description
  images.value = data.images
  locale.value = data.locale
  name.value = data.name
  price.value = data.price
  quantity.value = data.quantity
  qrCode.value = data.qrCode
  serial.value = data.serial
  sku.value = data.sku
  state.value = data.state
  status.value = data.status
  tags.value = data.tags
  type.value = data.type
  unitOfMeasure.value = data.unitOfMeasure
  warehouse.value = data.warehouse
}

async function submit() {
  objectStore.setLoading(true)
  try {
    if (props.data) {
      const response = await objectStore.update({ id: props.data?.id, data: form.value })
      if (response) {
        toast.add({
          severity: 'success',
          summary: 'Info',
          detail: t('app.features.product.editSuccessMessage'),
          life: 3000
        })
        closeDialog()
        emit('edited', response)
      }
    } else {
      console.error('Props data not passed')
    }
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: t('labels.error'),
      detail: getApiErrors(error as AxiosError),
      life: 5000
    })
  } finally {
    objectStore.setLoading(false)
  }
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
      <div v-else class="content w-full md:w-9 pt-4">
        <!-- HEADER -->
        <div class="mb-5">
          <span class="text-xl md:text-3xl font-bold">{{ t('labels.editProduct') }}</span>
        </div>

        <!-- CONTENT -->
        <form class="m-0">
          <section class="grid">
            <!-- PRODUCT IMAGE -->
            <div class="col-12 md:col-5">
              <!-- <div>
                <span class="text-2xl font-semibold">{{
                  $t('app.features.product.create.productImage')
                }}</span>
              </div> -->
              <FileUploader />
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
          </section>

          <section class="grid px-0">
            <!-- SECTION HEADER -->
            <div class="col-12 text-lg md:text-2xl font-regular mt-4 mb-3 text-secondary">
              {{ $t('app.features.product.create.productInformation') }}
            </div>

            <div class="col-12 md:col-4 field text-base md:text-lg">
              <label for="name">{{ $t('labels.category', 2) }}</label>
              <PrimeDropdown
                v-model="categories"
                :options="categoriesList"
                :placeholder="$t('placeholders.selectCategory')"
                class="w-full py-1"
              />
            </div>

            <div class="col-12 md:col-4 field text-base md:text-lg">
              <label for="name">{{ $t('labels.status') }}</label>
              <PrimeDropdown
                v-model="status"
                :options="statuses"
                :placeholder="$t('placeholders.selectStatus')"
                class="w-full py-1"
              />
            </div>

            <div class="col-12 md:col-4 field text-base md:text-lg">
              <label for="name">{{ $t('labels.state') }}</label>
              <PrimeDropdown
                v-model="state"
                :options="states"
                :placeholder="$t('placeholders.selectState')"
                class="w-full py-1"
              />
            </div>

            <div class="col-12 md:col-4 field text-base md:text-lg">
              <label for="tags">{{ $t('labels.tag', 2) }}</label>
              <div class="p-fluid">
                <PrimeChips v-model="tags" separator="," inputClass="py-1" />
              </div>
            </div>

            <div class="col-12 md:col-4 field text-base md:text-lg">
              <label for="color">{{ $t('labels.color') }}</label>
              <div class="flex align-items-center gap-3">
                <input
                  v-model="color"
                  id="color"
                  type="text"
                  class="text-color text-sm md:text-lg surface-overlay p-3 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
                />
              </div>
            </div>

            <div class="col-12 md:col-4 field text-base md:text-lg">
              <label for="brand">{{ $t('labels.brand') }}</label>
              <input
                v-model="brand"
                id="brand"
                type="text"
                class="text-color text-sm md:text-lg surface-overlay p-3 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
              />
            </div>

            <div class="col-12 md:col-6 field text-base md:text-lg">
              <label for="quantity" class="w-full">{{ $t('labels.quantity') }}</label>
              <div class="p-fluid">
                <PrimeInputNumber
                  v-model="quantity"
                  inputId="quantity"
                  showButtons
                  buttonLayout="horizontal"
                  :step="1"
                  mode="decimal"
                  inputClass="py-3"
                >
                  <template #incrementbuttonicon>
                    <span class="pi pi-plus" />
                  </template>
                  <template #decrementbuttonicon>
                    <span class="pi pi-minus" />
                  </template>
                </PrimeInputNumber>
              </div>
            </div>

            <div class="col-12 md:col-6 field text-base md:text-lg">
              <label for="cost">{{ $t('labels.cost') }}</label>
              <input
                v-model="cost"
                id="cost"
                type="text"
                class="text-color text-sm md:text-lg surface-overlay p-3 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
              />
            </div>

            <div class="col-12 field text-base md:text-lg">
              <label for="name">{{ $t('labels.description') }}</label>
              <PrimeEditor v-model="description" class="w-full" editorStyle="height:10rem" />
            </div>
          </section>
        </form>
      </div>

      <footer id="footer" class="gap-4">
        <PrimeButton
          @click="emit('close')"
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
    </template>
  </PrimeSidebar>
</template>

<style scoped>
.content {
  margin: 0 auto 0;
  padding-bottom: 2rem;
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
