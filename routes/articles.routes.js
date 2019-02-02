const express = require('express');
const router = express.Router();
const articlesController = require('../controllers/articles.controller');


/* GET home page. */
router.get('/', articlesController.list);
router.get('/:id', articlesController.get);
router.get('/user/:id', articlesController.listByUser);

module.exports = router;
