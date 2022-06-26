const cookieSession = require("cookie-session");
const express = require("express");
const cors = require("cors");
const passportSetup = require("./passport");
const passport = require("passport");
const authRoute = require("./routes/auth");
const app = express();
const mongoose=require('mongoose')
require('dotenv').config()
app.use(cors())
app.use(express.json())

app.use(
  cookieSession({ name: "session", keys: ["lama"], maxAge: 24 * 60 * 60 * 100 })
);
mongoose.connect(process.env.URL,()=>{
  console.log("Mongo db connected");
})

app.use(passport.initialize());
app.use(passport.session());



app.use("/auth", authRoute);

app.listen("5000", () => {
  console.log("Server is running!");
});