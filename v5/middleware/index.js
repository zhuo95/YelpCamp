var Campground = require("../models/campground");
var Comment = require("../models/comment");
var USer = require("../models/users");
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req,res,next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id,function(err, foundedcampground) {
            if(err){
                res.redirect("back");
            }else{
                //does user own the campground
                if(foundedcampground.author.id.equals(req.user._id)){
                    next();
                }else{
                    res.redirect("back");
                }
            }
        });
    }else{
      res.redirect("back");  
    }
}

middlewareObj.checkCommentOwnership = function(req,res,next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id,function(err, foundcomment) {
            if(err){
                res.redirect("back");
            }else{
                //does user own the campground
                if(foundcomment.author.id.equals(req.user._id)){
                    next();
                }else{
                    res.redirect("back");
                }
            }
        });
    }else{
      res.redirect("back");  
    }
}

middlewareObj.isLoggedIn = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


module.exports = middlewareObj;