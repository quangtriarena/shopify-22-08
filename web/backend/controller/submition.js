import verifyToken from '../auth/verifyToken.js'
import ResponseHandler from '../helpers/responseHandler.js'
import CollectMiddleware from '../middlewares/collect.js'
import CollectionMiddleware from '../middlewares/collection.js'
import SmartCollectionMiddleware from '../middlewares/smart_collection.js'

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

      // let result = {
      //   custom_collection: {
      //     title: 'apples',
      //   },
      // }

      let result = {
        smart_collection: {
          id: 411390116064,
          order: {
            sort_order: 'alpha-desc',
          },
        },
      }

      // const data = await SmartCollectionMiddleware.findById({
      //   shop,
      //   accessToken,
      //   id: 411650523360,
      // })

      // const data = await CollectionMiddleware.getProducts({
      //   shop,
      //   accessToken,
      //   id: 411650523360,
      // })

      // const data = await SmartCollectionMiddleware.findById({
      //   shop,
      //   accessToken,
      //   id: 411650851040,
      //   // query: {
      //   //   sort_order: 'alpha-desc',
      //   // },
      // })

      const testData = {
        smart_collection: {
          rules: [
            {
              column: 'title',
              relation: 'starts_with',
              condition: 'sample',
            },
          ],
        },
      }

      const data = await SmartCollectionMiddleware.update({
        shop,
        accessToken,
        id: 411650851040,
        data: testData,
      })

      return ResponseHandler.success(res, data)
    } catch (error) {
      console.log('/api/submition error :>> ', error.message)
      return ResponseHandler.error(res, error)
    }
  },
}
