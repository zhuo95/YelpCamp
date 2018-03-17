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
           console.log(err);
           return res.render("register");
       }
       passport.authenticate("local")(req,res,function(){
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
   res.redirect("/campgrounds");
});

//判断是否login
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;
