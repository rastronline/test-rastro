module.exports = (hbs) => {
  hbs.registerHelper("isNotOwner", (session, article, options) => {
    //return (user.id == article.owner);
    /* console.info('USER => ', session.id)
    console.info('\nARTICLE => ', article.owner.id) */

    if (JSON.stringify(session.id) !== JSON.stringify(article.owner.id)) {
      //console.log("\nsno es el dueño! debe mostrar el icono")
      return options.fn(this);
    } else {
      //console.log("\nES EL DUEÑO! NO DEBE ENSEÑAR NADA")
      return options.inverse(this);
    }
  })
}