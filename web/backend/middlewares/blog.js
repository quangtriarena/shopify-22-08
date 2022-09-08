import apiCaller from '../helpers/apiCaller.js'
import validateParams from '../helpers/validateParams.js'

const BlogMiddleware = {
  async count({ shop, accessToken }) {
    try {
      validateParams({ shop, accessToken })

      return apiCaller({
        shop,
        accessToken,
        endpoint: `blogs/count.json`,
      })
    } catch (error) {
      throw error
    }
  },

  async find({ shop, accessToken, limit, pageInfo, order }) {
    try {
      validateParams({ shop, accessToken })

      let _limit = limit ? (parseInt(limit) >= 0 ? parseInt(limit) : 20) : 20

      let endpoint = `blogs.json?limit=${_limit}`

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
  },

  async findById({ shop, accessToken, blog_id }) {
    try {
      validateParams({ shop, accessToken })

      return await apiCaller({
        shop,
        accessToken,
        endpoint: `blogs/${blog_id}.json`,
      })
    } catch (error) {
      throw error
    }
  },

  async create({ shop, accessToken, data }) {
    try {
      validateParams({ shop, accessToken })

      return await apiCaller({
        shop,
        accessToken,
        method: 'POST',
        endpoint: `blogs.json`,
        data,
      })
    } catch (error) {
      throw error
    }
  },

  async update({ shop, accessToken, blog_id, data }) {
    try {
      validateParams({ shop, accessToken })

      return await apiCaller({
        shop,
        accessToken,
        method: 'PUT',
        endpoint: `blogs/${blog_id}.json`,
        data,
      })
    } catch (error) {
      throw error
    }
  },

  async delete({ shop, accessToken, blog_id }) {
    try {
      validateParams({ shop, accessToken })

      return await apiCaller({
        shop,
        accessToken,
        method: 'DELETE',
        endpoint: `blogs/${blog_id}.json`,
      })
    } catch (error) {
      throw error
    }
  },
}

export default BlogMiddleware
