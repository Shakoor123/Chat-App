const express=require('express');
const app=express();
const mongoose=require('mongoose')
const passport=require('passport')
const User=require('./models/user')
//database connection
mongoose.connect('mongodb+srv://shakoor:shakoor@cluster0.40mzq.mongodb.net/?retryWrites=true&w=majority',()=>{
    console.log("Mongoose connected");
});
//server running
app.listen(5000,()=>{
    console.log("server running");
})



const session = require('express-session');
// After you declare "app"
app.use(session({ secret: 'melody hensley is my spirit animal' }));
let pro;
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var GOOGLE_CLIENT_ID= "895657809795-1r3fhcmf6icsgl2kb3o3qghiu6emblhl.apps.googleusercontent.com"
var GOOGLE_CLIENT_SECRET= "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"
passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
      },
      function (accessToken, refreshToken, profile, done) {
        pro=profile
        done(null, profile);
      }
    )
  );
  


  app.get("/auth/google", passport.authenticate("google", { scope: ["profile"] }));

  app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      successRedirect: '/login/success',
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

app.get("/login/success",async (req, res) => {
    let profile=await pro;
    if (    profile) {
        try {

            const newUser=await new User({
                googleId:profile.id,
                name:profile.displayName,
                image:profile.photos[0].value,
            })
            console.log(newUser);
            
            const user=await newUser.save();
            res.status(200).json(user)
            } catch (err) {
                res.status(500).json(err)
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