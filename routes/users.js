var express = require('express');
var router = express.Router();

// link to the account model
var Account = require('../models/account');

// authentication checking
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
  {
    next();
  }
  else
    {
    res.redirect('/ login');
  }
}
/* GET users listing */
router.get('/', function(req, res, next)
{
  Account.find(function(err, Username)
  {
    if (err)
    {
      console.log(err);
      res.render('error');
    }
    else
      {
      // loading the users page
      res.render('users',
          {
        title:"Users",
        users: Username,
        user: req.user
      });
    }
  });
});

module.exports = router;








