<script setup lang="ts">
import { AxiosError } from 'axios'
import { getApiErrors } from '@/app/utils/helper'
import { useProductStore } from '@/stores/product';
import { useToast } from 'primevue/usetoast';
import { useI18n } from 'vue-i18n'

const emit = defineEmits(['close', 'deleted'])
const model = defineModel()
const objectStore = useProductStore()
const props = defineProps<{ id: number }>()
const { t } = useI18n()
const toast = useToast()

async function submit() {
  objectStore.setLoading(true)
  try {
    const response = await objectStore.destroy(props.id)
    if (response) {
      toast.add({
        severity: 'success',
        summary: 'Info',
        detail: t('app.features.product.deleteSuccessMessage'),
        life: 3000
      })
      emit('close')
      emit('deleted')
    } else {
      alert("Nous n'avons pas pu supprimer la ressource, veuillez réessayer")
    }
  } catch (error) {
    console.log(getApiErrors(error as AxiosError))
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
  <PrimeDialog v-model:visible="model" modal class="w-25rem">
    <template #container>
      <div class="p-4">
        <div class="mb-4">
          <span class="text-xl md:text-3xl font-bold">{{
            t('app.features.product.deleteProduct')
          }}</span>
        </div>
  
        <PrimeMessage severity="error">
          {{ $t('app.features.product.confirmDeleteMessage') }}
        </PrimeMessage>
  
        <div class="col-12 mt-5">
          <div class="flex justify-content-end gap-4">
            <PrimeButton @click="emit('close')" size="large" severity="secondary" :label="$t('actions.cancel')" />
            <PrimeButton
              @click="submit"
              :label="$t('labels.delete')"
              :loading="objectStore.loading"
              size="large"
              severity="danger"
            />
          </div>
        </div>
      </div>
    </template>
  </PrimeDialog>
</template>