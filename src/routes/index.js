const newsRouter = require('./news')
const meRouter = require('./me')
const coursesRouter = require('./courses')
const siteRouter = require('./site')
const accountRouter = require('./account')

function route(app) {

  app.use('/', newsRouter)
  app.use('/', meRouter)
  app.use('/', coursesRouter)
  //app.use('/', accountRouter)


  app.use('/', siteRouter)
  app.use('/', accountRouter)

}

module.exports = route