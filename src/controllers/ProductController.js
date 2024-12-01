const { validationResult, body } = require('express-validator')
const Course = require('~/models/Course')
const { mongooseToObject } = require('~/utils/mongoose')


class ProductController {

  //GET/ products/:slug

  show(req, res, next) {
    Course.findOne({ slug: req.params.slug })
      .then(product => {
        res.render('courses/show', { product: mongooseToObject(product) })
      })
      .catch(next)
  }
  // [GET]/courses/create
  create(req, res, next) {
    res.render('courses/create')
  }
  // [POST]/products/store
  store(req, res, next) {
    const product = new Course(req.body)
    product.slug = req.body.title
    product.save()
      .then(res.redirect('/me/stored-courses'))
      .catch(next)

    res.send("Save!")
  }
  // [GET]/products/:id/edit
  edit(req, res, next) {
    Course.findById(req.params.id)
      .then(product =>
        res.render('courses/edit',
          { product: mongooseToObject(product) }))
      .catch(next)
  }

  // [PUT]/products/:id
  update(req, res, next) {
    Course.updateOne({ _id: req.params.id }, req.body)
      .then(res.redirect('/me/stored/courses'))
      .catch(next)
  }
  delete(req, res, next) {
    Course.deleteOne({ _id: req.params.id })
      .then(res.redirect('back'))
      .catch(next)
  }
}
module.exports = new ProductController();