const User = require('~/models/User');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const { validationResult } = require('express-validator');
const session = require('express-session');


class UserController {
  getLogin(req, res) {
    res.render('auth/login', {
      pageTitle: 'Log In',
      // Only set if there was an error (no user with email/password) from login POST request. Whatever was stored under key 'error' is retrieved and stored in errorMessage, and then this info is removed from session
      // errorMessage: message,
      oldInput: {
        email: '',
        password: '',
      },
      validationErrors: [],
    });
  }

  getSignup(req, res) {
    res.render('auth/signup', {
      pageTitle: 'Sign Up',
      oldInput: {
        email: '',
        password: '',
        confirmPassword: '',
      },
      validationErrors: [],
    });
  }

  postLogin(req, res) {
    const { email, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).render('auth/login', {
        path: '/login',
        pageTitle: 'Log In',
        errorMessage: errors.array()[0].msg,
        oldInput: {
          email,
          password,
        },
        validationErrors: errors.array(),
      });
    }

    User.findOne({ email })
      .then((user) => {
        if (!user) {
          return res.status(422).render('auth/login', {
            path: '/login',
            pageTitle: 'Log In',
            errorMessage: 'Invalid email or password.',
            oldInput: {
              email,
              password,
            },
            validationErrors: [],
          });
        }
        // Validate password. bcrypt can compare password to hashed value, and can determine whether hashed value makes sense, taking into account hashing algorithm used. So if it were hashed, could it result in hashed password?
        bcrypt
          .compare(password, user.password)
          // Will make it into then block regardless of whether passwords match. Result will be a boolean that is true if passwords are equal, false otherwise
          .then((doMatch) => {
            if (doMatch) {
              req.session.isLoggedIn = true;
              req.session.user = user;
              return req.session.save((err) => {
                if (err) {
                  console.log(err);
                }
                res.redirect('/');
              });
            }
            return res.status(422).render('auth/login', {
              path: '/login',
              pageTitle: 'Log In',
              errorMessage: 'Invalid email or password.',
              oldInput: {
                email,
                password,
              },
              validationErrors: [],
            });
          })
          .catch((err) => {
            console.log(err);
            res.redirect('/login');
          });
      })
      .catch((err) => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
      });
  }
}


module.exports = new UserController();