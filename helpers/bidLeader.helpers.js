module.exports = (hbs) => {
  hbs.registerHelper("isBidLeader", (user, buyer, options) => {
    //return (user.id == article.owner);
    /* console.log('USER en isBidLeader => ', user)
    console.log('BUYER en isBidLeader=> ', buyer) */
    
    if (JSON.stringify(user.id) == JSON.stringify(buyer.id)) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  })
}