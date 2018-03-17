var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

//=================
//campground route
//=================

//index show all campgrounds
router.get("/",function(req,res){
    //get grounds from db
    Campground.find({},function(err,campgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/index",{campgrounds:campgrounds,currentUser:req.user});
        }
    })
});

//create -add new campground 
router.post("/",isLoggedIn,function(req,res){
   var name = req.body.name;
   var image = req.body.image;
   var description = req.body.description;
   var author = {
       id:req.user._id,
       username:req.user.username
   }
   var newCamp = {name :name, image:image,description:description,author:author};
   Campground.create(newCamp,function(err,newCamp){
       if(err){
           console.log(err);
       }
   })
   res.redirect("/campgrounds");
});

//new -shows form to create new campground
router.get("/new",isLoggedIn,function(req, res) {
   res.render("campgrounds/new"); 
});

// SHOW - shows more info about one campground
router.get("/:id",function(req, res) {
    //为了显示comment 而不是ID 用populate
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
       if(err){
           console.log("error");
       } else{
           //render show template with that ground
        res.render("campgrounds/show",{campground: foundCampground});
       }
    });
});

//判断是否login
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;