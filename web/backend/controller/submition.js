import verifyToken from '../auth/verifyToken.js'
import ResponseHandler from '../helpers/responseHandler.js'
import CustomerMiddleware from '../middlewares/customer/customer.js'
import CustomCollectionMiddleware from '../middlewares/custom_collection.js'

export default {
  submit: async (req, res) => {
    console.log('----------------------------------------')
    console.log('/api/submition')
    console.log('----------------------------------------')
    try {
      const session = await verifyToken(req, res)
      const { shop, accessToken } = session

      // let result = {
      //   product: {
      //     title: 'Burton Custom Freestyle 151',
      //     body_html: '<strong>Good snowboard!</strong>',
      //     vendor: 'Burton',
      //     product_type: 'Snowboard',
      //     tags: ['Barnes & Noble', 'Big Air', "John's Fav"],
      //   },
      // }

      // let result = {
      //   customer: {
      //     first_name: 'Steve',
      //     last_name: 'Lastnameson',
      //     email: 'steve.lastnameson@example.com',
      //     phone: '+15142546011',
      //     verified_email: true,
      //     addresses: [
      //       {
      //         address1: '123 Oak St',
      //         city: 'Ottawa',
      //         province: 'ON',
      //         phone: '555-1212',
      //         zip: '123 ABC',
      //         last_name: 'Lastnameson',
      //         first_name: 'Mother',
      //         country: 'CA',
      //       },
      //     ],
      //   },
      // }

      let result = {
        custom_collection: {
          title: 'apples',
        },
      }

      const data = await CustomCollectionMiddleware.find({
        shop,
        accessToken,
      })

      return ResponseHandler.success(res, data)
    } catch (error) {
      console.log('/api/submition error :>> ', error.message)
      return ResponseHandler.error(res, error)
    }
  },
}
