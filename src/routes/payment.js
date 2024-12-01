const express = require('express')
const router = express.Router()

const buynickController = require('~/controllers/BuyNickController')

router.get('/payment/:id', buynickController.getProduct)
router.get('/payment', buynickController.payment)
router.get('/', buynickController.index)

module.exports = router