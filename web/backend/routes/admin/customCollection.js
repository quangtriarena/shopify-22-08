import Controller from '../../controller/customCollection.js'

export default function customCollectionRoute(app) {
  app.get('/api/custom_collections/count', Controller.count)
  app.get('/api/custom_collections', Controller.find)
  app.get('/api/custom_collections/:id', Controller.findById)
  app.post('/api/custom_collections', Controller.create)
  app.put('/api/custom_collections/:id', Controller.update)
  app.delete('/api/custom_collections/:id', Controller.delete)
}
