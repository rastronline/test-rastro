module.exports = (hbs) => {
  hbs.registerHelper("isOwner", (session, article, options) => {
    //return (user.id == article.owner);
    //console.info('USER => ', user)
    console.info("EN USER EN SESSION ES", session.id);
    console.info("EN owner EN SESSION ES", article.owner.id);

    if (JSON.stringify(session.id) == JSON.stringify(article.owner.id)) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  })
}