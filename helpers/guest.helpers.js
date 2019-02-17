const constants = require('../constants');

module.exports = (hbs) => {
  hbs.registerHelper("isGuest", (user, options) => {
    if (user.role === constants.ROLES.ROLE_GUEST) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  })
}
