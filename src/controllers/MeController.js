const Course = require('~/models/Course')
const { mutipleMongooseToObject } = require ('~/utils/mongoose')

class MeController {

  // [GET] /me/stored/courses
  storedCourses(req, res, next) {
    Promise.all([Course.find({}), Course.countDocumentsDeleted()])
      .then(([courses, deletedCount]) =>
        res.render('me/stored-courses', {
          deletedCount,
          courses: mutipleMongooseToObject(courses)
        })
      )
      .catch(next)
  }
  trashCourses(req, res, next) {
    Course.findDeleted({})
      .then(courses => res.render('me/trash-courses', {
        courses: mutipleMongooseToObject(courses)
      }))
      .catch(next)
  }
}

module.exports = new MeController()