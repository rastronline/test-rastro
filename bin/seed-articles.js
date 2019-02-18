const mongoose = require("mongoose");
const Article = require("../models/article.model");
const faker = require("faker");
const categories = require("../constants").CATEGORIES.map(c => c.id);
require("../configs/db.config");
const constants = require("../constants.js");
const articles = [];

const buyers = ["5c6abc008432bc491f4c84ba", "5c6abc008432bc491f4c84bc", "5c6abc008432bc491f4c84bb", "5c6abc008432bc491f4c84be", "5c6abc008432bc491f4c84bd", "5c6abc008432bc491f4c84bf", "5c6abcd51528824adf08bf1e", "5c6abd261528824adf08bf1f"]
const owners = ["5c6abc008432bc491f4c84ba", "5c6abc008432bc491f4c84bc", "5c6abc008432bc491f4c84bb", "5c6abc008432bc491f4c84be", "5c6abc008432bc491f4c84bd", "5c6abc008432bc491f4c84bf", "5c6abcd51528824adf08bf1e", "5c6abd261528824adf08bf1f"]
const chromesName = ["Colección de cromos de Pokémon", "album de cromos futbol", "cromos de la liga 95-96", "Album cromos.", "Cromos Stranger Things", "Cromos Dragon Ball", "Cromos Michael Jordan"]
const numismaticsName = ["Monedas Islandia", "monedas de 1 peseta de franco distintos años", "monedas Harry Potter", "Monedas Juegos Olímpicos chapadas en oro 24 k"];
const booksName = [];

faker.locale = "es";
//const categories = setCategories()
var images = setImages();
console.log(images)


/* function setCategories() {
  let categories = [];
  constants.CATEGORIES.forEach(cat => {
    categories.push(cat.id);
  })
  return categories;
}  */

function setImages() {
  const imagesObj = {};
  constants.CATEGORIES.forEach(cat => {
    imagesObj[cat.id] = [];
    //let categorieImg = { [cat.id]: []}
    for (let i = 0; i < 10; i++) {
      let path = `../images/categories/${cat.id}/${cat.id}(${i}).jpg`;
     // console.log("EL PATH ES ", path)
      imagesObj[cat.id].push(path);
    }
    //images.push(categorieImg);
  })
  return imagesObj;
}

function randomArticle(item) {
  const price = Math.floor(Math.random()*(500-5)+5);  //harcodeaded interval prices
  const location = {
    type: "Point",
    coordinates: [faker.address.latitude(), faker.address.longitude()]
  }
  const category = categories[Math.floor(Math.random()*categories.length)];
  console.log("la categoría es ", category)
  const posImg = Math.floor(Math.random()*10)
  console.log("la posicion de la imagen que quiero es", posImg)
  //console.log("EL ARRAY DE IMAGENES ES ", images[].books)
  /* const photo0 = images[category][posImg];
  console.log(photo0) */
  const photos = []
  for (let i = 0; i < Math.floor(Math.random()*(5-2)+2); i++) {
    photos.push(images[category][Math.floor(Math.random()*10)])
  }//harcodeaded min a max num of photos
  //const photos = [images[category][Math.floor(Math.random()*10)], images[category][Math.floor(Math.random()*10)], images[category][Math.floor(Math.random()*10)]];
  return new Article({

    // //PARA GENERAR ARTILOS LSITOS PARA VENTA...
    // name: faker.commerce.product(),
    // description: faker.lorem.paragraph(),
    // category: category,
    // priceSeller: price,
    // priceAppraiser: Math.floor(price * (Math.random()+0.5)),
    // location: location,
    // owner: owners[Math.floor(Math.random()*owners.length)],
    // isActive: true,
    // isPriced: true,
    // photos: photos,
    // //location: location
    // //address: faker.address.city()
    // /*************************************** */

    // //PARA GENERAR ARTÏCULOS YA VENDIDOS:...
    // name: faker.commerce.product(),
    // description: faker.lorem.paragraph(),
    // category: category,
    // priceSeller: price,
    // priceAppraiser: Math.floor(price * (Math.random()+0.5)),
    // location: location,
    // owner: owners[Math.floor(Math.random()*owners.length)],
    // isActive: true,
    // isPriced: true,
    // isSold: true,
    // buyer: buyers[Math.floor(Math.random()*owners.length)],
    // dateOfPurchase: Date.now(),
    // photos: photos,
    // //location: location
    // //address: faker.address.city()
    // /******************************************* */

    // //PARA GENERAR ARTÏCULOS PENDIENTES DE DECISION DEL USUARIO TRAS LA TASACIÖN:...
    // name: faker.commerce.product(),
    // description: faker.lorem.paragraph(),
    // category: category,
    // priceSeller: price,
    // priceAppraiser: Math.floor(price * (Math.random()+0.5)),
    // location: location,
    // owner: owners[Math.floor(Math.random()*owners.length)],
    // isActive: false,
    // isPriced: true,
    // photos: photos,
    // //location: location
    // //address: faker.address.city()
    // /******************************************* */

   /*  //PARA GENERAR ARTÏCULOS PENDIENTES DE DECISION DEL USUARIO TRAS LA TASACIÖN:...
    name: faker.commerce.product(),
    description: faker.lorem.paragraph(),
    category: category,
    priceSeller: price,
    location: location,
    owner: owners[Math.floor(Math.random()*owners.length)],
    photos: photos,
    //location: location
    //address: faker.address.city()
    /******************************************* */ 

    // //PARA GENERAR ARTÏCULOS YA VENDIDOS:...
     name: faker.commerce.product(),
     description: faker.lorem.paragraph(),
     category: category,
     priceSeller: price,
     priceAppraiser: Math.floor(price * (Math.random()+0.5)),
     location: location,
     owner: owners[Math.floor(Math.random()*owners.length)],
     isActive: true,
     isPriced: true,
     isAuction: true,
     priceAuction: Math.floor((price * (Math.random()+0.5))*0.8), //harcodeaded price auction 80% of priceAppraiser
     dateOfAuction: Date.now(),
     photos: photos,
     //location: location
    //address: faker.address.city()
    /******************************************* */
  });
}



for (let index = 0; index < 100; index++) {
  articles.push(randomArticle());
  console.log(articles);
}

Article.create(articles)
  .then(artices => {
    console.log(`Created ${articles.length} articles`);
    mongoose.connection.close();
  })
  .catch(err => {
    console.error(err);
    mongoose.connection.close();
  });