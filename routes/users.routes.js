const constants = require('../constants');
var express = require('express');
var router = express.Router();
const usersController = require('../controllers/users.controller');
//const multer  = require('multer');
const upload = require("../configs/multer.config");
//const parser = require("../configs/cloudinary.config");
//const upload = multer({ dest: 'uploads/' });
const authMiddleware = require('../middlewares/auth.middleware');
const articlesMiddleware = require('../middlewares/articles.middleware');

/* GET users listing. */
router.get('/edit', authMiddleware.isAuthenticated, articlesMiddleware.updateCategory, usersController.edit);
//router.post('/updateProfilePic', authMiddleware.isAuthenticated, upload.single('profilePic'), usersController.uploadPhotoProfile);
router.post('/updateProfilePic', authMiddleware.isAuthenticated, upload.single('profilePic'), usersController.uploadPhotoProfile);

router.post('/edit', authMiddleware.isAuthenticated, usersController.doEdit,);
//router.post('/edit', authMiddleware.isAuthenticated, parser.single('profilePic'), usersController.doEdit,);
//router.post('/upload', upload.single('profilePic'), usersController.uploadProfilePic);
router.get('/purchases',  authMiddleware.isAuthenticated, usersController.listArticlesBought);
router.get('/selling', authMiddleware.isAuthenticated, usersController.listArticlesSelling);
router.get('/auctioning', authMiddleware.isAuthenticated, usersController.listArticlesAuctioning);
router.get('/sold', authMiddleware.isAuthenticated, usersController.listArticlesSold);
router.get('/pricing', authMiddleware.isAuthenticated, usersController.listArticlesPricing);
router.get('/favorites', authMiddleware.isAuthenticated, usersController.listFavorites);
router.post('/:id/delete', authMiddleware.checkRole(constants.ROLES.ROLE_ADMIN), usersController.doDelete);
router.post('/handleDecisionArticle/:articleId', authMiddleware.isAuthenticated, usersController.doHandleDecisionArticle);

module.exports = router;
