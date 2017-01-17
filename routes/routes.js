var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
  res.send('welcome to immigrnt');

});

module.exports = router
