const constants = require('../constants');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  owner : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' 
  },
  sold : {
    type: Boolean,
    default: false
  },
  auction: {
    type: Boolean,
    default: false
  },
  price: {
    type: Number
  },
  photos: {
    type: [String],
    default: [""]
  },
  description: {
    type: String,
  },
  condition: {
    type: String,
    enum: ["Poor", "Good", "Excelent"]
  },
  location: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: [Number]
  },
  category: {
    type: [String]
  }
}, {timestamps: true});

const Article = mongoose.model('Article', userSchema);

module.exports = Article;