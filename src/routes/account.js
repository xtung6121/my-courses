const express = require('express')
const router = express.Router()

const accountController = require('~/controllers/UserController')

router.get('/account/login', accountController.login)
router.get('/account/signin', accountController.signin)

router.post('/account/create', accountController.create)
router.post('/account/checklogin', accountController.checkLogin)

module.exports = router