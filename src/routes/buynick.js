const express = require('express')
const router = express.Router()

const buynickController = require('~/controllers/BuyNickController')

router.get('/:slug/payment', buynickController.payment)
router.get('/', buynickController.index)

module.exports = router