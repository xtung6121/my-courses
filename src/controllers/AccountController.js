const Course = require('../models/Course')
// const { mongooseToObject } = require('../../util/mongoose')
const Account = require('../models/Account')
const { mutipleMongooseToObject } = require ('~/utils/mongoose')

// async function getCourses() {

//     const Courses = await Course.find({})
//     return Courses;
// }

class AccountController {

  //GET/ courses/:slug

  // show(req, res, next) {

  //     Course.findOne({ slug: req.params.slug })
  //         .then(course => {
  //             res.render('courses/show', { course: mongooseToObject(course) });
  //         })
  //         .catch(next);

  // }
  // //GET/ courses/create

  // create(req, res, next) {
  //     res.render('courses/create');

  // }
  // //post/ courses/store
  // store(req, res, next) {
  //     const course = new Course(req.body);
  //     course.slug = req.body.name;
  //     course.save().then(() => res.redirect('/me/stored/courses'))
  //         .catch(error => {
  //             res.render("Trùng Tên Khóa Học");
  //         });


  // }
  // edit(req, res, next) {
  //     Course.findById(req.params.id)
  //         .then(course => res.render('courses/edit', {
  //             course: mongooseToObject(course)
  //         }))
  //         .catch(next);

  // }
  // update(req, res, next) {
  //     Course.updateOne({ _id: req.params.id }, req.body)
  //         .then(() => res.redirect('/me/stored/courses'))
  //         .catch(next);
  // }
  // delete(req, res, next) {
  //     Course.delete({ _id: req.params.id })
  //         .then(() => res.redirect('/me/stored/courses'))
  //         .catch(next);

  // }
  // forceDelete(req, res, next) {
  //     Course.deleteOne({ _id: req.params.id })
  //     .then(() => res.redirect('/me/stored/courses'))
  //     .catch(next);
  // }

  // restore(req, res, next) {
  //     Course.restore({ _id: req.params.id })
  //     .then(() => res.redirect('/me/stored/courses'))
  //     .catch(next);
  // }
  // handleFormActions(req, res, next) {
  //     switch(req.body.action) {
  //         case 'delete':
  //             Course.delete({ _id: { $in: req.body.courseIds} })
  //             .then(() => res.redirect('/me/stored/courses'))
  //             .catch(next); 
  //             break;
  //             default:
  //                 res.json({ message: 'Action is invalib '})   
  //     }

  // }
  login(req, res, next) {
    res.render('login')
  }

  checkLogin(req, res, next) {
    const account = new Account(req.body)
    Account.findOne({ username: account.username, password: account.password })
      .then(user => {
        if (user) {
          if (user.type == '0') {
            Course.find({ price:'false' })
              .then(courses => {
                res.render('home', {
                  courses: mutipleMongooseToObject(courses)
                })
              })
              .catch(next)
          } else {
            Course.find({})
              .then(courses => {
                res.render('home', {
                  courses: mutipleMongooseToObject(courses)
                })
              })
              .catch(next)
          }
        }
        else {
          res.render('login')
        }
      })
      .catch(next)
  }
  signin(req, res, next) {
    res.render('signin')

  }
  create(req, res, next) {
    const account = new Account (req.body)
    account.type = '0'
    console.log(account)
    account.save().then(() => {
      // eslint-disable-next-line no-undef
      alert('Oops! Something went wrong.')
      res.render('login')
    })
  }
}

module.exports = new AccountController()