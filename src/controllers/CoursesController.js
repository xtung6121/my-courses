// const Course = require('~/models/Course')
// const { mongooseToObject } = require('~/utils/mongoose')

// // async function getCourses() {

// //     const Courses = await Course.find({});
// //     return Courses;
// // }

// class CourseController {

//     //GET/ courses/:slug

//     show(req, res, next) {

//         Course.findOne({ slug: req.params.slug })
//             .then(course => {
//                 res.render('courses/show', { course: mongooseToObject(course) })
//             })
//             .catch(next)

//     }
//     //GET/ courses/create

//     create(req, res, next) {
//         res.render('courses/create')

//     }
//     //post/ courses/store
//     store(req, res, next) {
//         const course = new Course(req.body)
//         course.slug = req.body.name
//         course.save().then(() => res.redirect('/me/stored/courses'))
//             .catch(error => {
//                 res.render('Trùng Tên Khóa Học', error)
//             })


//     }
//     edit(req, res, next) {
//         Course.findById(req.params.id)
//             .then(course => res.render('courses/edit', {
//                 course: mongooseToObject(course)
//             }))
//             .catch(next)

//     }
//     update(req, res, next) {
//         Course.updateOne({ _id: req.params.id }, req.body)
//             .then(() => res.redirect('/me/stored/courses'))
//             .catch(next)
//     }
//     delete(req, res, next) {
//         Course.delete({ _id: req.params.id })
//             .then(() => res.redirect('/me/stored/courses'))
//             .catch(next)

//     }
//     forceDelete(req, res, next) {
//         Course.deleteOne({ _id: req.params.id })
//             .then(() => res.redirect('/me/stored/courses'))
//             .catch(next);
//     }

//     restore(req, res, next) {
//         Course.restore({ _id: req.params.id })
//             .then(() => res.redirect('/me/stored/courses'))
//             .catch(next);
//     }
//     handleFormActions(req, res, next) {
//         switch (req.body.action) {
//             case 'delete':
//                 Course.delete({ _id: { $in: req.body.courseIds } })
//                     .then(() => res.redirect('/me/stored/courses'))
//                     .catch(next)
//                 break
//             default:
//                 res.json({ message: 'Action is invalid ' })
//         }

//     }
//     // login(req, res, next) {
//     //    res.render('courses/login');
//     // }
// }

// module.exports = new CourseController()