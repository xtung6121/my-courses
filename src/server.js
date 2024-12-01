import express from 'express'
const handlebars = require('express-handlebars')
const route = require('~/routes')
const path = require('path')
const methodOverride = require('method-override')
const db = require('./config/db')
const bodyParser = require('body-parser')

const app = express()

// Connect to DB
db.connect();

const hostname = 'localhost'
const port = 8017

// config variable: path
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);


// Static files
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

app.use(methodOverride('_method'))


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
  // eslint-disable-next-line no-console
  console.log(`Hello Tùng, I am running at ${hostname}:${port}/`)
})
