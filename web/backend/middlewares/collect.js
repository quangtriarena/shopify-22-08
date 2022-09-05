import apiCaller from '../helpers/apiCaller.js'
import validateParams from '../helpers/validateParams.js'

const count = async ({ shop, accessToken }) => {
  try {
    validateParams({ shop, accessToken })

    return await apiCaller({ shop, accessToken, endpoint: `collects/count.json` })
  } catch (error) {
    throw error
  }
}

const find = async ({ shop, accessToken, limit, pageInfo, order }) => {
  try {
    validateParams({ shop, accessToken })

    let _limit = limit ? (parseInt(limit) >= 0 ? parseInt(limit) : 20) : 20

    let endpoint = `collects.json?limit=${_limit}`
    if (pageInfo) {
      endpoint += `&page_info=${pageInfo}`
    } else {
      if (order) {
        endpoint += `&order=${order}`
      } else {
        endpoint += `&order=updated_at+desc`
      }
    }

    return await apiCaller({
      shop,
      accessToken,
      endpoint,
      pageInfo: true,
    })
  } catch (error) {
    throw error
  }
}

const create = async ({ shop, accessToken, data }) => {
  try {
    validateParams({ shop, accessToken })

    return await apiCaller({
      shop,
      accessToken,
      method: 'POST',
      endpoint: `collects.json`,
      data,
    })
  } catch (error) {
    throw error
  }
}

const findById = async ({ shop, accessToken, id }) => {
  try {
    validateParams({ shop, accessToken })

    return await apiCaller({
      shop,
      accessToken,
      endpoint: `collects/${id}.json`,
    })
  } catch (error) {
    throw error
  }
}

const _delete = async ({ shop, accessToken, id }) => {
  try {
    validateParams({ shop, accessToken })

    return await apiCaller({
      shop,
      accessToken,
      method: 'DELETE',
      endpoint: `collects/${id}.json`,
    })
  } catch (error) {
    throw error
  }
}

const CollectMiddleware = {
  count,
  find,
  findById,
  create,
  delete: _delete,
}

export default CollectMiddleware
