const Course = require('~/models/Course')
const { mutipleMongooseToObject } = require('~/utils/mongoose')

class MeController {

  // [GET] /me/stored/courses
  storedCourses(req, res, next) {
    Promise.all([Course.find({}), Course.countDocumentsDeleted()])
      .then(([product, deletedCount]) =>
        res.render('me/stored-courses', {
          deletedCount,
          product: mutipleMongooseToObject(product)
        })
      )
      .catch(next)
  }
  trashCourses(req, res, next) {
    Course.findDeleted({})
      .then(product => res.render('me/trash-courses', {
        product: mutipleMongooseToObject(product)
      }))
      .catch(next)
  }
}

module.exports = new MeController()