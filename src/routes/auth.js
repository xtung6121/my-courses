const express = require('express')
const router = express.Router()
const authController = require('~/controllers/AuthController')
const UserSession = require('~/middlewares/GetUser')

// Get User Middleware
// router.use(UserSession)

//Logout
router.get("/logout", authController.LogOut)


//Middleware về trang chủ nếu đã đăng nhập
router.use((req, res, next) => {
  if (req.user != null && req.userInfo != null) {
    return res.redirect('/')
  }
  else {
    return next();
  }
})

//Các controllers
// router.get("/forget", authController.ForgetPassView)
router.post('/login', authController.Login)
router.post("/register", authController.Register)
router.get('/login', authController.LoginView)
router.get('/register', authController.RegisterView)
module.exports = router