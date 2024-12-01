const newsRouter = require('./news')
const meRouter = require('./me')
const buynickRouter = require('./payment')
const productsRouter = require('./products')
const siteRouter = require('./site')

function route(app) {

  app.use('/payment', buynickRouter)
  app.use('/products', productsRouter)
  app.use('/', newsRouter)
  app.use('/', meRouter)
  app.use('/', siteRouter)
}

module.exports = route;