const constants = require("../constants");
var express = require("express");
var router = express.Router();
const adminsController = require("../controllers/admins.controller");
const multer  = require("multer");
//const upload = multer({ dest: "uploads/" });
const upload = require("../configs/multer.config");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/articles/pendings", authMiddleware.checkRole(constants.ROLES.ROLE_ADMIN), adminsController.listArticlesPending);
router.get("/users/", authMiddleware.checkRole(constants.ROLES.ROLE_ADMIN), adminsController.listUsers);
router.get("/articles/:articleId", authMiddleware.checkRole(constants.ROLES.ROLE_ADMIN), adminsController.detailArticle);
// router.post('/:articleId/sendPricing', authMiddleware.checkRole(constants.ROLES.ROLE_ADMIN), adminsController.sendPricing);
// router.get('/:articleId/refuseArticle', authMiddleware.checkRole(constants.ROLES.ROLE_ADMIN), adminsController.refuseArticle);
router.post("/articles/:articleId/handlePricing", authMiddleware.checkRole(constants.ROLES.ROLE_ADMIN), adminsController.doHandlePricing);

module.exports = router;
