var mongoose = require("mongoose"),
Campground = require("./models/campground"),
Comment =  require("./models/comment");

var data =[
    {
        name:"sea",
        image:"https://www.outwardbound.org/lib/image/thumbs/2016_Course_Title_Page_Photos_NCOBS_Ten_Thousand_Islands_Sea_Kayaking_Camp.View.Kayak.FL.1_WebEdit_720_450_crop_fill.jpg",
        description:"Camping is an outdoor activity involving overnight stays away from home in a shelter, such as a tent. Generally participants leave developed areas to spend time outdoors in more natural ones in pursuit of activities providing them enjoyment. To be regarded as 'camping' a minimum of one night is spent outdoors, distinguishing it from day-tripping, picnicking, and other similarly short-term recreational activities. Camping can be enjoyed through all four seasons."
    },
    {
        name:"mountain",
        image:"http://phoenixpopup.com/wp-content/uploads/2014/05/bigstock-Tent-in-the-hikers-camp-in-mou-49619450.jpg",
        description:"blah blah blah blah"
    },
    {
        name:"forest",
        image:"https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/old-trappers-cabin-on-byers-lake-cabin-eclectic-edge-photography-kevin-holton-diana-jennings.jpg",
        description:"blah blah blah blah"
    }
]

function seedDB(){
   //Remove all campgrounds
   Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
         //add a few campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err)
                } else {
                    console.log("added a campground");
                    //create a comment
                    Comment.create(
                        {
                            text: "This place is great, but I wish there was internet",
                            author: "Homer"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created new comment");
                            }
                        });
                }
            });
        });
    }); 
}


module.exports = seedDB;