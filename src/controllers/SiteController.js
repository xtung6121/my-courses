const Course = require('../models/Course')
const { mutipleMongooseToObject } = require ('~/utils/mongoose')

// async function getCourses() {

//     const Courses = await Course.find({});
//     return Courses;
// }

class SiteController {

  //GET/
  index(req, res, next) {
    Course.find({})
      .then(courses => {
        res.render('home', {
          courses: mutipleMongooseToObject(courses)
        })
      })
      .catch(next)

    // getCourses().then(function (courses) {

    //     res.json(courses);
    // });
  }

  // [GET] /search
  search(req, res) {
    res.render('search')
  }

}

module.exports = new SiteController