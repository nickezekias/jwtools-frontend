import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { Container, DBGetQueryFilter } from '@/@types/model'
import objectService from '@/app/features/container/adapter/containerService'

export const useContainerStore = defineStore('container', () => {
  const loading = ref(false)
  const objects: Ref<Array<Container>> = ref([])

  async function getAll(filter: DBGetQueryFilter) {
    if (!filter) {
      filter = {
        itemsPerPage: -1,
        sortBy: ['container.name']
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

  async function create(data: Container) {
    loading.value = true
    const response = await objectService.createObject(data)
    return response.data.data
  }

  async function update(
    payload: Record<string, number | Container> & {
      id: number
      data: Container
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

  return { loading, objects, create, destroy, get, getAll, setLoading, update }
})
