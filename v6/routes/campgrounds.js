var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

//=================
//campground routes
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
router.post("/",middleware.isLoggedIn,function(req,res){
   var name = req.body.name;
   var image = req.body.image;
   var description = req.body.description;
   var price = req.body.price;
   var author = {
       id:req.user._id,
       username:req.user.username
   }
   var newCamp = {name :name, image:image,price:price ,description:description,author:author};
   Campground.create(newCamp,function(err,newCamp){
       if(err){
           console.log(err);
       }
   })
   res.redirect("/campgrounds");
});

//new -shows form to create new campground
router.get("/new",middleware.isLoggedIn,function(req, res) {
   res.render("campgrounds/new"); 
});

// SHOW - shows more info about one campground
router.get("/:id",function(req, res) {
    //为了显示comment 而不是ID 用populate
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
       if(err||!foundCampground){
           req.flash("error","Campground NOT FOUND");
           res.redirect("back");
       } else{
           //render show template with that ground
        res.render("campgrounds/show",{campground: foundCampground});
       }
    });
});

//Edit campground routes
router.get("/:id/edit",middleware.checkCampgroundOwnership,function(req, res) {
    Campground.findById(req.params.id,function(err,foundedcampground){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/edit",{campground:foundedcampground});
        }
    });
    
});

router.put("/:id",middleware.checkCampgroundOwnership,function(req,res){
   Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,foundCampground){
       if(err){
           console.log(err);
       }else{
           res.redirect("/campgrounds/"+foundCampground._id);
       }
   });
});

//Destroy campground routes
router.delete("/:id",middleware.checkCampgroundOwnership,function(req,res){
   Campground.findByIdAndRemove(req.params.id,function(err,foundedcampground){
      if(err){
          console.log(err);
          res.redirect("/campgrounds");
      }else{
          res.redirect("/campgrounds");
      }
   });
});


module.exports = router;