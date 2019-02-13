module.exports = (hbs) => {
  hbs.registerHelper("isOwner", (user, article, options) => {
    //return (user.id == article.owner);
    //console.info('USER => ', user)
    if (JSON.stringify(user.id) == JSON.stringify(article.owner)) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  })
}