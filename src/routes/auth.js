const express = require('express')
const router = express.Router()
const authController = require('~/controllers/AuthController').default
const { check, body } = require('express-validator');
import User from "~/models/User/User";

//Middleware về trang chủ nếu đã đăng nhập
router.use((req, res, next) => {
  if (req.user != null) {
    return res.redirect('/')
  }
  else {
    return next();
  }
})

//Các controllers

router.post('logout', authController.Logout)

// router.get("/forget", authController.ForgetPassView)
router.post('/login', [
  // Look for specific field but in request body only (unlike check, which looks in all features of incoming request [header, cookie, param, etc.])
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email.')
    // validator.js built-in sanitizer (trims whitespace on sides of email, converts email to lowercase)
    .normalizeEmail(),
  body('password', 'Password must be valid.').isLength({ min: 8, max: 100 }),
],
  authController.postLogin)

router.post('/register', // Wrapping checks in array is not required but makes it clearer that this block is about validation
  [
    check('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      // Method found in validator.js docs. validator.js implicitly installed with express-validator
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject('Email already in use.');
          }
        });
      })
      .normalizeEmail(),
    // Adding validation error message as second argument as alternative to using withMessage() after each validator since using message for both checks
    body(
      'password',
      'Please use a password between 8 and 100 characters.'
    ).isLength({ min: 8, max: 100 }),
    body('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match.');
      }
      return true;
    }),
  ],
  authController.postRegister)

router.get('/login', authController.LoginView)
router.get('/register', authController.RegisterView)
router.get('/reset-password', authController.getResetPassword);
router.post('/reset-password', authController.postResetPassword);
module.exports = router