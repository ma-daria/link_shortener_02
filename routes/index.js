let express = require('express');
let router = express.Router();

/**
 * роутер для страницы 'index'
 */
router.get('/', function(req, res) {
  let link = null;
  res.render('index', {
    link: link
  });
});

module.exports = router;
