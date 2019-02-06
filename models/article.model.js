const constants = require('../constants');
const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' 
  },
  isSold: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: false
  },
  isPriced: {
    type: Boolean,
    default: false
  },
  isAuction: {
    type: Boolean,
    default: false
  },
  price: {
    type: Number
  },
  photos: {
    type: [String],
    default: ['../images/img0.png']
   /*  type: String,
    default: ['https://semantic-ui.com/images/wireframe/image.png'] */
  }, 
  description: {
    type: String,
  },
  condition: {
    type: String,
    enum: constants.CONDITIONS.map(condition => condition)
    //enum: ["Poor", "Good", "Excelent"]
  },
  location: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: [Number]
  },
  category: {
    type: String,
    enum: constants.CATEGORIES.map(category => category.id)
  }
}, {timestamps: true});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;