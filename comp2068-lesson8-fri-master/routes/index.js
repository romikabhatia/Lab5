var express = require('express');
var router = express.Router();

// link to the account model for registration & login
var Account = require('../models/account');

// reference passport
var passport = require('passport');
var flash = require('connect-flash');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Lesson 8',
    message: 'Passport Authentication (Local) - Part 1',
    user: req.user
  });
});

/* GET register */
router.get('/register', function(req, res, next) {
  res.render('register', {
    title: 'Register',
    user: req.user
  });
});

/* POST register */
router.post('/register', function(req, res, next) {
  // use the Account model and passort to create a new user
  Account.register(new Account(
    { username: req.body.username }),
    req.body.password,
    function(err, account) {
      if (err) {
        console.log(err);
        res.redirect('/register');
      }
      else {
        res.redirect('/login');
      }
    });
});

/* GET login */
router.get('/login', function(req, res, next) {

  var messages = req.session.messages || []; //flash.message;

  // clear the session messages
  req.session.messages = [];

  res.render('login', {
    title: 'Login',
    messages: messages,
    user: req.user
  });
});

/* POST login */
router.post('/login', passport.authenticate('local', {
  successRedirect: '/drinks',
  failureRedirect: '/login',
  failureMessage: 'Invalid Login',
  failureFlash: true
}));

/* GET logout */
router.get('/logout', function(req, res, next) {
  // log the user out and redirect
  req.logout();
  res.redirect('/login');
});

module.exports = router;
