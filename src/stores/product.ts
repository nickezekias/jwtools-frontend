import { ref } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'
import type { DBGetQueryFilter, Product as Obj } from '@/@types/model'
import objectService from '@/app/features/product/adapter/productService'

export const useProductStore = defineStore('product', () => {
  const loading = ref(false)
  const MODE_CREATE = 1
  const MODE_EDIT = 2
  const MODE_READ = 4
  const objects: Ref<Array<Obj>> = ref([])

  function getProductsForContainer(sku: string) {
    return objects.value.filter((val: Obj) => {
      return val.container == sku
    })
  }

  async function getAll(filter: DBGetQueryFilter) {
    if (!filter) {
      filter = {
        itemsPerPage: -1,
        sortBy: ['product.name']
      }
    }
    const response = await objectService.getAll(filter)
    objects.value = response.data.data
    return response.data.data
  }

  async function get(id: number) {
    const response = await objectService.get(id)
    return response.data.data
  }

  async function create(data: FormData | Obj) {
    const response = await objectService.createObject(data)
    return response.data.data
  }

  async function massCreate(data: Array<Obj>) {
    const response = await objectService.massCreate(data)
    return response.data
  }

  async function update(
    payload: Record<string, unknown> & {
      id: number
      data: FormData | Obj
    }
  ) {
    const response = await objectService.updateObject(payload)
    return response.data.data
  }

  async function destroy(id: number) {
    const response = await objectService.deleteObject(id)
    return response
  }

  function setLoading(value: boolean) {
    loading.value = value
  }

  return {
    loading,
    MODE_CREATE,
    MODE_EDIT,
    MODE_READ,
    objects,
    create,
    destroy,
    get,
    getAll,
    getProductsForContainer,
    massCreate,
    setLoading,
    update
  }
})
