var express = require("express");
var router = express.Router({mergeParams:true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");

//===============
// comment routes 
//===============

//add new form
router.get("/new",isLoggedIn,function(req, res) {
    Campground.findById(req.params.id,function (err,campground) {
        if(err){
            console.log(err);
        }else{
            res.render("comments/new",{campground:campground});         
        }
    })
   
});

//add new comment
router.post("/",isLoggedIn,function(req,res){
   Campground.findById(req.params.id,function(err, campground) {
       if(err){
           console.log(err);
       }else{
           Comment.create(req.body.comment,function(err,comment){
               if(err){
                   console.log(err);
               }else{
                   //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                  //save comment
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/"+campground._id);
               }
           });
       }
       
   }) ;
});

//判断是否login
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;