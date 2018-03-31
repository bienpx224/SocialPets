/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var passport = require('passport');

module.exports = {

  // login action will render the login view
  login: function (req, res) {
    res.view();
  },

  // logout action will logout using Passport
  // and redirect
  logout: function(req, res) {
    req.logout();
    res.redirect('/home');
  },

  // Here is were we specify our facebook strategy.
  // https://developers.facebook.com/docs/
  // https://developers.facebook.com/docs/reference/login/
  // Facebook login screen
    facebook: function (req, res) {

        sails.log.info("+ AUTH.FACEBOOK");
        passport.authenticate('facebook', {failureRedirect: '/login'}, function (err, user) {

            sails.log.info("Facebook Auth Response error=", err, "user=", user);

            if (user) {
                req.logIn(user, function (err) {

                    if (err) {
                        sails.log.info("Auth Error", err);
                        return res.view('500');
                    }

                    return res.redirect('/login');

                });
            } else {
                return res.redirect('/');
            }

        })(req, res);
    }

};

