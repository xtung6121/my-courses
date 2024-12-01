const express = require('express')
const { check, body } = require('express-validator');
const router = express.Router()
const User = require('~/models/User');
const userController = require('~/controllers/UserController');

// router.get('/acc/sigup', userController.getSignup);
router.get('/', userController.getLogin);
router.post('/',
    [
        // Look for specific field but in request body only (unlike check, which looks in all features of incoming request [header, cookie, param, etc.])
        body('email')
          .isEmail()
          .withMessage('Please enter a valid email.')
          // validator.js built-in sanitizer (trims whitespace on sides of email, converts email to lowercase)
          .normalizeEmail(),
        body('password', 'Password must be valid.').isLength({ min: 8, max: 100 }),
      ],
    userController.postLogin);

module.exports = router;