<script setup lang="ts">
import type { FileUploadUploadEvent } from 'primevue/fileupload';
import { useToast } from 'primevue/usetoast'

const toast = useToast()

const onAdvancedUpload = (event: FileUploadUploadEvent) => {
    toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
};
</script>

<template>
  <div class="card">
    <PrimeToast />
    <PrimeFileUpload
      name="demo[]"
      url="/api/upload"
      @upload="onAdvancedUpload($event)"
      :multiple="true"
      accept="image/*"
    >
      <template #empty>
        <p>{{ $t("placeholders.fileUploader") }}</p>
      </template>
    </PrimeFileUpload>
  </div>
</template>
