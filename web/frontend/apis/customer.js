import apiCaller from '../helpers/apiCaller'

const count = async () => {
  return await apiCaller(`/api/customers/count`)
}

const find = async (query) => {
  return await apiCaller(`/api/customers${query || ''}`)
}

const findById = async (id) => {
  return await apiCaller(`/api/customers/${id}`)
}

const create = async (data) => {
  return await apiCaller(`/api/customers`, 'POST', { customer: data })
}

const update = async (id, data) => {
  return await apiCaller(`/api/customers/${id}`, 'PUT', { customer: data })
}

const _delete = async (id) => {
  return await apiCaller(`/api/customers/${id}`, 'DELETE')
}

const CustomerApi = {
  count,
  find,
  findById,
  create,
  update,
  delete: _delete,
}

export default CustomerApi
