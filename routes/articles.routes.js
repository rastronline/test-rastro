const express = require('express');
const router = express.Router();
const articlesController = require('../controllers/articles.controller');
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });
const authMiddleware = require('../middlewares/auth.middleware')
/* GET home page. */

router.get('/search', authMiddleware.isAuthenticated, articlesController.list);
router.get('/searchInAuction', authMiddleware.isAuthenticated, articlesController.listAuctions);
router.get('/new', authMiddleware.isAuthenticated, articlesController.create);
router.post('/new', authMiddleware.isAuthenticated, upload.array('photos', 10), articlesController.doCreate);
router.get('/:id/edit', authMiddleware.isAuthenticated, articlesController.edit);
router.post('/:id/edit', authMiddleware.isAuthenticated, upload.array('photos', 10), articlesController.doEdit);
router.post('/:articleId/buy', authMiddleware.isAuthenticated, articlesController.buy);
router.post('/:articleId/addToFav', authMiddleware.isAuthenticated, articlesController.addToFav);
router.post('/:articleId/removeFromFav', authMiddleware.isAuthenticated, articlesController.removeFromFav);
router.get('/:id', authMiddleware.isAuthenticated, articlesController.get);
router.post('/:id/delete', authMiddleware.isAuthenticated, articlesController.doDelete);
router.get('/user/:userId', authMiddleware.isAuthenticated, articlesController.listByUser);
//router.get('/new', articlesController.create);
//router.post('/:ownerId/new', articlesController.doCreate);

module.exports = router;
