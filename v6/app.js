var express = require("express"),
app = express(),
bodyParser = require("body-parser"),
mongoose = require("mongoose"),
flash = require("connect-flash"),
passport = require("passport"),
methodOverride = require("method-override"),
localStrategy = require("passport-local"),
User = require("./models/users"),
Campground  = require("./models/campground"),
Comment = require("./models/comment"),
seedDB = require("./seed");

//require routes
var campgroundRoutes = require("./routes/campgrounds");
var indexRoutes = require("./routes/index");
var commentRoutes = require("./routes/comments");

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.use(flash());
//seedDB();

//passport configuration
app.use(require("express-session")({
    secret:"ZZ best",
    resave:false,
    saveUninitialized:false 
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//让每一个route都有req.user
app.use(function(req,res,next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});
 
app.use("/",indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);




app.listen(process.env.PORT,process.env.IP,function(){
   console.log("Started at"+process.env.PORT); 
});