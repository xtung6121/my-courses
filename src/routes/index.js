const newsRouter = require('./news')
const meRouter = require('./me')
const buynickRouter = require('./payment')
const productsRouter = require('./products')
const siteRouter = require('./site')
const authRouter = require('./auth')

function route(app) {



  app.use('/products', productsRouter)
  app.use('/payment', buynickRouter)
  app.use('/', meRouter)
  app.use('/', newsRouter)
  app.use('/', siteRouter)

  //Auth Router
  app.use('/auth', authRouter)
}

module.exports = route;