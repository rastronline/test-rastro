const constants = require('../constants');
var express = require('express');
var router = express.Router();
const usersController = require('../controllers/users.controller');
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });
const authMiddleware = require('../middlewares/auth.middleware');


/* GET users listing. */
router.get('/:id/edit', authMiddleware.isAuthenticated, usersController.edit);
router.post('/:id/edit', authMiddleware.isAuthenticated, upload.single('profilePic'), usersController.doEdit,);
//router.post('/upload', upload.single('profilePic'), usersController.uploadProfilePic);

router.get('/:id/selling', authMiddleware.isAuthenticated, usersController.listArticlesSelling);
router.get('/:id/sold', authMiddleware.isAuthenticated, usersController.listArticlesSold);
router.get('/:id/pricing', authMiddleware.isAuthenticated, usersController.listArticlesPricing);
router.get('/:id/favorites', authMiddleware.isAuthenticated, usersController.listFavorites);
router.post('/:id/delete', authMiddleware.checkRole(constants.ROLES.ROLE_ADMIN), usersController.doDelete);
router.post('/:articleId/handleDecisionUser', authMiddleware.isAuthenticated, usersController.doHandleDecisionUser);



module.exports = router;
