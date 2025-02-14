const mongoose = require('mongoose');

const slug = require('mongoose-slug-updater')
const mongooseDelete = require('mongoose-delete')

const Schema = mongoose.Schema

const Course = new mongoose.Schema({
  title: {
    type: String,
    maxLength: 225,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  description: {
    type: String,
    maxLength: 600,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  // filename part of AWS S3 URL to pass to method that deletes it from bucket
  // imageKey: {
  //   type: String,
  // },
  userId: {
    type: Schema.Types.ObjectId,
    // Tells Mongoose which other model is related to data in this field
    ref: 'User',
    required: true,
  },
  slug: {
    type: String,
    slug: 'title',
    unquie: require
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
},
  {
    timestamps: true
  }
)

// Add plugins 
mongoose.plugin(slug)


// sort delete plugin
Course.plugin(mongooseDelete,
  { deletedAt: true, overrideMethods: 'all' });

module.exports = mongoose.model('Course', Course)