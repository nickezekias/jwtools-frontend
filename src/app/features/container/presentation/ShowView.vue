<!-- Created on : 2024/04/25 - 12:41:40 -->
<script setup lang="ts">
import { computed, onMounted } from 'vue'

import GridDataView from './GridDataView.vue'
import type { Product } from '@/@types/model'
import { ref } from 'vue'
import type { Ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useProductStore } from '@/stores/product'

const containerProducts: Ref<Array<Product>> = ref([])
const emit = defineEmits(['close'])
const model = defineModel()
const objectStore = useProductStore()
const props = defineProps<{ data: Product }>()
const { t } = useI18n()

const containerProductsTotal = computed(() => {
  return containerProducts.value.length
})

const containerProductsInUse = computed(() => {
  return containerProducts.value.filter((val: Product) => {
    return val.status != 'Disponible'
  }).length
})

const containerProductsDamaged = computed(() => {
  return containerProducts.value.filter((val: Product) => {
    return val.state == 'Endommagé'
  }).length
})

const stats = ref([
  {
    label: t('labels.total'),
    value: containerProductsTotal,
    color: 'blue'
  },
  {
    label: t('labels.inUse'),
    value: containerProductsInUse,
    color: 'orange'
  },
  {
    label: t('labels.damaged'),
    value: containerProductsDamaged,
    color: 'red'
  }
])

onMounted(async () => {
  if (objectStore.objects.length < 1) {
    await objectStore.getAll({ itemsPerPage: -1, sortBy: ['products.name'] })
    containerProducts.value = objectStore.getProductsForContainer(`${props.data.sku}`)
  } else {
    containerProducts.value = objectStore.getProductsForContainer(`${props.data.sku}`)
  }
})

function getStateSeverity(state: string) {
  if (state == 'Nouveau' || state == 'Bon') {
    return 'success'
  } else if (state == 'Pièces manquantes') {
    return 'warning'
  } else if (state == 'Endommagé') {
    return 'danger'
  } else return null
}
</script>

<template>
  <PrimeSidebar
    class="overflow-y-auto pb-4"
    :dismissable="false"
    :header="$t('labels.showContainer')"
    position="full"
    v-model:visible="model"
  >
    <div class="grid h-full pt-4">
      <div
        class="col-12 md:col-4 flex-column border-none border-bottom-1 md:border-bottom-none md:border-right-1 pb-4 md:pb-0 border-gray-100"
      >
        <div class="container-img flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-6 h-6 text-3xl md:text-5xl text-gray-50 mx-auto"
          >
            <path
              d="M12.378 1.602a.75.75 0 0 0-.756 0L3 6.632l9 5.25 9-5.25-8.622-5.03ZM21.75 7.93l-9 5.25v9l8.628-5.032a.75.75 0 0 0 .372-.648V7.93ZM11.25 22.18v-9l-9-5.25v8.57a.75.75 0 0 0 .372.648l8.628 5.033Z"
            />
          </svg>
        </div>
        <span class="text-3xl font-medium block text-gray-400 text-center">{{
          props.data.name
        }}</span>
        <span class="block text-center text-gray-300 font-medium mt-3">#{{ props.data.sku }}</span>
        <div class="text-center mt-3">
          <span class="mr-2 font-medium">{{ $t('labels.state') }} :</span>
          <PrimeTag
            class="inline"
            :value="props.data.state"
            :severity="getStateSeverity(props.data.state)"
          />
        </div>
      </div>

      <div class="col-12 md:col-8 mt-4 md:mt-0">
        <h3 class="font-light text-gray-400 mb-3">{{ $t('labels.containedProducts') }}</h3>

        <div class="grid">
          <div v-for="item in stats" :key="item.label" class="col">
            <div class="card" :class="`text-${item.color}-500 border-${item.color}-500`">
              <span class="block text-xl font-light white-space-nowrap">{{ item.label }}</span>
              <span class="block text-5xl font-bold">{{ item.value }}</span>
            </div>
          </div>
        </div>

        <GridDataView :objects="containerProducts" class="mt-4" />
      </div>
    </div>
  </PrimeSidebar>
</template>
