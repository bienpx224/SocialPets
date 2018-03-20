var passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy
    //Other strategies go here
;

var verifyHandler = function(token, tokenSecret, profile, done) {
  console.log("verify Handler"); console.log(profile);
  process.nextTick(function() {  console.log('hihi');

    User.findOne({uid: profile.id}, function(err, user) {
      if (user) {   console.log("user in findOne");console.log(user);
        return done(null, user);
      } else {

        var data = {
          provider: profile.provider,
          uid: profile.id,
          name: profile.displayName
        };

        if (profile.emails && profile.emails[0] && profile.emails[0].value) {
          data.email = profile.emails[0].value;
        }
        if (profile.name && profile.name.givenName) {
          data.firstname = profile.name.givenName;
        }
        if (profile.name && profile.name.familyName) {
          data.lastname = profile.name.familyName;
        }

        User.create(data, function(err, user) { console.log("user in create");console.log(user);
          return done(err, user);
        });
      }
    });
  });
};

passport.serializeUser(function(user, done) { console.log('serializeUser');
  done(null, user.uid);
});

passport.deserializeUser(function(uid, done) { console.log('deserializeUser');
  User.findOne({uid: uid}, function(err, user) {
    done(err, user);
  });
});

module.exports.http = {

  customMiddleware: function(app) {

    passport.use(new FacebookStrategy({
      clientID: "168504457034504", // Use your Facebook App Id
      clientSecret: "d44b3c92efb903b81da8230a99845d2e", // Use your Facebook App Secret
      callbackURL: "http://localhost:1337/auth/facebook/callback"
    }, verifyHandler));

    app.use(passport.initialize());
    app.use(passport.session());
  }
};
