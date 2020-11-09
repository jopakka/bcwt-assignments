'use strict';
const jwt = require('jsonwebtoken');
const passport = require('passport');

const login = (req, res) => {
  // TODO: add passport authenticate
  console.log('authController login', req.body);
  passport.authenticate('local', {session: false}, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: 'Something is not right',
        user: user,
      });
    }
    req.login(user, {session: false}, (err) => {
      if (err) {
        res.send(err);
      }
      // generate a signed son web token with the contents of user object and return it in the response
      const token = jwt.sign(user, 'your_jwt_secret');
      return res.json({user, token});
    });
  })(req, res);
};

const logout = (req, res) => {
  req.logout();
  res.redirect('./public_html/index3.html');
};

module.exports = {
  login,
  logout,
};