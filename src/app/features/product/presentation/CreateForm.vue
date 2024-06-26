<script setup lang="ts">
import { computed, reactive, ref } from 'vue'

import FileUploader from '@/components/FileUploader.vue'
import { useProductStore } from '@/stores/product'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import { useI18n } from 'vue-i18n'

import { getApiErrors } from '@/app/utils/helper'
import { AxiosError } from 'axios'

const router = useRouter()
const objectStore = useProductStore()
const { t } = useI18n()
const toast = useToast()

const productAttributes = ref([])
const barcode = ref('')
const brand = ref('')
const categories = ref('')
const color = ref()
const colorPicker = ref('')
const container = ref('')
const cost = ref('')
const description = ref('')
const images = ref([])
const locale = ref('fr-FR')
const name = ref('')
const price = cost
const quantity = ref(1)
const qrCode = ref('')
const serial = ref('')
const sku = ref('')
const state = ref('')
const status = ref('')
const tags = ref([])
const type = ref('')
const unitOfMeasure = ref('')
const warehouse = ref('Owendo')

const categoriesList = reactive(['Audio', 'Video', 'Mic'])
const containers = ref([
  'Caisse à outils',
  'Sac à outils',
  'Caisse câbles audio',
  'Caisse câble vidéos'
])
const states = ref(['Nouveau', 'Bon', 'Endommagé', 'Pièces manquantes'])
const statuses = reactive(['Published', 'Draft'])

const form = computed(() => {
  let colorNameAndHexCode = color.value
  if (colorNameAndHexCode) {
    colorNameAndHexCode = `${color.value}#${colorPicker.value}`
  }
  return {
    productAttributes: productAttributes.value.toString(),
    barcode: barcode.value,
    brand: brand.value,
    categories: categories.value,
    color: colorNameAndHexCode,
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

async function submit() {
  objectStore.setLoading(true)
  try {
    const response = await objectStore.create(form.value)
    if (response) {
      toast.add({
        severity: 'success',
        summary: 'Info',
        detail: t('app.features.product.create.successMessage'),
        life: 3000
      })
      window.setTimeout(() => {
        router.push({ name: 'products.index' })
      }, 3000)
    }
  } catch (error) {
    console.error(getApiErrors(error as AxiosError))
    toast.add({
      severity: 'error',
      summary: t("labels.error"),
      detail: error,
      life: 3000
    })
  } finally {
    objectStore.setLoading(false)
  }
}
</script>

<template>
  <form class="grid w-full m-0">
    <div class="col-12 lg:col-8">
      <PrimeCard class="w-full">
        <template #title
          ><span class="text-lg md:text-2xl font-semibold">{{
            $t('app.features.product.create.productInformation')
          }}</span></template
        >
        <template #content>
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
            <div class="field col-12 md:col">
              <label for="brand">{{ $t('labels.brand') }}</label>
              <input
                v-model="brand"
                id="brand"
                type="text"
                class="text-color text-sm md:text-lg surface-overlay p-3 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
              />
            </div>
            <div class="field col-12 md:col">
              <label for="color">{{ $t('labels.color') }}</label>
              <div class="flex align-items-center gap-3">
                <input
                  v-model="color"
                  id="color"
                  type="text"
                  class="text-color text-sm md:text-lg surface-overlay p-3 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
                />
                <PrimeColorPicker v-model="colorPicker" />
              </div>
            </div>
          </div>

          <div class="field text-base md:text-lg">
            <label for="name">{{ $t('labels.description') }}</label>
            <PrimeEditor v-model="description" class="w-full" editorStyle="height:10rem" />
          </div>
        </template>
      </PrimeCard>

      <PrimeCard class="w-full mt-4">
        <template #title
          ><span class="text-2xl font-semibold">{{
            $t('app.features.product.create.productImage')
          }}</span></template
        >
        <template #content>
          <FileUploader />
        </template>
      </PrimeCard>
    </div>
    <div class="col-12 lg:col-4">
      <PrimeCard class="w-full">
        <template #title
          ><span class="text-lg md:text-2xl font-semibold">{{
            $t('app.features.product.create.organize')
          }}</span></template
        >

        <template #content>
          <div class="field text-base md:text-lg">
            <label for="name">{{ $t('labels.container') }}</label>
            <PrimeDropdown
              v-model="container"
              :options="containers"
              :placeholder="$t('placeholders.selectContainer')"
              class="w-full py-1"
            />
          </div>
          <div class="field text-base md:text-lg">
            <label for="name">{{ $t('labels.category') }}</label>
            <PrimeTreeSelect
              v-model="categories"
              :options="categoriesList"
              :placeholder="$t('placeholders.selectCategory')"
              class="w-full py-1"
            />
          </div>
          <div class="field text-base md:text-lg">
            <label for="name">{{ $t('labels.status') }}</label>
            <PrimeDropdown
              v-model="status"
              :options="statuses"
              :placeholder="$t('placeholders.selectStatus')"
              class="w-full py-1"
            />
          </div>
          <div class="field text-base md:text-lg">
            <label for="name">{{ $t('labels.state') }}</label>
            <PrimeDropdown
              v-model="state"
              :options="states"
              :placeholder="$t('placeholders.selectState')"
              class="w-full py-1"
            />
          </div>
          <div class="field text-base md:text-lg">
            <label for="tags">{{ $t('labels.tag', 2) }}</label>
            <div class="p-fluid">
              <PrimeChips v-model="tags" separator="," inputClass="py-1" />
            </div>
          </div>
        </template>
      </PrimeCard>

      <PrimeCard class="w-full mt-4">
        <template #title
          ><span class="text-lg md:text-2xl font-semibold">{{
            $t('app.features.product.create.quantityAndCost')
          }}</span></template
        >
        <template #content>
          <div class="field text-base md:text-lg">
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

          <div class="field text-base md:text-lg">
            <label for="cost">{{ $t('labels.cost') }}</label>
            <input
              v-model="cost"
              id="cost"
              type="text"
              class="text-color text-sm md:text-lg surface-overlay p-3 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
            />
          </div>
        </template>
      </PrimeCard>
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
  </form>
</template>
