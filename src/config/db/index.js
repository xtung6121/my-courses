const mongoose = require('mongoose');
import { env } from '~/config/environment';

async function connect() {
  try {
    await mongoose.connect(env.MONGODB_URI);
    console.log('You successfully connected to DB!');
  } catch (error) {
    console.log(error, 'Connect db failed!');
  }
}

module.exports = { connect };
