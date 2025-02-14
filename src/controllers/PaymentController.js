const { mutipleMongooseToObject } = require('~/utils/mongoose');
const Course = require('~/models/Course');


class PaymentController {
    // index(req, res, next) {
    //     res.render('payment')
    // }

    payment(req, res) {
        res.render('courses/payment')
    }
}

module.exports = new PaymentController