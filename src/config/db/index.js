const mongoose = require('mongoose');
import { env } from '~/config/environment';

async function connect() {
  try {
    await mongoose.connect('mongodb+srv://nguyendev:x1nJ0S7iyEiDoguf@cluster0.3phof.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    console.log('You successfully connected to DB!');
  } catch (error) {
    console.log(error, 'Connect db failed!');
  }
}

module.exports = { connect };
