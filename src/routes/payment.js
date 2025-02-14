const express = require('express')
const router = express.Router()

const PaymentController = require('~/controllers/PaymentController')

// router.get('/payment/:id', PaymentController.getProduct)
router.get('/payment', PaymentController.payment)

module.exports = router