module.exports = (hbs) => {
  hbs.registerHelper("isOwner", (session, article, options) => {
    //return (user.id == article.owner);
    //console.info('USER => ', user)
    if (JSON.stringify(session.id) == JSON.stringify(article.owner.id)) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  })
}