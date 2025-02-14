const { mutipleMongooseToObject } = require('~/utils/mongoose');
const Course = require('~/models/Course');


class AdminController {
    getAddProduct(req, res) {
        res.render('search')
    }
}

export default new AdminController