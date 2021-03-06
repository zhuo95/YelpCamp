var express = require("express");
var router = express.Router({mergeParams:true});
var User = require("../models/users");
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var passport = require("passport");

//===================
// AUTH ROUTES
//===================

router.get("/",function(req,res){
   res.render("landing"); 
});
//sign up form 
router.get("/register",function(req, res) {
   res.render("register"); 
});
//handle singup logic
router.post("/register",function(req, res) {
   User.register(new User({username:req.body.username}),req.body.password,function(err,user){
       if(err){
           req.flash("error",err.message);
           return res.redirect("/register");
       }
       passport.authenticate("local")(req,res,function(){
           req.flash("success","Welcome to YelpCamp "+ user.username)
           res.redirect("/campgrounds");
       })
   }); 
});
//show login form
router.get("/login",function(req, res) {
   res.render("login"); 
});
//handle login logic
router.post("/login",passport.authenticate("local",
    {
        successRedirect:"/campgrounds",
        failureRedirect:"/login"
    }
),function(req, res) {
    
});

//log out
router.get("/logout",function(req, res) {
   req.logout();
   req.flash("success","Successfully Loggedout")
   res.redirect("/campgrounds");
});


module.exports = router;
