const { mutipleMongooseToObject } = require('~/utils/mongoose');
const Course = require('~/models/Course');

class SiteController {
    index(req, res, next) {
     Course.find({})  
     .then(product => {
        res.render('home', {
          product: mutipleMongooseToObject(product)
        })
     })
      .catch(next)
    }

    search(req, res) {
      res.render('search')
    }
}

module.exports = new SiteController