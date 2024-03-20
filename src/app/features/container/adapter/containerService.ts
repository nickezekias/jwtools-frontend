import type { Container, DBGetQueryFilter } from '@/@types/model'
import axios from '@/lib/axios'

const url = '/containers'

const createObject = function (data: Container) {
  return axios.post(url, data)
}

const updateObject = function (
  payload: Record<string, number | Container> & {
    id: number
    data: Container
  }
) {
  return axios.put(`${url}/${payload.id}`, payload.data)
}

const deleteObject = function (id: number) {
  return axios.delete(`${url}/${id}`)
}

const getAll = function (filter?: DBGetQueryFilter) {
  let query = '?'
  if (filter && filter.itemsPerPage) {
    query += `itemsPerPage=${filter.itemsPerPage}`
  }
  if (filter && filter.page) {
    query += `&page=${filter.page}`
  }
  if (filter && filter.sortBy) {
    const sortBy = filter.sortBy
    for (let index = 0; index < sortBy.length; index++) {
      if (index === 0) {
        query += `&sortBy=${sortBy[index]}`
      } else {
        query += `,${sortBy[index]}`
      }
    }
  }
  if (filter && filter.sortDesc) {
    const filterBy = filter.sortDesc
    for (let index = 0; index < filterBy.length; index++) {
      if (index === 0) {
        query += `&sortDesc=${filterBy[index]}`
      } else {
        query += `,${filterBy[index]}`
      }
    }
  }

  return axios.get(`${url}${query}`)
}

const get = function (id: number) {
  return axios.get(`${url}/${id}`)
}

const getObjectsCount = function () {
  return axios.get(`${url}/count`)
}

export default {
  get,
  getAll,
  getObjectsCount,
  createObject,
  updateObject,
  deleteObject
}
