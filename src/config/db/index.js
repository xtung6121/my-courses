const mongoose = require('mongoose');
import { env } from '~/config/environment'
async function connect() {
  try {
    await mongoose.connect(env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    }).then(() =>
      console.log('You successfully connected to db!'))

  } catch (error) {
    console.log('Connect db failed!')
  }
}

module.exports = { connect };