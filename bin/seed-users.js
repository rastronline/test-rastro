const mongoose = require('mongoose');
const User = require('../models/user.model');
const faker = require('faker');
//const categories = require('../constants').CATEGORIES.map(c => c.id);

require('../configs/db.config');


const randomUser = () => {
  const name =  faker.commerce.productName();
  //const image = `https://loremflickr.com/320/240/${encodeURIComponent(name)}`;
  const location = {
    type: "Point",
    coordinates: [faker.address.latitude(), faker.address.longitude()]
  }
  return new User({
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    email: faker.internet.email(),
    role: "GUEST",
    profilePic: faker.image.avatar(),
    //location: location
  });
}

const users = [];
for (let index = 0; index < 6; index++) {
  users.push(randomUser());
}

User.create(users)
  .then((users) => {
    console.log(`Created ${users.length} users`)
    mongoose.connection.close()
  })
  .catch(err => {
    console.error(err);
    mongoose.connection.close();
  })