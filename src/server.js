import express from 'express'
import { env } from '~/config/environment'
const app = express()
const path = require('path')
const route = require('~/routes')
const db = require('./config/db')
const helmet = require('helmet')
const Keygrip = require('keygrip')
const handlebars = require('express-handlebars')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const flash = require('connect-flash')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
const User = require("~/models/User/User")
const Handlebars = require('handlebars')
const MongoStore = require('connect-mongo')

const store = new MongoDBStore({
  uri: env.MONGODB_URI,
  collection: 'sessions'
})

app.use(helmet.xssFilter())

app.set('trust proxy', 1)

app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store
  }))


app.use(flash())

// Connect to DB
db.connect();

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  next();
});

app.use((req, res, next) => {
  // When you throw an error in synchronous places (outside of callbacks and promises), Express will detect this and execute next error handling middleware. But if error is thrown within async code (in then or catch block), Express error handling middleware won't be executed; app will simply crash; have to use next()
  // throw new Error('sync dummy');
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      if (!user) {
        return next();
      }
      req.user = user;
      next();
    })
    // catch block will be executed in the case of technical issue (e.g., database down, or insufficient permissions to execute findById())
    .catch((err) => {
      // Within async code snippets, need to use next wrapping error, outside you can throw error
      next(new Error(err));
    });
});

const hostname = 'localhost'
const port = 8017

// Static files
app.use(express.static(path.join(__dirname, 'src/public')))
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(bodyParser.json())


app.use(methodOverride('_method'))


// Define helpers handlebars
Handlebars.registerHelper('ne', function (v1, v2) {
  return v1 !== v2;
});
Handlebars.registerHelper('and', function (v1, v2) {
  return v1 && v2
});
Handlebars.registerHelper('or', function (v1, v2) {
  return v1 || v2;
});
Handlebars.registerHelper('gt', function (v1, v2) {
  return v1 > v2;
});

const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

// Template engine
app.engine('hbs', handlebars.engine({
  extname: '.hbs',
  helpers: {
    sum: (a, b) => a + b,
    getMinutes: (date) => date.getMinutes(),
    formaterDate: (date) => date.toLocaleDateString("en-US", options),
  },

}))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources', 'views'))


// route init
route(app)


app.listen(port, hostname, () => {
  console.log(`Hello Tùng, I am running at ${hostname}:${port}/`)
})
