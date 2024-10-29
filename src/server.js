import express from 'express'

const handlebars = require('express-handlebars')
const route = require('~/routes')
const path = require('path')
const methodOverride = require('method-override')
const db = require('./config/db')


// Connect to DB
db.connect();


const app = express()

const hostname = 'localhost'
const port = 8017

app.use(express.static(path.join(__dirname, 'public')))

app.use(express.urlencoded({
  extended: true
}))

app.use(express.json())
app.use(methodOverride('_method'))

// Template engine
app.engine('hbs', handlebars.engine({
  extname: '.hbs',
  helpers: {
    sum: (a, b) => a + b
  }

}))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources', 'views'))


// route init
route(app)

app.listen(port, hostname, () => {
  // eslint-disable-next-line no-console
  console.log(`Hello Tùng, I am running at ${hostname}:${port}/`)
})
