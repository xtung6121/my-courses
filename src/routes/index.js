const newsRouter = require('./news')
const meRouter = require('./me')
const productsRouter = require('./products')
const siteRouter = require('./site')
const authRouter = require('./auth')
const errorRouter = require('./error')
const adminRouter = require('./admin')
const paymentRouter = require('./payment')
const isAuth = require('~/middlewares/IsAuth')

function route(app) {
  app.use('/products', isAuth, productsRouter)
  // app.use('/admin', isAuth, adminRouter)
  app.use('/', newsRouter)

  // Thay vì admin, meRouter đóng vai trò là trang quản lý
  app.use('/', meRouter)
  app.use('/', siteRouter)
  app.use('/', errorRouter)
  app.use('/', paymentRouter)

  //Auth Router
  app.use('/auth', authRouter)
}

module.exports = route;