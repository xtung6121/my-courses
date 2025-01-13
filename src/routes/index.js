const newsRouter = require('./news')
const meRouter = require('./me')
const productsRouter = require('./products')
const siteRouter = require('./site')
const authRouter = require('./auth')
const errorRouter = require('./error')

function route(app) {



  app.use('/products', productsRouter)
  app.use('/', meRouter)
  app.use('/', newsRouter)
  app.use('/', siteRouter)
  app.use('/', errorRouter)

  //Auth Router
  app.use('/auth', authRouter)
}

module.exports = route;