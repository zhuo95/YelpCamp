var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
mongoose.connect("mongodb://localhost/yelp_camp")

//schema setup
var campgroundSchema = new mongoose.Schema({
   name:String,
   image:String,
   description:String
});
var Campground = mongoose.model("Campground",campgroundSchema);

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

app.get("/campgrounds",function(req,res){
    //get grounds from db
    Campground.find({},function(err,campgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("index",{campgrounds:campgrounds});
        }
    })
});

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

app.get("/campgrounds/new",function(req, res) {
   res.render("new"); 
});

app.get("/remove/:id",function(req, res) {
    Campground.remove({_id:req.params.id},function(err){
        if(err){
            console.log(err);
        }else{
            res.redirect("/campgrounds");
        }
    });
});

app.get("/campgrounds/:id",function(req, res) {
    Campground.findById(req.params.id,function(err,foundCampground){
       if(err){
           console.log("error");
       } else{
           //render show template with that ground
        res.render("show",{campground: foundCampground});
       }
    });
});


app.listen(process.env.PORT,process.env.IP,function(){
   console.log("Started at"+process.env.PORT); 
});