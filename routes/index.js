let express = require('express');
let router = express.Router();


router.get('/', function(req, res, next) {
  let link = null;

  res.render('index', {
    link: link
  });
});

module.exports = router;
