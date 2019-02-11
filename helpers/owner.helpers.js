module.exports = (hbs) => {
  hbs.registerHelper('isOwner', (user, article) => {
    //return (user.id == article.owner);

    if (user._id == article.owner) {
      return options.inverse(this);
    } else {
      return options.fn(this);
    }
  })
}