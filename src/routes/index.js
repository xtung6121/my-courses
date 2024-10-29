const newsRouter = require('./news')
const meRouter = require('./me')
// const coursesRouter = require('./courses')
const buynickRouter = require('./buynick')
const userRouter = require('./auth')

const productsRouter = require('./products')
const siteRouter = require('./site')

function route(app) { 

  app.use('/login', userRouter)
  app.use('/payment', buynickRouter)
  app.use('/', newsRouter)
  app.use('/', meRouter)
  app.use('/products', productsRouter)

  app.use('/', siteRouter)
}

module.exports = route;