module.exports = (hbs) => {
  hbs.registerHelper("isBidLeader", (user, buyer, options) => {
    //console.log("\nENTRO EN Bidleader, con USER =>", session.id)
    console.log("ENTRO EN Bidleader, con BUYER =>", buyer.id)

    //return (user.id == article.owner);
  if (JSON.stringify(user.id) == JSON.stringify(buyer.id)) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }})
}