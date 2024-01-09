const express = require('express')
const router = express.Router()

const newsController = require('~/controllers/NewsController')

router.get('/news/:slug', newsController.show)
router.get('/news', newsController.index)

module.exports = router