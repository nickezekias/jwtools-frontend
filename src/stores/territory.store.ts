import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { Territory, TerritoryQuarter, DBGetQueryFilter } from '@/@types/model'
import objectService from '@/app/features/territory/adapter/territory.service'

export const useTerritoryStore = defineStore('territory', () => {
  const territories: Ref<Territory[]> = ref([])
  const territoryQuarters: Ref<TerritoryQuarter[]> = ref([])

  async function getAll(filter: DBGetQueryFilter) {
    const response = await objectService.getAll(filter)
    territories.value = response.data
  }

  async function getAllQuarters(filter: DBGetQueryFilter) {
    const response = await objectService.getAllQuarters(filter)
    territoryQuarters.value = response.data
  }

  async function create(data: Territory) {
    const response = await objectService.create(data)
    territories.value.push(response.data)
  }

  async function createQuarter(data: TerritoryQuarter) {
    const response = await objectService.createQuarter(data)
    territoryQuarters.value.push(response.data)
  }

  async function update(id: number, data: Territory) {
    const response = await objectService.update(id, data)
    return response.data
  }

  async function updateQuarter(id: number, data: TerritoryQuarter) {
    const response = await objectService.updateQuarter(id, data)
    return response.data
  } 

  return {
    territories,
    territoryQuarters,
    createQuarter,
    create,
    getAll,
    getAllQuarters,
    update,
    updateQuarter
  }
})
