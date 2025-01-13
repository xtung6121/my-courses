import User, { findOne } from "~/models/User/User";
import { validationResult } from 'express-validator';
import { compare, hash } from 'bcryptjs';
const bcrypt = require('bcryptjs');

class AuthController {

    LoginView(req, res, next) {
        let message = req.flash('error');
        // Workaround to solve issue of user message div being rendered even if no error, since otherwise errorMessage holds an empty array (truthy)
        if (message && message.length > 0) {
            message = message[0];
        } else {
            message = null;
        }
        //console.log(req.session.isLoggedIn)
        res.render('auth/login', {
            pageTitle: 'Log In',
            errorMessage: message,
            oldInput: {
                email: '',
                password: '',
            },
            validationErrors: [],
        })

    }

    postLogin(req, res, next) {
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
    RegisterView(req, res, next) {
        let message = req.flash('error');
        message.length > 0 ? (message = message[0]) : (message = null);
        res.render('auth/register', {
            pageTitle: 'Sign Up',
            errorMessage: message,
            oldInput: {
                email: '',
                password: '',
                confirmPassword: '',
            },
            validationErrors: [],
        });
    }

    postRegister = async (req, res, next) => {
        const { email, password, confirmPassword } = req.body;

        const errors = validationResult(req);
        console.log(errors)
        if (!errors.isEmpty()) {
            return res.status(422).render('auth/register', {
                pageTitle: 'Sign Up',
                errorMessage: errors.array()[0].msg,
                oldInput: { email, password, confirmPassword },
                validationErrors: errors.array(),
            });
        }

        // Generates hashed password. Asynchronous task; returns a promise. Second arg is salt value (how many rounds of hashing will be applied)
        hash(password, 12)
            .then((hashedPassword) => {
                const user = new User({
                    email,
                    password: hashedPassword,
                    // cart: { items: [] },
                });
                return user.save();
            })
            .then((result) => {
                res.redirect('/auth/login');
                // sendMail() provides a promise. Returning in order to chain .catch() and catch any errors
                // return transporter.sendMail({
                //     to: email,
                //     from: 'xuantung6121@gmail.com',
                //     subject: 'Welcome to WebSite',
                //     html: '<h3>You have successfully signed up.</h3>',
                // });
            })
            .catch((err) => {
                const error = new Error(err);
                error.httpStatusCode = 500;
                return next(error);
            });
    }

    // [GET: auth/logout]
    Logout(req, res, next) {
        req.session.destroy((err) => {
            if (err) {
                console.log(err);
            }
            res.redirect('/auth/login');
        });
    }

    getResetPassword(req, res) {
        let message = req.flash('error');
        message.length > 0 ? (message = message[0]) : (message = null);
        res.render('auth/reset-password', {
            path: '/reset-password',
            pageTitle: 'Reset Password',
            errorMessage: message,
        });
    }

    postResetPassword(req, res) {

    }

}

export default new AuthController