var express = require('express');
var router = express.Router();
const usersController = require('../controllers/users.controller');
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });


/* GET users listing. */
router.get('/:id/edit', usersController.edit);
router.post('/:id/edit', upload.single('profilePic'), usersController.doEdit);
router.post('/upload', upload.single('profilePic'), usersController.uploadProfilePic);

router.get('/:id/myProducts', usersController.listProducts);
router.get('/:id/sold', usersController.listProductsSold);
router.get('/:id/pending', usersController.listProductsPending);

module.exports = router;
