import apiCaller from '../helpers/apiCaller.js'
import validateParams from '../helpers/validateParams.js'

const count = async ({ shop, accessToken }) => {
  try {
    validateParams({ shop, accessToken })

    return await apiCaller({
      shop,
      accessToken,
      endpoint: 'smart_collections/count.json',
    })
  } catch (error) {
    throw error
  }
}

const find = async ({ shop, accessToken, limit, pageInfo, order }) => {
  try {
    validateParams({ shop, accessToken })

    let _limit = limit ? (parseInt(limit) >= 0 ? parseInt(limit) : 20) : 20

    let endpoint = `smart_collections.json?limit=${_limit}`

    if (pageInfo) {
      endpoint += `&page_info=${pageInfo}`
    } else {
      if (order) {
        endpoint += `&order=${order}`
      } else {
        endpoint += `&order=updated_at+desc`
      }
    }

    return apiCaller({
      shop,
      accessToken,
      endpoint,
    })
  } catch (error) {
    throw error
  }
}

const SmartCollectionMiddleware = {
  count,
  find,
}

export default SmartCollectionMiddleware
