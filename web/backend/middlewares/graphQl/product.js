import graphqlCaller from '../../helpers/graphCalller.js'
import validateParams from '../../helpers/validateParams.js'

const ProductGraphMiddleware = {
  async find({ shop, accessToken, query }) {
    try {
      validateParams({ shop, accessToken })

      return await graphqlCaller({
        shop,
        accessToken,
        query,
      })
    } catch (error) {
      throw error
    }
  },
}

export default ProductGraphMiddleware
