const User = require('~/models/User');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const { validationResult } = require('express-validator');


class UserController {
  getLogin(req, res) {
    // let message =  {};
    // // Workaround to solve issue of user message div being rendered even if no error, since otherwise errorMessage holds an empty array (truthy)
    // message.length > 0 ? (message = message[0]) : (message = null);
  
    res.render('auth/login', {
      pageTitle: 'Log In',
      // Only set if there was an error (no user with email/password) from login POST request. Whatever was stored under key 'error' is retrieved and stored in errorMessage, and then this info is removed from session
      oldInput: {
        email: '',
        password: '',
      },
      validationErrors: [],
    });
  }
}


module.exports = new UserController();