import type { Territory, TerritoryQuarter, DBGetQueryFilter } from '@/@types/model'
import axios from '@/lib/axios'

const url = '/territories'
const quarterUrl = '/territory-quarters'

const create = function (data: Territory) {
  return axios.post(url, data)
}

const getAll = function (filter?: DBGetQueryFilter) {
  return axios.get(url, { params: filter })
}

const createQuarter = function (data: TerritoryQuarter) {
  return axios.post(quarterUrl, data)
}

const getAllQuarters = function (filter?: DBGetQueryFilter) {
  return axios.get(quarterUrl, { params: filter })
}

const update = function (id: number, data: Territory) {
  return axios.post(`${url}/${data.id}?_method=PUT`, data)
}

const updateQuarter = function (id: number, data: TerritoryQuarter) {
  return axios.post(`${quarterUrl}/${data.id}?_method=PUT`, data)
}

export default {
  getAll,
  create,
  createQuarter,
  getAllQuarters,
  update,
  updateQuarter
}
