const constants = require('../constants');
const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  priceSeller: {
    type: Number,
  },
  priceAppraiser: {
    type: Number
  },
  priceAuction : {
    type: Number
  },
  description: {
    type: String
  },
  category: {
    type: String,
    enum: constants.CATEGORIES.map(category => category.id)
  },
  condition: {
    type: String,
    enum: constants.CONDITIONS.map(condition => condition)
    //enum: ["Poor", "Good", "Excelent"]
  },
  photos: {
    type: [String],
    default: ['../images/img0.png']
   /*  type: String,
    default: ['https://semantic-ui.com/images/wireframe/image.png'] */
  }, 
  location: {
    type: {
      type: String,
      default: "Point"
    },
    coordinates: {
      type: [Number],
      default: [-104.9903, 39.7392] 
    }
  },
  address: {
    type: String,
    default: "28001, Madrid"
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' 
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' 
  },
  infoAppraiser: {
    type: String
  },
  dateOfPurchase: {
    type: Date
  },
  dateOfAuction: {
    type: Date
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
  alreadyAuctioned: {
    type: Boolean,
    default: false
  }
}, {timestamps: true});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;