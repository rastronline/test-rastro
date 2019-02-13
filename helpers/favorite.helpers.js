module.exports = (hbs) => {
  hbs.registerHelper("isFavorite", (user, article, options) => {
    //return (user.id == article.owner);
    console.log('\n\nUSER => ', user.favorites)
    console.log('\n\nARTICLE => ', article.id)
    debugger;

    JSON.stringify()
    let favAux = user.favorites.map(fav => JSON.stringify(fav))
    let artAux = JSON.stringify(article.id);

    console.log("\n\n ¿esta incluido?", favAux.includes(artAux))
    if (favAux.includes(artAux)) {
      //if (false) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  });
}