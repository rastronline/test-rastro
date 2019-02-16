module.exports = (hbs) => {
  hbs.registerHelper("notPhotos", (photos, options) => {
    //return (user.id == article.owner);
    //console.log("PHOTOSS en 'helperr'::=>", photos)
        
    //console.log("hay nombre", typeof(article.buyer));
    if (photos.lenght == 0) {
      //console.log("EXISTE EL COMPRADOR!!!")
      return options.fn(this);
    } else {
      //console.log("NO HAY comprador!!!")
      return options.inverse(this);
    }
  })
}