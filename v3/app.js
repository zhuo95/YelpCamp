var express = require("express"),
app = express(),
bodyParser = require("body-parser"),
mongoose = require("mongoose"),
Campground  = require("./models/campground"),
Comment = require("./models/comment"),
seedDB = require("./seed");

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(express.static(__dirname+"/public"));
//seedDB();

//create campground 
/*Campground.create({
    name:"Caravan",
    image:"https://cdn.pixabay.com/photo/2018/02/05/13/15/caravan-3132180_1280.jpg"
},function(err,campground){
   if(err){
       console.log(err);
   }else{
       console.log(campground);
   }
});*/
 
app.get("/",function(req,res){
   res.render("landing"); 
});

//index show all campgrounds
app.get("/campgrounds",function(req,res){
    //get grounds from db
    Campground.find({},function(err,campgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/index",{campgrounds:campgrounds});
        }
    })
});

//create -add new campground 
app.post("/campgrounds",function(req,res){
   var name = req.body.name;
   var image = req.body.image;
   var description = req.body.description;
   var newCamp = {name :name, image:image,description:description};
   Campground.create(newCamp,function(err,newCamp){
       if(err){
           console.log(err);
       }
   })
   res.redirect("/campgrounds");
});

//new -shows form to create new campground
app.get("/campgrounds/new",function(req, res) {
   res.render("campgrounds/new"); 
});

//remove campground from DB
app.get("/remove/:id",function(req, res) {
    Campground.remove({_id:req.params.id},function(err){
        if(err){
            console.log(err);
        }else{
            res.redirect("/campgrounds");
        }
    });
});

// SHOW - shows more info about one campground
app.get("/campgrounds/:id",function(req, res) {
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

//===============
// comment routes 
//===============

app.get("/campgrounds/:id/comments/new",function(req, res) {
    Campground.findById(req.params.id,function (err,campground) {
        if(err){
            console.log(err);
        }else{
            res.render("comments/new",{campground:campground});         
        }
    })
   
});

app.post("/campgrounds/:id/comment",function(req,res){
   Campground.findById(req.params.id,function(err, campground) {
       if(err){
           console.log(err);
       }else{
           Comment.create(req.body.comment,function(err,comment){
               if(err){
                   console.log(err);
               }else{
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/"+campground._id);
               }
           });
       }
       
   }) ;
});

app.listen(process.env.PORT,process.env.IP,function(){
   console.log("Started at"+process.env.PORT); 
});