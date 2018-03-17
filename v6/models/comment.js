var mongoose = require("mongoose");

var commentSchema = mongoose.Schema({
   author:{
      id:{
         type:mongoose.Schema.Types.ObjectId,
         ref:"User"
      },
      username:String
   },
   text:String,
   created:{type:Date,default:Date.now},
   star:Number
});

module.exports = mongoose.model("Comment",commentSchema);