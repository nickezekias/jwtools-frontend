<script setup lang="ts">
const props = defineProps<{
  objects: Array<object>
}>()
import ProductCard from './ProductCard.vue'
</script>

<template>
  <div class="container">
    <ProductCard v-for="object in props.objects" :key="object.id" :obj="object" />
  </div>
</template>

<style scoped>
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 0.7rem;
}

@media screen and (max-width: 600px) {
  .container {
    grid-template-columns: repeat(auto-fill, minmax(45%, 1fr));
  }
}
</style>
