var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', function(req,res,next){
  res.status(200).json({
    message: "Wild Success!!"
  })
})
module.exports = router;
