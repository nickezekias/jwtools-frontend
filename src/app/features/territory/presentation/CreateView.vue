<script setup lang="ts">
import { computed, onMounted, ref, type Ref } from 'vue'
import { AxiosError } from 'axios'
import { getApiErrors } from '@/app/utils/helper'
import { useI18n } from 'vue-i18n'
import { useToast } from 'primevue/usetoast'

import type { Territory } from '@/@types/model'
import { useTerritoryStore } from '@/stores/territory.store'

const emit = defineEmits(['close', 'submitted'])
const model = defineModel()
const objectStore = useTerritoryStore()
const props = defineProps<{
  data: Territory | null
}>()
const { t } = useI18n()
const toast = useToast()

const loading = ref(false)
const state: Ref<Territory> = ref({
  id: 0,
  code: '',
  quarter: ''
})

const getHeader = computed(() => {
  if (isEditMode.value) {
    return t('labels.editTerritory')
  } else {
    return t('labels.newTerritory')
  }
})

const isEditMode = computed(() => {
  if (props.data) {
    return true
  }
  else {
    return false
  }
})

onMounted(async () => {
  if (props.data) {
    fillForm(props.data)
  }
})

function clearForm() {
  state.value.id = 0
  state.value.code = ''
  state.value.quarter = ''
}

function closeDialog() {
  emit('close')
  clearForm()
}

function fillForm(data: Territory) {
  state.value.id = data.id
  state.value.code = data.code
  state.value.quarter = data.quarter
}

async function submit() {
  loading.value = true
  try {
    let toastMessage = ''
    let response = null
    if (props.data) {
      response = await objectStore.update(props.data.id, state.value )
      toastMessage = t('labels.editSuccessMessage')
    } else {
      response = await objectStore.create(state.value)
      toastMessage = t('labels.createSuccessMessage')
    }
    toast.add({
      severity: 'success',
      summary: 'Info',
      detail: toastMessage,
      life: 3000
    })
    emit('submitted', response)
    closeDialog()
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
            <label for="code">{{ $t('labels.code') }}</label>
            <input
              v-model="state.code"
              id="code"
              type="text"
              class="text-color text-sm md:text-lg surface-overlay p-3 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
            />
          </div>

          <div class="grid">
            <div class="col field">
              <label for="quarter">{{ $t('labels.quarter') }}</label>
              <input
                v-model="state.quarter"
                id="quarter"
                type="text"
                class="text-color text-sm md:text-lg surface-overlay p-3 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
              />
            </div>
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
                :loading="loading"
              />
            </div>
          </div>
        </form>
      </div>
    </template>
  </PrimeDialog>
</template>