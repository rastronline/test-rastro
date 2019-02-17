module.exports = (hbs) => {
  hbs.registerHelper("existBuyer", (article, options) => {
    //return (user.id == article.owner);
   /*  console.log("ARTICLEEEEEEEEEEEEEEEE en 'exist'::=>", article) */
        
    //console.log("hay nombre", typeof(article.buyer));
    if (typeof(article.buyer) == "object") {
      console.log("EXISTE EL COMPRADOR!!!")
      return options.fn(this);
    } else {
      console.log("NO HAY comprador!!!")
      return options.inverse(this);
    }
  })
}