import Controller from '../../controller/customer.js'

export default function customerRoute(app) {
  app.get('/api/customers/count', Controller.count)
  app.get('/api/customers', Controller.find)
  app.get('/api/customers/:id', Controller.findById)
  app.post('/api/customers', Controller.create)
  app.put('/api/customers/:id', Controller.update)
  app.delete('/api/customers/:id', Controller.delete)
}
