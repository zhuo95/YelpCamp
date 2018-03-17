var Campground = require("../models/campground");
var Comment = require("../models/comment");
var USer = require("../models/users");
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req,res,next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id,function(err, foundedcampground) {
            if(err||foundedcampground){
                req.flash("error","Campground NOT FOUND");
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
        req.flash("error","Please Login first");
      res.redirect("back");  
    }
}

middlewareObj.checkCommentOwnership = function(req,res,next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id,function(err, foundcomment) {
            if(err){
                req.flash("error","Comment NOT FOUND");
                res.redirect("back");
            }else{
                //does user own the campground
                if(foundcomment.author.id.equals(req.user._id)){
                    next();
                }else{
                    req.flash("error","You Don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    }else{
        req.flash("error","Please Login");
        res.redirect("back");  
    }
}

middlewareObj.isLoggedIn = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","Please Login");
    res.redirect("/login");
}


module.exports = middlewareObj;