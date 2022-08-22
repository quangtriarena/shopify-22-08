import verifyToken from '../auth/verifyToken.js'
import ResponseHandler from '../helpers/responseHandler.js'
import ProductMiddleware from '../middlewares/product.js'

export default {
  submit: async (req, res) => {
    console.log('----------------------------------------')
    console.log('/api/submition')
    console.log('----------------------------------------')
    try {
      const session = await verifyToken(req, res)
      const { shop, accessToken } = session

      let result = {
        product: {
          title: 'Burton Custom Freestyle 151',
          body_html: '<strong>Good snowboard!</strong>',
          vendor: 'Burton',
          product_type: 'Snowboard',
          tags: ['Barnes & Noble', 'Big Air', "John's Fav"],
        },
      }

      const data = await ProductMiddleware.create({
        shop,
        accessToken,
        data: result,
      })

      return ResponseHandler.success(res, data)
    } catch (error) {
      console.log('/api/submition error :>> ', error.message)
      return ResponseHandler.error(res, error)
    }
  },
}
