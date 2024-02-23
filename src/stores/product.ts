import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { DBGetQueryFilter } from '@/@types/model'
import objectService from '@/app/features/product/adapter/productService'

export const useProductStore = defineStore('product', () => {
  const loading = ref(false)
  const objects = ref([])

  async function getAll(filter: DBGetQueryFilter) {
    loading.value = true
    try {
      if (!filter) {
        filter = {
          itemsPerPage: -1,
          sortBy: ['product.name']
        }
      }
      const response = await objectService.getAll(filter)
      objects.value = response.data.data
    } catch (error) {
      console.log('PRODUCT_STORE_GET-ALL_ERROR', error)
    } finally {
      loading.value = false
    }
  }

  async function get(id: number) {
    loading.value = true
    try {
      const response = await objectService.get(id)
      return response.data.data
    } catch (error) {
      console.log('PRODUCT_STORE_GET_ERROR', error)
    } finally {
      loading.value = false
    }
  }

  async function create(data: Record<string, unknown>) {
    loading.value = true
    try {
      const response = await objectService.createObject(data)
      return response.data.data
    } catch (error) {
      console.log('PRODUCT_STORE_CREATE_ERROR', error)
    } finally {
      loading.value = false
    }
  }

  async function update(
    payload: Record<string, unknown> & {
      id: number
      data: Record<string, unknown>
    }
  ) {
    loading.value = true
    try {
      const response = await objectService.updateObject(payload)
      return response.data.data
    } catch (error) {
      console.log('PRODUCT_STORE_UPDATE_ERROR', error)
    } finally {
      loading.value = false
    }
  }

  async function destroy(id: number) {
    loading.value = true
    try {
      const response = await objectService.deleteObject(id)
      return response
    } catch (error) {
      console.log('PRODUCT_STORE_DELETE_ERROR', error)
    } finally {
      loading.value = false
    }
  }

  return { loading, objects, create, destroy, get, getAll, update }
})
