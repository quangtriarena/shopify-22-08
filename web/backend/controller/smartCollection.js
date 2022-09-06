import verifyToken from '../auth/verifyToken.js'
import ResponseHandler from '../helpers/responseHandler.js'
import SmartCollectionMiddleware from '../middlewares/smart_collection.js'

export default {
  count: async (req, res) => {
    try {
      const session = await verifyToken(req, res)
      const { shop, accessToken } = session

      let data = await SmartCollectionMiddleware.count({ shop, accessToken })

      ResponseHandler.success(res, data)
    } catch (error) {
      ResponseHandler.error(res, error)
    }
  },

  find: async (req, res) => {
    try {
      const session = await verifyToken(req, res)
      const { shop, accessToken } = session

      let data = await SmartCollectionMiddleware.find(...req.query, shop, accessToken)

      return ResponseHandler.success(res, data)
    } catch (error) {
      return ResponseHandler.error(res, error)
    }
  },

  findById: async (req, res) => {
    try {
      const session = await verifyToken(req, res)
      const { shop, accessToken } = session

      const { id } = req.params

      let data = await SmartCollectionMiddleware.findById(shop, accessToken, id)

      return ResponseHandler.success(res, data)
    } catch (error) {
      return ResponseHandler.error(res, error)
    }
  },
}
