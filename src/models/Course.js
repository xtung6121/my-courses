const mongoose = require('mongoose')
// const slug = require('mongoose-slug-generator')
// const mongooseDelete = require('mongoose-delete')


const Schema = mongoose.Schema

const Course = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  // filename part of AWS S3 URL to pass to method that deletes it from bucket
  imageKey: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    // Tells Mongoose which other model is related to data in this field
    ref: 'User',
    required: true,
  },
  slug: {
    type: String,
  }
},
{
  timestamps: true
}
)
// mongoose.plugin(slug)
// Course.plugin(mongooseDelete, {
//   deletedAt : true,
//   overrideMethods: 'all' })

module.exports = mongoose.model('Course', Course)