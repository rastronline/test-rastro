const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/sessions/create');
  //res.render('index', { title: 'Express' });
});

module.exports = router;
