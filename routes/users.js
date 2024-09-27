const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const passport=require("passport");
const {saveRedirectUrl}=require("../middlewares.js");
const usersControllers=require("../controllers/user.js");

router.route("/signup")
.get(usersControllers.signupForm)
.post(usersControllers.signedUp);

router.route("/login")
.get(usersControllers.loginForm)
.post(saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/users/login",
    failureFlash: true,
  }),usersControllers.loggedIn
);

router.get("/logout",usersControllers.logout);

module.exports = router;
