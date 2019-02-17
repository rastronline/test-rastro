module.exports = (hbs) => {
  hbs.registerHelper("publicationDate", (date, options) => {
    return new Date(date).toUTCString();
  })
}