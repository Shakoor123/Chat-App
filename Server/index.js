require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const User = require("./models/user");
const messageRoute = require("./routes/message");
const session = require("express-session");
const cors = require("cors");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const PORT = process.env.PORT || 5000;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

app.use(express.json());
app.use(cors());
app.use("/message", messageRoute);

//database connection
mongoose.connect(process.env.MONGODB_URI, () => {
  console.log("Mongoose connected");
});

//server running
app.listen(PORT, (data) => {
  console.log(`server listening on http://localhost:${PORT}/`);
});

// After you declare "app"
app.use(session({ secret: "melody hensley is my spirit animal" }));
let pro;
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      pro = profile;
      done(null, profile);
    }
  )
);

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/login/success",
    failureRedirect: "/login/failed",
  })
);

//SERIALIZWE

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

//login and logout

app.get("/login/success", async (req, res) => {
  let profile = await pro;
  if (profile) {
    const newUser = await new User({
      googleId: profile.id,
      name: profile.displayName,
      image: profile.photos[0].value,
    });
    try {
      const cuser = await User.findOne({ googleId: profile.id });
      if (cuser) {
        res.status(200).json(cuser);
      } else {
        const user = await newUser.save();
        res.status(200).json(user._doc);
      }
    } catch (err) {
      // const cuser=await User.findOne({ googleId:err.keyValue.googleId })
      res.status(500).json(err);
    }
  }
});

app.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

app.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_URL);
});
