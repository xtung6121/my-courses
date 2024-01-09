const mongoose = require('mongoose')

async function connect() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/my_education', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }).then( ()=>
      console.log('Successfully!'))

  } catch (error) {
    console.log('Error')
  }
}

module.exports = { connect };