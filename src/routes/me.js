const express = require('express')
const router = express.Router()

const meController = require('~/controllers/MeController')

router.get('/me/stored/courses', meController.storedCourses)
router.get('/me/trash/courses', meController.trashCourses)

module.exports = router