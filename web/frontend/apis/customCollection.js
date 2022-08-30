import apiCaller from '../helpers/apiCaller'

const count = async () => {
  return await apiCaller('/api/custom_collections/count')
}

const find = async (query) => {
  return await apiCaller(`/api/custom_collections${query || ''}`)
}

const findById = async (id) => {
  return await apiCaller(`/api/custom_collections/${id}`)
}

const create = async (data) => {
  return await apiCaller('/api/custom_collections', 'POST', { custom_collection: data })
}

const update = async (id, data) => {
  return await apiCaller(`/api/custom_collections/${id}`, 'PUT', { custom_collection: data })
}

const _delete = async (id) => {
  return await apiCaller(`/api/custom_collections/${id}`, 'DELETE')
}

const CustomCollectionApi = {
  count,
  find,
  findById,
  create,
  update,
  delete: _delete,
}

export default CustomCollectionApi
