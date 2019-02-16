const mongoose = require('mongoose');
const Article = require('../models/article.model');
const faker = require('faker');
const categories = require('../constants').CATEGORIES.map(c => c.id);

require('../configs/db.config');


const randomItem = () => {
  const name =  faker.commerce.productName();
  const image = `https://loremflickr.com/320/240/${encodeURIComponent(name)}`;
  return new Article({
    name: name,
    description: faker.lorem.paragraphs(),
    category: categories[Math.floor(Math.random()*categories.length)],
    priceAppraiser: faker.commerce.price(),
    priceSeller: faker.commerce.price(),
    owner: "5c59d13d18dd7047eb85d474",
    isActive: true,
    isPriced: true, 
    photos:[image],
  });
}

const articles = [];
for (let index = 0; index < 5; index++) {
  articles.push(randomItem());
}

Article.create(articles)
  .then((artices) => {
    console.log(`Created ${articles.length} articles`)
    mongoose.connection.close()
  })
  .catch(err => {
    console.error(err);
    mongoose.connection.close();
  })