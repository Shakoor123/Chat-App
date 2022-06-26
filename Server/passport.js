const GoogleStrategy = require("passport-google-oauth20").Strategy;
require('dotenv').config()

const passport = require("passport");

GOOGLE_CLIENT_ID =process.env.GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET =process.env.GOOGLE_CLIENT_SECRET

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);


passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});