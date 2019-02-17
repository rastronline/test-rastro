module.exports.ROLES = {
  ROLE_ADMIN: 'ADMIN',
  ROLE_GUEST: 'GUEST'
}

module.exports.CATEGORIES = [
  {
    id: "chromes",
    image: "../../images/categories/cromos.jpg",
    name: "Cromos",
  },
  {
    id: "retroGaming",
    image: "../../images/categories/retroGame.jpg",
    name: "Retro Game",
  },
  {
    id: "books",
    image: "../../images/categories/libros.jpg",
    name: "Libros",
  },
  {
    id: "vinylRecords",
    image: "../../images/categories/vinilos.jpg",
    name: "Vinilos",
  },
  {
    id: "comics",
    image: "../../images/categories/comics.jpg",
    name: "Comics",
  },
  {
    id: "philately",
    image: "../../images/categories/sellos.jpg",
    name: "Filatelia",
  },
  {
    id: "numismatics",
    image: "../../images/categories/monedas.jpg",
    name: "Numismatica",
  },
  {
    id: "pictures",
    image: "../../images/categories/cuadros.jpg",
    name: "Cuadros",
  },
  {
    id: "jewelry",
    image: "../../images/categories/joyas.jpg",
    name: "Joyería",
  },
  {
    id: "antiques",
    image: "../../images/categories/antiguedades.jpg",
    name: "Antigüedades",
  }
  /* retroGaming: {
    id: "retroGaming",
    image: "",
    name: "Retro Gaming",
  },
  retroGaming: {
    id: "retroGaming",
    image: "",
    name: "Retro Gaming",
  },
  retroGaming: {
    id: "retroGaming",
    image: "",
    name: "Retro Gaming",
  },
  retroGaming: {
    id: "retroGaming",
    image: "",
    name: "Retro Gaming",
  },

  retroGaming: {
    id: "retroGaming",
    image: "",
    name: "Retro Gaming",
  }, */
];

module.exports.CONDITIONS = ['Pobre', 'Bueno', 'Excelente'];

module.exports.FIRST_SEARCH = true;

//module.exports.AUCTION_TIME_LIMIT = 24*60*60*1000  //24 hours in milliseconds
module.exports.AUCTION_TIME_LIMIT = 5*60*1000  //24 hours in milliseconds

module.exports.CATEGORY_SELECTED;
module.exports.KEYWORDS;

