const { validationResult, body } = require('express-validator')
const Course = require('~/models/Course')
const { mongooseToObject } = require('~/utils/mongoose')


class ProductController {

  get500(req, res, next) {
    res.status(500).render('500', {
      pageTitle: 'Server Error',
      path: '/500',
      isAuthenticated: req.session.isLoggedIn,
    });
  }

  //GET/ products/:slug
  show(req, res, next) {
    Course.findOne({ slug: req.params.slug })
      .then(product => {
        res.render('courses/show', {
          product: mongooseToObject(product),
          isAuthenticated: req.session.isLoggedIn
        })
      })
      .catch(next)
  }
  // [GET]/courses/create
  create(req, res, next) {
    res.render('courses/create', {
      isAuthenticated: req.session.isLoggedIn
    })

  }
  // [POST]/products/store
  store(req, res, next) {
    const product = new Course(req.body)
    product.slug = req.body.title
    product
      .save()
      .then(() => res.redirect('/me/stored/courses', {
        isAuthenticated: req.session.isLoggedIn
      }))
      .catch(next)
  }
  // [GET]/products/:id/edit
  edit(req, res, next) {
    Course.findById(req.params.id)
      .then(product =>
        res.render('courses/edit',
          {
            product: mongooseToObject(product),
            isAuthenticated: req.session.isLoggedIn
          }))
      .catch(next)
  }

  // [PUT]/products/:id
  update(req, res, next) {
    Course.updateOne({ _id: req.params.id }, req.body)
      .then(res.redirect('/me/stored/courses',
        {
          isAuthenticated: req.session.isLoggedIn
        }
      ))
      .catch(next)
  }
  delete(req, res, next) {
    Course.delete({ _id: req.params.id })
      .then(res.redirect('back'))
      .catch(next)
  }
  forceDelete(req, res, next) {
    Course.deleteOne({ _id: req.params.id })
      .then(res.redirect('back'))
      .catch(next)
  }

  // [PATCH] /products/:id/restore
  restore(req, res, next) {
    Course.restore({ _id: req.params.id })
      .then(res.redirect('back'))
      .catch(next)
  }


  // [POST] /products/handle-form-actions
  handerFormActions(req, res, next) {
    switch (req.body.action) {
      case 'delete':
        Course.delete({ _id: { $in: req.body.productIds } })
          .then(res.redirect('back'))
          .catch(next)

      case 'forceDelete':
        Course.deleteMany({ _id: { $in: req.body.productIds } })
          .then(() => {
            res.redirect("/me/trash/courses");
          })
          .catch(next);
        break;
      case "recover":
        Course.restore({ _id: { $in: req.body.productIds } })
          .then(() => {
            res.redirect("/me/trash/courses");
          })
          .catch(next);
        break;

      default:
        res.json({ message: 'Action is invalid!' })
    }
  }


}
module.exports = new ProductController();