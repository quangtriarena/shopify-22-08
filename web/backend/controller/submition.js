import verifyToken from '../auth/verifyToken.js'
import ResponseHandler from '../helpers/responseHandler.js'
import ArticleMiddleware from '../middlewares/article.js'
import BlogMiddleware from '../middlewares/blog.js'
import CollectMiddleware from '../middlewares/collect.js'
import CollectionMiddleware from '../middlewares/collection.js'
import ProductGraphMiddleware from '../middlewares/graphQl/product.js'
import MetafieldMiddleware from '../middlewares/metafield.js'
import ProductMiddleware from '../middlewares/product.js'
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

      // const testData = {
      //   smart_collection: {
      //     rules: [
      //       {
      //         column: 'title',
      //         relation: 'starts_with',
      //         condition: 'sample',
      //       },
      //     ],
      //   },
      // }

      // const data = await SmartCollectionMiddleware.update({
      //   shop,
      //   accessToken,
      //   id: 411650851040,
      //   data: testData,
      // })

      // 43292155248864

      // const data = await ProductMiddleware.findById({
      //   shop,
      //   accessToken,
      //   id: 7794631868640,
      // })

      // const data = await MetafieldMiddleware.create({
      //   shop,
      //   accessToken,
      //   resource: `products/7798150660320/`,
      //   data: {
      //     metafield: {
      //       namespace: 'inventory2',
      //       key: 'ware_house',
      //       value: 30,
      //       // type: 'number_integer',
      //       type: 'json',
      //     },
      //   },
      // })

      // const data = await MetafieldMiddleware.findById({
      //   shop,
      //   accessToken,
      //   resource: `products/7794631868640/`,
      //   metafield_id: 23272206762208,
      // })

      // const data = await MetafieldMiddleware.create({
      //   shop,
      //   accessToken,
      //   resource: `customers/6406226575584/`,
      //   data: {
      //     metafield: {
      //       namespace: 'name_2',
      //       key: 'custom_name',
      //       value: 'luu quang tri',
      //       type: 'multi_line_text_field',
      //     },
      //   },
      // })

      // const data = await MetafieldMiddleware.find({
      //   shop,
      //   accessToken,
      //   resource: ``,
      // })

      // const data = await MetafieldMiddleware.create({
      //   shop,
      //   accessToken,
      //   resource: ``,
      //   data: {
      //     metafield: {
      //       namespace: 'inventory_shop',
      //       key: 'inventory',
      //       value: 'shop',
      //       type: 'multi_line_text_field',
      //     },
      //   },
      // })

      // const data = await MetafieldMiddleware.find({
      //   shop,
      //   accessToken,
      //   resource: 'products/7794618597600/',
      // })

      // const data = await MetafieldMiddleware.delete({
      //   shop,
      //   accessToken,
      //   // resource: 'products/7794618597600/',
      //   metafield_id: 23276298567904,
      // })

      // 23272206762208

      // const data = await MetafieldMiddleware.update({
      //   shop,
      //   accessToken,
      //   resource: 'products/7794631868640/',
      //   metafield_id: 23272206762208,
      //   data: {
      //     metafield: {
      //       product_id: 7794631868640,
      //       id: 23272206762208,
      //       value: 12,
      //       type: 'number_integer',
      //     },
      //   },
      // })

      // const data = await MetafieldMiddleware.findById({
      //   shop,
      //   accessToken,
      //   resource: 'products/7794631868640/',
      //   metafield_id: 23272206762208,
      // })

      // const data = await ArticleMiddleware.count({
      //   shop,
      //   accessToken,
      // })

      // const data = await BlogMiddleware.find({
      //   shop,
      //   accessToken,
      // })

      // const data = await ArticleMiddleware.create({
      //   shop,
      //   accessToken,
      //   blog_id: 88095817952,
      //   data: {
      //     article: {
      //       title: 'My new Article title',
      //       author: 'John Smith',
      //       tags: 'This Post, Has Been Tagged',
      //       body_html: `<h1>I like articles</h1>\n<p><strong>Yea</strong>, I like posting them through <span class:\"caps\">REST</span>.</p>`,
      //       published_at: 'Thu Mar 24 15:45:47 UTC 2011',
      //     },
      //   },
      // })

      // const data = await ArticleMiddleware.find({
      //   shop,
      //   accessToken,
      //   blog_id: 88095817952,
      // })

      // const data = await BlogMiddleware.find({
      //   shop,
      //   accessToken,
      // })

      // const data = await ArticleMiddleware.findById({
      //   shop,
      //   accessToken,
      //   blog_id: 88095817952,
      //   article_id: 587957731552,
      // })

      const data = await ProductGraphMiddleware.find({
        shop,
        accessToken,
        query: `{
          products(first: 10, reverse: true){
            edges {
              node {
                
              }
            }
          }
        }`,
      })

      return ResponseHandler.success(res, data)
    } catch (error) {
      console.log('/api/submition error :>> ', error.message)
      return ResponseHandler.error(res, error)
    }
  },
}
