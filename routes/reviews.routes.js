const express = require('express');
const router = express.Router();
const reviewsController = require('../controllers/reviews.controller');
const multer  = require('multer');
//const upload = multer({ dest: 'uploads/' });
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/:articleId/addReview', authMiddleware.isAuthenticated, reviewsController.addReview);

module.exports = router;