var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");

 var campgrounds = [
        {name:"Galaxy",image:"https://cdn.pixabay.com/photo/2015/07/10/17/24/night-839807_1280.jpg"},
        {name:"Volkswagen",image:"https://cdn.pixabay.com/photo/2014/05/03/00/42/vw-camper-336606_1280.jpg"},
        {name:"Caravan",image:"https://cdn.pixabay.com/photo/2018/02/05/13/15/caravan-3132180_1280.jpg"},
        {name:"Galaxy",image:"https://cdn.pixabay.com/photo/2015/07/10/17/24/night-839807_1280.jpg"},
        {name:"Volkswagen",image:"https://cdn.pixabay.com/photo/2014/05/03/00/42/vw-camper-336606_1280.jpg"},
        {name:"Caravan",image:"https://cdn.pixabay.com/photo/2018/02/05/13/15/caravan-3132180_1280.jpg"},
        {name:"Galaxy",image:"https://cdn.pixabay.com/photo/2015/07/10/17/24/night-839807_1280.jpg"},
        {name:"Volkswagen",image:"https://cdn.pixabay.com/photo/2014/05/03/00/42/vw-camper-336606_1280.jpg"},
];

app.get("/",function(req,res){
   res.render("landing"); 
});

app.get("/campgrounds",function(req,res){
    res.render("campgrounds",{data:campgrounds});
});

app.post("/campgrounds",function(req,res){
   var name = req.body.name;
   var image = req.body.image;
   var newCamp = {name :name, image:image};
   campgrounds.push(newCamp);
   res.redirect("/campgrounds");
});

app.get("/campgrounds/new",function(req, res) {
   res.render("new"); 
});

app.listen(process.env.PORT,process.env.IP,function(){
   console.log("Started at"+process.env.PORT); 
});