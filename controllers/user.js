const User=require("../models/user.js");

module.exports.signupForm=(req, res) => {
    res.render("../views/users/signup.ejs");
  }

module.exports.signedUp=async (req, res) => {
    let { email, username, password } = req.body;
    let user = new User({ email, username });
    let newUser = await User.register(user, `${password}`);
    req.login(newUser,(err)=>{
      if(err){
        next(err);
      }
      req.flash("success","Welcome to the PropartEase")
      res.redirect("/listings");
    })
  }

module.exports.loginForm=(req, res) => {
    res.render("../views/users/login.ejs");
  }

module.exports.loggedIn=async (req, res) => {
    req.flash("success","Welcome Back to PropartEase");
    if(res.locals.saveRedirectUrl){
    return res.redirect(res.locals.saveRedirectUrl);
    }
    res.redirect("/listings");
  }

module.exports.logout=(req,res)=>{
    req.logout((err)=>{
      if(err){
        return next(err);
      }
      req.flash("success","You have been succesfully logged out")
      return res.redirect("/listings");
    });
  }