const mongoose = require("mongoose");
const Article = require("../models/article.model");
const faker = require("faker");
const categories = require("../constants").CATEGORIES.map(c => c.id);
require("../configs/db.config");
const articles = [];

function newArticle(item) {
  return new Article({
    name: item.name,
    description: item.description,
    category: item.category,
    priceAppraiser: faker.commerce.price(),
    priceSeller: faker.commerce.price(),
    owner: "5c59d13d18dd7047eb85d474",
    isActive: true,
    isPriced: true,
    photos: [item.photos]
  });
}

const items = [
  {
    name: "Colección de cromos de Pokémon",
    description:
      "Colección de cromos de Pokémon. La colección es de todos los cromos de Pokémon personalizada",
    category: "chromes",
    photos: ["../images/img0.png", "../images/img1.png"]
  },
  {
    name: "album de cromos futbol",
    description:
      "Album de cromos de futbol del real madrid. ideal coleccionistas y amantes del futbol.",
    category: "chromes",
    photos: ["../images/img0.png", "../images/img1.png"]
  },
  {
    name: "cromos de la liga 95-96",
    description:
      "Lote de 136 cromos de album de futbol de la liga 95-96 por lote o por separado, 1€ por cromo,por todo el lote se haria precio. tengo de otros años preguntar sin compromiso. solo vendo no intercambio. ideal coleccionistas y amantes del futbol.",
    photos: ["../images/img0.png", "../images/img1.png"]
  },
  {
    name: "Album cromos.",
    description:
      "Album cromos antiguo de 1974. Editorial Bruguera.Completo.Album de 303 cromos.Medidas 37x26.División regional,trajes típicos,escudos,hombres famosos,fauna...Portada un poco deteriorada y primera página suelta.Interior en muy buen estado.Los cromos están perfectos.",
    category: "chromes",
    photos: ["../images/img0.png", "../images/img1.png"]
  },
  {
    name: "CROMOS Y ÁLBUM",
    description:
      "Se vende boli Bic azul y boli Bic negro , de regalo se darán álbumes nuevos de esta temporada y un pack de 50 sobres nuevos sin abrir",
    category: "chromes",
    photos: ["../images/img0.png", "../images/img1.png"]
  },
  {
    name: "Cromos Stranger Things",
    description:
      "Precio Negociable Tengo todos menos el de Eleven y Steve. Eleven Mike Dustin Will Lucas Hoper Steve Joyce Jonathan Nancy",
    category: "chromes",
    photos: ["../images/img0.png", "../images/img1.png"]
  },
  {
    name: "ALBUM CROMOS. 1962. Ed. JUFE",
    description:
      "Album de cromos de coches de todos los tiempos. completo. Editorial JUFE. Joya para coleccionistas. Más álbumes en mi perfil. Juego, cromos, coches, historia, automóviles,",
    category: "chromes",
    photos: ["../images/img0.png", "../images/img1.png"]
  },
  {
    name: "pc",
    description:
      "Lorequa. Ut enim ad minimroident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    category: "chromes",
    photos: ["../images/img0.png", "../images/img1.png"]
  },
  {
    name: "Cromos Dragon Ball",
    description: "Colección completa de 140 cromos de 1986. Excelente estado",
    category: "numismatics",
    photos: ["../images/img0.png", "../images/img1.png"]
  },
  {
    name: "Cromos Michael Jordan",
    description:
      "Cromos de Michael Jordan upper deck,incluye cromo de edición especial en forma de dibujo",
    category: "numismatics",
    photos: ["../images/img0.png", "../images/img1.png"]
  },
  {
    name: "Cromos de Shaquille Oneal",
    description:
      "Cromos de Shaquille Oneal,incluye el cromo de su amo de Rookie y edición especial en holograma",
    category: "numismatics",
    photos: ["../images/img0.png", "../images/img1.png"]
  },
  {
    name: "Vendo Monedas antiguas",
    description:
      "5 Monedas antiguas -una romana -dos del siglo XV -dos del siglo XVII",
    category: "numismatics",
    photos: ["../images/img0.png", "../images/img1.png"]
  },
  {
    name: "Monedas Islandia",
    description: "Serie completa Islandia",
    category: "numismatics",
    photos: ["../images/img0.png", "../images/img1.png"]
  },
  {
    name: "monedas de 1 peseta de franco distintos años",
    description: "Varias monedas de 1 peseta de franco precio a convenir",
    category: "numismatics",
    photos: ["../images/img0.png", "../images/img1.png"]
  },
  {
    name: "coleccion monedas",
    description:
      "Vendo coleccion de unas 100 monedas, españolas algunas d plata y extranjeras. todas en muy buen estado, algunas sin circular. precio negociable.",
    category: "numismatics",
    photos: ["../images/img0.png", "../images/img1.png"]
  },
  {
    name: "Monedas conmemorativas europeas",
    description:
      "Se trata de unas monedas conmemorativas europeas. Esta en muy buen estado y se puede comprar todo junto o por separado.",
    category: "numismatics",
    photos: ["../images/img0.png", "../images/img1.png"]
  },
  {
    name: "monedas Harry Potter",
    description:
      "Monedas Harry Potter, más productos en mi perfil, más información por privado, consultar precio",
    category: "books",
    photos: ["../images/img0.png", "../images/img1.png"]
  },
  {
    name: "Monedas Juegos Olímpicos chapadas en oro 24 k",
    description:
      "Dos monedas de los juegos Olímpicos de Montreal del 76 Y México del 68. Chapadas en oro de 24 kilates. Están en su plástico original. Acepto intercambios y hago envíos certificados. Precio Negociable ¡MÁS EN MI PERFIL!    ",
    category: "numismatics",
    photos: ["../images/img0.png", "../images/img1.png"]
  },
  {
    name: "3 monedas WWII Alemania Nazi",
    description:
      "Lote de monedas alemanas correspondientes al periodo nazi del Tercer Reich durante los años de la Segunda Guerra Mundial. Son 3 monedas de 10 reichspfennig de años correlativos (1940 -A-, 1941 -A-, 1942 -A-). Se vende la serie de 3 monedas por 15 euros; no se venden por separado. Más monedas en mi perfil.",
    category: "numismatics",
    photos: ["../images/img0.png", "../images/img1.png"]
  },
  {
    name: "Consola Super Nintendo Classic Mini",
    description:
      "Consola Super Nintendo Classic Mini con 21 juegos presinstalados, dos mandos + Adaptador de corriente + Cable HDMI A estrenar tan sólo se probó para ver si funcionaba.",
    category: "retroGaming",
    photos: ["../images/img0.png", "../images/img1.png"]
  },
  {
    name: "pc",
    description:
      "Lorequa. Ut enim ad minimroident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    category: "retroGaming",
    photos: ["../images/img0.png", "../images/img1.png"]
  },
  {
    name: "Consola Wii",
    description: "Consola con dos mandos y de regalo muchos juegos",
    category: "retroGaming",
    photos: ["../images/img0.png", "../images/img1.png"]
  },
  {
    name: "pc",
    description:
      "Lorequa. Ut enim ad minimroident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    category: "retroGaming",
    photos: ["../images/img0.png", "../images/img1.png"]
  },
  {
    name: "consola nintendo new 3ds xl con juegos incluidos",
    description:
      "Nintendo 3ds xl con 35 juegos dijitales mario kart 7 pokemon super maro 2 animal grossing etc cargador funda y lápiz una targeta micro de 32 gb carcasa protectora la nintendo funciona perfectamente no tiene ningún defecto la puedes probar sin compromiso si lo ven anunciado todavía está en venta 130 euros 666725464 hago envios no hago cambio nintendo videojuegos new 3ds xl new 3ds 3ds xl 3ds new 2ds dsi xl dsi ds lite gameboy móvil mesa coche nevera ps3 ps4 samsung galaxia sofá bisicleta casco de moto vestido de fiesta zapatos mudanza ordenador lámpara gafas de sol wii microondas table",
    category: "retroGaming",
    photos: ["../images/img0.png", "../images/img1.png"]
  },
  {
    name: "consola portátil NES",
    description:
      "Pequeña consola con juegos NES y aspecto de Gameboy. 168 juegos, perfecto estado, poco uso (la he usado un poco y la vendo porque sólo quería volver a ver juegos clásicos por un rato). color negro translúcido. con cable de carga y de TV. funciona con batería recargable y no viene con cargador    ",
    category: "retroGaming",
    photos: ["../images/img0.png", "../images/img1.png"]
  },
  {
    name: "pc",
    description:
      "Lorequa. Ut enim ad minimroident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    category: "retroGaming",
    photos: ["../images/img0.png", "../images/img1.png"]
  },
  {
    name: "Consola Atari vintage",
    description:
      "Réplica de la mítica consola Atari. Incluye 160 juegos, mandos tipo jostick y cableado. Embalaje original",
    category: "retroGaming",
    photos: ["../images/img0.png", "../images/img1.png"]
  },
  {
    name: "Juegos PSP - Lote 6 juegos",
    description:
      "Lorequa. Ut enim ad minimroident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    category: "retroGaming",
    photos: ["../images/img0.png", "../images/img1.png"]
  },
  {
    name: "libro francés",
    description: "Nuevo merci 4 ESO anaya",
    category: "books",
    photos: ["../images/img0.png", "../images/img1.png"]
  },
  {
    name: "El Libro Negro del Emprendedor",
    description:
      "Ser emprendedor constituye una postura vital, una forma de enfrentarse al mundo que implica disfrutar con la incertidumbre y la inseguridad de qué sucederá mañana. No existen ideas brillantes que, por sí solas, den lugar a negocios redondos: lo esencial es cómo un concepto se pone en práctica. Sin embargo el 90 % de las iniciativas fracasan antes de cuatro años y sólo el 3% de los manuales de empresa se dedican a explicar por qué. De ahí la relevancia de este libro. Fernando Trías de Bes, coautor de La buena suerte, analiza los factores clave del fracaso y define los rasgos que debe reunir un verdadero emprendedor: motivación y talento para",
    category: "books",
    photos: ["../images/img0.png", "../images/img1.png"]
  },
  {
    name: "El Libro Negro del Capitalismo",
    description:
      "El capitalismo es el mayor genocida de la historia, un asesino sin rostro ni código genético que, en la modernidad, llaman liberalismo. No deja rastros y sus crímenes son casi perfectos. Sus protagonistas son índices y balances: Dow Jones, Nikkei... Los muertos y los vivos son sus víctimas, esos niños del llamado Tercer Mundo a los que la desnutrición mata diariamente por decenas de miles, esos pueblos condenados a reembolsar los intereses de una deuda interminable, esa innumerable muchedumbre de deportados y desplazados, descuartizados en las trincheras de cualquier guerra sin sentido, quemados vivos por el napalm. El capitalismo está en to",
    category: "books",
    photos: ["../images/img0.png", "../images/img1.png"]
  },
  {
    name: "Libro. La Patrulla del tiempo. Anderson",
    description:
      "Nuevo. A Estrenar.Prólogo de Miquel Barcelo. Precio en tienda 23,00 €",
    category: "books",
    photos: ["../images/img0.png", "../images/img1.png"]
  },
  {
    name: "Bertini - Libro ARTE",
    description:
      "Autor: Guido Ballo. Gianni Bertini fundador de Mec Art (Arte Mecánico) exponente del Pop Art, en los 50 participó en el arte Nucleare e all' Informale (Nuclear e Informal), en lo 70 tomó parte con sus obras de compromiso político con la Nouvelle Figuration francesa. Reimpresión de la primera Monografía de la obra de Gianni Bertini realizada desde 1949 hasta 1971. Grandi Opere Monografiche publicado en Milán por Giampaolo Prearo Editore, 1971 en la serie de grandes obras monográfica. Texto en italiano. 386 fotos en b/n, 60 fotos en color. Gran formato 31x29,5 cm. 216 pá",
    category: "books",
    photos: ["../images/img0.png", "../images/img1.png"]
  },
  {
    name: "Libro de Stephen King. La larga marcha",
    description: "Stephen King. La larga marcha Tapa blanda Perfecto estado",
    category: "books",
    photos: ["../images/img0.png", "../images/img1.png"]
  },
  {
    name: "lote tres vinilos",
    description: "Razor blade, social combat y barkens dozen",
    category: "vinylRecords",
    photos: ["../images/img0.png", "../images/img1.png"]
  },
  {
    name: "Licencia Serato Dvs + vinilos time code",
    description:
      "Se vende licecia Serato DVS + 2 vinilos time code transparentes valorados en 47 euros. Vendo todo junto y sin apenas uso ya que lo compre por probar y no tengo tiempo,a si es que lo vendo todo! El precio no es negociable ya que todo suma unos 160 euros",
    category: "vinylRecords",
    photos: ["../images/img0.png", "../images/img1.png"]
  },
  {
    name: "VINILOS TECHNO IMPORT",
    description:
      "Vinilos de techno son unos 114. el estado de los discos es muy bueno tienen las tipicas marcas de uso pero ninguno salta ni esta rallado y las caratulas tienen algo mas de uso lo normal. casi todo es importacion. hay de los 90 y 2000 todo musica seleccionada. me interesa vender el lote entero cada disco sale a menos de 3 euros. tambien podria considerar ",
    category: "vinylRecords",
    photos: ["../images/img0.png", "../images/img1.png"]
  },
  {
    name: "LOTE8 5 VINILOS REMEMBER",
    description:
      "Precio por lote 15€ por separado indicado en cada disco... estado muy bueno...poco o nada de uso. Barthez - On The move 2001 6€ Cherrymoon traxx - Alternation 1997 4€ Airwalk - Energy 1998 3€ Abuna E - Watch me 1998 4€ Indigo - Reality 1998 3€",
    category: "vinylRecords",
    photos: ["../images/img0.png", "../images/img1.png"]
  },
  {
    name: "Marco LP vinilos",
    description:
      "Para enmarcar tus vinilos favoritos. Con marco metálico y cristal.",
    category: "vinylRecords",
    photos: ["../images/img0.png", "../images/img1.png"]
  },
  {
    name: "LOTE9 5 VINILOS REMEMBER",
    description:
      "Precio por lote 15€ por separado indicado en cada disco... estado muy bueno...poco o nada de uso. Kosmonova - Danse avec moi! Remixes 2000 4€ Starchild - Revelation EP 2000 3€ Julio Posadas - Evolution 2001 ",
    category: "vinylRecords",
    photos: ["../images/img0.png", "../images/img1.png"]
  },
  {
    name: "Lote comics Línea Ultimate Marvel",
    description:
      "Ultimate Spiderman 1-12 Y especial 2003. Ultimate X Men 1-15. The Ultimates Vol.1 1-3. The Ultimates Vol.2 2. The Ultimates 2 1, 6 y 8. Ultimate Thor (Hickman y Pacheco). Ultimate Power 1. Ultimate Iron Man 1. Ultimate Fantastic Four 11-13. Ultimate Marvel Ojo de Halcón. (PERFECTO ESTADO).",
    category: "comics",
    photos: ["../images/img0.png", "../images/img1.png"]
  },
  {
    name: "Hacer comics",
    description:
      "El mejor libro para aprender la filosofía del comic, todo lo necesario para entender el cómic, flujo de viñetas y mejorar tu estilo ya sea manga, cómic, tebeo...Es muy ameno y está muy bien explicado, imprescindible en la biblioteca de cualquier dibujante o amante del comic #aprender#comic#libro#novela#comic#dibujo#arte#educativo#manga#japon",
    category: "comics",
    photos: ["../images/img0.png", "../images/img1.png"]
  },
  {
    name: "Batman comics",
    description:
      "Vendo los comics en buen estado sólo leído una vez se pueden comprar por separado batman harvest breed: 11€ batman la leyenda de ra's alghul: 20€ cambio por otro comic de batman del mismo valor o parecido",
    category: "comics",
    photos: ["../images/img0.png", "../images/img1.png"]
  },
  {
    name: "cómics",
    description: "Nuevos a estrenar. Los cuatro volumenes. DC",
    category: "comics",
    photos: ["../images/img0.png", "../images/img1.png"]
  },
  {
    name: "Berserk. Cómics. Manga.",
    description:
      "Berserk, números 1 y 2. Idioma español. Editorial, ML Ediciones. 8 euros cada uno.",
    category: "comics",
    photos: ["../images/img0.png", "../images/img1.png"]
  },
  {
    name: "lote autentico de sellos y monedas nazi",
    description: "Lote autentico de 17 sellos y 3 monedas nazis",
    category: "philately",
    photos: ["../images/img0.png", "../images/img1.png"]
  },
  {
    name: "Sellos Expo 92",
    description:
      "Pliego de 50 sellos de la Expo 92 sin mata sellar! Dime lo que estás dispuesto a pagar! Y hablamos!",
    category: "philately",
    photos: ["../images/img0.png", "../images/img1.png"]
  },
  {
    name: "",
    description: "",
    category: "philately",
    photos: ["../images/img0.png", "../images/img1.png"]
  },
  {
    name: "serie militares (sellos)",
    description: "Año 1977",
    category: "philately",
    photos: ["../images/img0.png", "../images/img1.png"]
  },
  {
    name: "Sellos de Franco año 1956",
    description:
      "Pliego de 100 sellos en perfecto estado también medio pliego. la mitad 50 sellos 15 €. pliego de cien 25 €.",
    category: "philately",
    photos: ["../images/img0.png", "../images/img1.png"]
  },
  {
    name: "Cuadros oleos",
    description: "Óleos en perfecto estado se venden la pareja 50€",
    category: "pictures",
    photos: ["../images/img0.png", "../images/img1.png"]
  },
  {
    name: "Cuadros/Láminas",
    description: "Dos láminas juntas encuadradas.",
    category: "pictures",
    photos: ["../images/img0.png", "../images/img1.png"]
  },
  {
    name: "Cuadros cocina",
    description:
      "Cuadros de cocina con marco en color verde botella y láminas. El precio es por el conjunto de cuatro cuadros",
    category: "pictures",
    photos: ["../images/img0.png", "../images/img1.png"]
  },
  {
    name: "Set de 2 Cuadros Óleo (120 x 3 x 150 cm) by Homani",
    description:
      "Envios por SEUR URGENTE DESDE 3,30€. Somos tienda. Set de 2 Cuadros Óleo (120 x 3 x 150 cm) by Homania Set de 2 Cuadros Óleo (120 x 3 x 150 cm) by Homania lo conseguirás. Medidas aprox.: 120 x 3 x 150 cm Bastidor: madera de pino Anclajes incluidos / Homania",
    category: "pictures",
    photos: ["../images/img0.png", "../images/img1.png"]
  },
  {
    name: "2 cuadros de hierro forjado",
    description:
      "2 cuadros de hierro forjado. 40x40cm. En perfecto estado. Los dos cuadros por el precio de 35€",
    category: "pictures",
    photos: ["../images/img0.png", "../images/img1.png"]
  },
  {
    name: "Joyas y Complimentos - Anillo de plata 925",
    description:
      "Anillo de plata 925 con la fabuloso piedra la Turquesa. una piedra con tono verdoso. Anillo vistoso. grande. con diseño. Espectacular de anillo.",
    category: "jewelry",
    photos: ["../images/img0.png", "../images/img1.png"]
  },
  {
    name: "Joyas y Complimentos-Pendientes de plata 925",
    description:
      "Pendientes de plata 925 con la fabuloso piedra el Grante. Preciosos pendientes.",
    category: "jewelry",
    photos: ["../images/img0.png", "../images/img1.png"]
  },
  {
    name: "Joyas y Complimentos - Anillo de plata con Granate",
    description:
      "Anillo de plata 925 con la piedra el Granate Es anillo para ti . ancho. vistoso. precioso.",
    category: "jewelry",
    photos: ["../images/img0.png", "../images/img1.png"]
  },
  {
    name: "ESTUCHE JOYAS TOUS",
    description: "stuche joyero tous 3€",
    category: "jewelry",
    photos: ["../images/img0.png", "../images/img1.png"]
  },
  {
    name: "Joyas y Complimentos-Pendientes con Amatista",
    description: "Pendientes de plata 925 con Amatista. muy bonitas.",
    category: "jewelry",
    photos: ["../images/img0.png", "../images/img1.png"]
  },
  {
    name: "Antigüedades: Espejo vintage LATÓN ARTESANAL",
    description:
      "MARAVILLOSO espejo ovalado de los AÑOS 40, con espectacular MARCO ARTESANAL de latón moldeado y troquelado a mano. Una verdadera JOYA DECORATIVA con adorno de filigrana al estilo de las REJAS DE FORJA y cristal con auténtico azogue de plata. 70an x 90alt, en muy buen estado y el marco con preciosa PÁTINA ANTIGUA. Con su colgador y protector trasero. ",
    category: "antiques",
    photos: ["../images/img0.png", "../images/img1.png"]
  },
  {
    name: "ESPEJO",
    description:
      "Para los coleccionistas de antiguidades, traigo un espejo de mi abuela, traduce una epoca de mucho estilo y elegancia...para decoracion y uso, con marco sol pintado de azul con rallas de cobre,para dar a tu cuarto o salon un toque clasico, en su perfectas condiciones y su caja en buen estado--- BUY IT NOW (9X9 CM EL ESPEJO) Y LAS LATERALES ( 6X6 CM)",
    category: "antiques",
    photos: ["../images/img0.png", "../images/img1.png"]
  },
  {
    name: "Antigüedades Juego de Te",
    description: "Juego de Te / café chino original",
    category: "antiques",
    photos: ["../images/img0.png", "../images/img1.png"]
  },
  {
    name: "Lámpara de tienda de antigüedades",
    description: "Lámpara con 3 globos más uno central",
    category: "antiques",
    photos: ["../images/img0.png", "../images/img1.png"]
  },
  {
    name: "mesa",
    description:
      "Mesa antigua de despacho de madera, tallada a mano del Renacimiento español con 3 cajones con llave.En buen estado. Estilo castellano. medidas. 130 x 77  y 81 de alto despacho, muebles, vintage, antiguo, antigüedades, coleccionista, madera maciza, rebajas, urge,librería, reformas, conjunto, butaca, sillón, comedor, salón, abogado,",
    category: "antiques",
    photos: ["../images/img0.png", "../images/img1.png"]
  }
];

items.forEach(function(item) {
  articles.push(newArticle(item));
});

Article.create(articles)
  .then(artices => {
    console.log(`Created ${articles.length} articles`);
    mongoose.connection.close();
  })
  .catch(err => {
    console.error(err);
    mongoose.connection.close();
  });