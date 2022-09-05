import Controller from '../../controller/smartCollection.js'

export default function SmartCollectionRoute(app) {
  app.get('/api/smart_collections/count', Controller.count)
  app.get('/api/smart_collections', Controller.find)
}
