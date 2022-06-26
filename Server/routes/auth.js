const router = require("express").Router();
const passport = require("passport");
const User=require('../models/user');
const mongoose=require('mongoose')
const CLIENT_URL = "http://localhost:5000/";

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
      //   cookies: req.cookies
    });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_URL);
});

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: '/auth',
    failureRedirect: "/login/failed",
  })
);
router.get('/',async(req,res)=>{
    if(req.user){
        try {
            console.log(req.user.id);
            User.findOne({ googleId:req.user.id}).then((res)=>{
                console.log("hi");
                res.json(res)
            })
            console.log(cuser);
            if (cuser) {
                
                res.status(200).json(cuser)
  
            }else{
                const newUser=await new User({
                    googleId:profile.id,
                    name:profile.displayName,
                    image:profile.photos[0].value,
                })
                
                const user=await newUser.save();

                res.status(200).json(user._doc)  
            }

            
         } catch (err) {
            console.log("err");
             res.status(500).json(err) 
        }
    }
})
module.exports = router