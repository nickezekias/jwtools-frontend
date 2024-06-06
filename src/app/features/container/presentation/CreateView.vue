<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { AxiosError } from 'axios'
import { getApiErrors } from '@/app/utils/helper'
import states from '@/assets/data/states.json'
import { useContainerStore } from '@/stores/container'
import { useI18n } from 'vue-i18n'
import { useToast } from 'primevue/usetoast'

import FileUploader from '@/components/FileUploader.vue'
import type { Container } from '@/@types/model'

const emit = defineEmits(['close', 'submitted'])
const objectStore = useContainerStore()
const { t } = useI18n()
const toast = useToast()

const model = defineModel()
const props = defineProps<{
  data: Container | null
}>()

const barcode = ref('')
const images = ref('')
const name = ref('')
const parent = ref(0)
const sku = ref('')
const state = ref('')

const form = computed((): Container => {
  return {
    id: 0,
    barcode: barcode.value,
    images: images.value,
    name: name.value,
    parent: parent.value,
    sku: sku.value,
    state: state.value
  }
})

const getHeader = computed(() => {
  if (isEditMode.value) {
    return t('labels.editContainer')
  } else {
    return t('labels.newContainer')
  }
})

const isEditMode = computed(() => {
  if (props.data) return true
  else return false
})

onMounted(async () => {
  if (props.data) {
    fillForm(props.data)
  }
})

function clearForm() {
  barcode.value = ''
  images.value = ''
  name.value = ''
  parent.value = 0
  sku.value = ''
  state.value = ''
}

function closeDialog() {
  emit('close')
  clearForm()
}

function fillForm(data: Container) {
  barcode.value = data.barcode
  images.value = data.images
  name.value = data.name
  parent.value = data.parent
  sku.value = data.sku
  state.value = data.state
}

async function submit() {
  objectStore.setLoading(true)
  try {
    let toastMessage = ''
    let response = null
    if (props.data) {
      response = await objectStore.update({ id: props.data.id, data: form.value })
      toastMessage = t('app.features.container.create.editSuccessMessage')
    } else {
      response = await objectStore.create(form.value)
      toastMessage = t('app.features.container.create.successMessage')
    }
    if (response) {
      toast.add({
        severity: 'success',
        summary: 'Info',
        detail: toastMessage,
        life: 3000
      })
      emit('submitted', response)
      closeDialog()
    } else {
      alert("Nous n'avons pas pu éditer la ressource, veuillez réessayer")
    }
  } catch (error) {
    console.error(getApiErrors(error as AxiosError))
    toast.add({
      severity: 'error',
      summary: t('labels.error'),
      detail: error,
      life: 3000
    })
  } finally {
    objectStore.setLoading(false)
  }
}
</script>

<template>
  <PrimeDialog
    class="w-11 md:w-30rem"
    :closable="false"
    modal
    :style="{ width: '50vw' }"
    v-model:visible="model"
  >
    <template #container>
      <div class="p-4 overflow-y-auto">
        <div>
          <span class="text-xl md:text-3xl font-bold">{{ getHeader }}</span>
        </div>
        <form class="w-full m-0 mt-5">
          <div class="field text-base md:text-lg">
            <label for="name">{{ $t('labels.name') }}</label>
            <input
              v-model="name"
              id="name"
              type="text"
              class="text-color text-sm md:text-lg surface-overlay p-3 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
            />
          </div>

          <div class="grid">
            <div class="col field">
              <label for="barcode">{{ $t('labels.barcode') }}</label>
              <input
                v-model="barcode"
                id="barcode"
                type="text"
                class="text-color text-sm md:text-lg surface-overlay p-3 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
              />
            </div>
            <div class="field col">
              <label for="sku">{{ $t('labels.sku') }}</label>
              <input
                v-model="sku"
                id="sku"
                type="text"
                class="text-color text-sm md:text-lg surface-overlay p-3 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
              />
            </div>
          </div>

          <div class="grid">
            <div class="col field text-base md:text-lg">
              <label for="name">{{ $t('labels.state') }}</label>
              <PrimeDropdown
                v-model="state"
                :options="states"
                :placeholder="$t('placeholders.selectState')"
                class="w-full py-1"
              />
            </div>
          </div>

          <div>
            <span class="text-2xl font-semibold">{{
              $t('app.features.container.create.containerImage')
            }}</span>
            <FileUploader class="h-6"/>
          </div>

          <div class="col-12 mt-5">
            <div class="flex justify-content-end gap-4">
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
            </div>
          </div>
        </form>
      </div>
    </template>
  </PrimeDialog>
</template>