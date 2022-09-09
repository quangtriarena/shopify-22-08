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

const find = async ({ shop, accessToken, limit, pageInfo, order, blog_id }) => {
  try {
    validateParams({ shop, accessToken })

    let _limit = limit ? (parseInt(limit) > 0 ? parseInt(limit) : 20) : 20
    let endpoint = `blogs/${blog_id}/articles.json?${_limit}`

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

const findAllAuthors = async ({ shop, accessToken }) => {
  try {
    validateParams({ shop, accessToken })

    return await apiCaller({
      shop,
      accessToken,
      endpoint: `articles/authors.json`,
    })
  } catch (error) {
    throw error
  }
}

const findAllTags = async ({ shop, accessToken }) => {
  try {
    validateParams({ shop, accessToken })

    return await apiCaller({
      shop,
      accessToken,
      endpoint: `articles/tags.json`,
    })
  } catch (error) {
    throw error
  }
}

const findSpecialTags = async ({ shop, accessToken, blog_id }) => {
  try {
    validateParams({ shop, accessToken })

    return await apiCaller({
      shop,
      accessToken,
      endpoint: `blogs/${blog_id}/articles/tags.json`,
    })
  } catch (error) {
    throw error
  }
}

const findById = async ({ shop, accessToken, blog_id, article_id }) => {
  try {
    validateParams({ shop, accessToken })

    return await apiCaller({
      shop,
      accessToken,
      endpoint: `blogs/${blog_id}/articles/${article_id}.json`,
    })
  } catch (error) {
    throw error
  }
}

const create = async ({ shop, accessToken, blog_id, data }) => {
  try {
    validateParams({ shop, accessToken })

    return apiCaller({
      shop,
      accessToken,
      method: 'POST',
      endpoint: `blogs/${blog_id}/articles.json`,
      data,
    })
  } catch (error) {
    throw error
  }
}

const update = async ({ shop, accessToken, blog_id, article_id, data }) => {
  try {
    validateParams({ shop, accessToken })

    return await apiCaller({
      shop,
      accessToken,
      method: 'PUT',
      endpoint: `blogs/${blog_id}/articles/${article_id}.json`,
      data,
    })
  } catch (error) {
    throw error
  }
}

const _delete = async ({ shop, accessToken, blog_id, article_id }) => {
  try {
    validateParams({ shop, accessToken })

    return await apiCaller({
      shop,
      accessToken,
      method: 'DELETE',
      endpoint: `blogs/${blog_id}/articles/${article_id}.json`,
    })
  } catch (error) {
    throw error
  }
}

const ArticleMiddleware = {
  count,
  create,
  find,
  findById,
  findAllAuthors,
  findAllTags,
  findSpecialTags,
  update,
  delete: _delete,
}

export default ArticleMiddleware
