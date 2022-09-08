import apiCaller from '../helpers/apiCaller.js'
import validateParams from '../helpers/validateParams.js'

const count = async ({ shop, accessToken, blog_id }) => {
  try {
    validateParams({ shop, accessToken })

    return await apiCaller({
      shop,
      accessToken,
      endpoint: `blogs/${blog_id || ''}articles/count.json`,
    })
  } catch (error) {
    throw error
  }
}

const create = async ({ shop, accessToken }) => {
  try {
  } catch (error) {
    throw error
  }
}

const ArticleMiddleware = {
  count,
}

export default ArticleMiddleware
