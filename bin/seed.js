const mongoose = require('mongoose');
const Article = require('../models/article.model');

require('../configs/db.config');

const articles = [
  {
    name: "pc",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    category: "chromes",
    priceAppraiser: 10,
    priceSeller: 10,
    owner: "5c68df0ef32129159e749ebd",
    photos: ["../images/img0.png", "../images/img1.png"],
    isActive: false,
    isPriced: true,
    photos:["https://www.chuchesonline.com/18660-thickbox_default/cromos-sobres-panini-los-increibles-2.jpg"],
    _id: 1,
  }
  /* {
    name: "Harry Potter",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    category: "comics",
    priceAppraiser: 9,
    priceSeller: 10,
    owner: "5c68df0ef32129159e749ebd",
    photos: ["../images/img0.png", "../images/img1.png"],
    isActive: false,
  },
  {
    name: "To Kill a Mockingbird ",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    category: "chromes",
    priceAppraiser: 8,
    priceSeller: 10,
    owner: "5c68df0ef32129159e749ebd",
    photos: ["../images/img0.png", "../images/img1.png"],
    isActive: false
  },
  {
    name: "Pride and Prejudice ",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    category: "chromes",
    priceAppraiser: 9,
    priceSeller: 10,
    owner: "5c68df0ef32129159e749ebd",
    photos: ["../images/img0.png", "../images/img1.png"],
    isActive: false
  },
  {
    name: "Twilight",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    category: "chromes",
    priceAppraiser: 10,
    priceSeller: 10,
    owner: "5c68df0ef32129159e749ebd",
    photos: ["../images/img0.png", "../images/img1.png"],
    isActive: false
  },
  {
    name: "The Book Thief ",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    category: "books",
    priceAppraiser: 7,
    priceSeller: 10,
    owner: "5c68df0ef32129159e749ebd",
    photos: ["../images/img0.png", "../images/img1.png"],
    isActive: false
  },
  {
    name: "The Chronicles of Narnia",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    category: "comics",
    priceAppraiser: 8,
    priceSeller: 10,
    owner: "5c68df0ef32129159e749ebd",
    photos: ["../images/img0.png", "../images/img1.png"],
    isActive: false
  },
  {
    name: "Animal Farm",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    category: "chromes",
    priceAppraiser: 9,
    priceSeller: 10,
    owner: "5c68df0ef32129159e749ebd",
    photos: ["../images/img0.png", "../images/img1.png"],
    isActive: false
  },
  {
    name: "Gone with the Wind ",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    category: "books",
    priceAppraiser: 10,
    priceSeller: 10,
    owner: "5c68df0ef32129159e749ebd",
    photos: ["../images/img0.png", "../images/img1.png"],
    isActive: false
  },
  {
    name: "The Fault in Our Stars ",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    category: "books",
    priceAppraiser: 8,
    priceSeller: 10,
    owner: "5c68df0ef32129159e749ebd",
    photos: ["../images/img0.png", "../images/img1.png"],
    isActive: false
  } */
];



Article.create(articles)
  .then(() => {
    console.log(`Created ${articles.length} articles`)
    mongoose.connection.close()})
  .catch(err => next(err))

/* Article.create(articles, (err) => {
  if (err) { throw(err) }
  console.log(`Created ${articles.length} articles`)
  mongoose.connection.close()
}); */