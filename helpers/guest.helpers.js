const constants = require('../constants');

module.exports = (hbs) => {
  hbs.registerHelper("isGuest", (user, options) => {

    console.log("DENTRO DEL GUEST; SESSION ES =>", user)
    if (user.role === constants.ROLES.ROLE_GUEST) {
      console.log("es guesttt")
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  })
}
