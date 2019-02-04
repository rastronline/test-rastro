const express = require('express');
const router = express.Router();
const articlesController = require('../controllers/articles.controller');


/* GET home page. */
router.get('/', articlesController.list);
router.get('/new', articlesController.create);
router.get('/:id', articlesController.get);
router.post('/:id/delete', articlesController.delete);
router.get('/user/:userId', articlesController.listByUser);
//router.get('/new', articlesController.create);
//router.post('/:ownerId/new', articlesController.doCreate);

module.exports = router;
