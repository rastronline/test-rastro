constants = require("../constants"); 

module.exports.updateCategory = (req, res, next) => {
  constants.CATEGORY_SELECTED = req.category || constants.CATEGORY_SELECTED;
  //constants.KEYWORDS = KEYWORDS || "";
  next()
  }