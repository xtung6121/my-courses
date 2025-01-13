const express = require('express')
const router = express.Router()
const errorController = require('~/controllers/ErrorController')

router.get('/500', errorController.get500)
router.get('/400', errorController.get404)


module.exports = router