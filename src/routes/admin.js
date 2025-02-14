const express = require('express')
const router = express.Router()
const adminController = require('~/controllers/AdminController').default
const { check, body } = require('express-validator');
const isAuth = require('~/middlewares/IsAuth')



router.get('/add-products', isAuth, adminController.getAddProduct)



module.exports = router