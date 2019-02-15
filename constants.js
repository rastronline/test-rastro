module.exports.ROLES = {
  ROLE_ADMIN: 'ADMIN',
  ROLE_GUEST: 'GUEST'
}

module.exports.CATEGORIES = [
  {
    id: "chromes",
    image: "../../images/categories/cromos.jpg",
    name: "Chromes",
  },
  {
    id: "retroGaming",
    image: "../../images/categories/retroGame.jpg",
    name: "Retro Gaming",
  },
  {
    id: "books",
    image: "../../images/categories/libros.jpg",
    name: "Books",
  },
  {
    id: "vinylRecords",
    image: "../../images/categories/vinilos.jpg",
    name: "Vynil records",
  },
  {
    id: "comics",
    image: "../../images/categories/comics.jpg",
    name: "Comics",
  },
  {
    id: "philately",
    image: "../../images/categories/sellos.jpg",
    name: "Phylately",
  },
  {
    id: "numismatics",
    image: "../../images/categories/monedas.jpg",
    name: "Numismatics",
  },
  {
    id: "pictures",
    image: "../../images/categories/cuadros.jpg",
    name: "Pictures",
  },
  {
    id: "jewelry",
    image: "../../images/categories/joyas.jpg",
    name: "Jewelry",
  },
  {
    id: "antiques",
    image: "../../images/categories/antiguedades.jpg",
    name: "Antiques",
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
module.exports.AUCTION_TIME_LIMIT = 2*60*1000  //24 hours in milliseconds
