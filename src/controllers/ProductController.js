const Course = require('~/models/Course')
const { mongooseToObject } = require('~/utils/mongoose')


class ProductController {

  //GET/ courses/:slug

  show(req, res, next) {

    Course.findOne({ slug: req.params.slug })
      .then(product => {
        res.render('courses/show', { course: mongooseToObject(product) })
      })
      .catch(next)
  }
  //GET/ courses/create
  create(req, res, next) {
    res.render('courses/create')
  }
}  

module.exports = new ProductController();