import Controller from './../../controller/collect.js'

export default function collectRoute(app) {
  app.get('/api/collects', Controller.find)
  app.get('/api/collects/:id', Controller.findById)
  app.get('/api/collects/count', Controller.count)
  app.delete('/api/collects/:id', Controller.delete)
}
