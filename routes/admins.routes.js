const constants = require('../constants');
var express = require('express');
var router = express.Router();
const adminsController = require('../controllers/admins.controller');
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/', authMiddleware.checkRole(constants.ROLES.ROLE_ADMIN), adminsController.listArticlesPending);
router.get('/listUsers', authMiddleware.checkRole(constants.ROLES.ROLE_ADMIN), adminsController.listUsers);
router.get('/:articleId', authMiddleware.checkRole(constants.ROLES.ROLE_ADMIN), adminsController.detailArticle);
// router.post('/:articleId/sendPricing', authMiddleware.checkRole(constants.ROLES.ROLE_ADMIN), adminsController.sendPricing);
// router.get('/:articleId/refuseArticle', authMiddleware.checkRole(constants.ROLES.ROLE_ADMIN), adminsController.refuseArticle);
router.post('/:articleId/handlePricing', authMiddleware.checkRole(constants.ROLES.ROLE_ADMIN), adminsController.doHandlePricing);


module.exports = router;
