var mongoose=require('mongoose');
//SCHEMA SETUP
var campgroundSchema=new mongoose.Schema({
    name:String,
    image:String,
    description:String,
    // 如果没有这个comments属性会出bug，因为seeds.js用到了push
    // 这个就是association
    comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
})

module.exports=mongoose.model("Campground",campgroundSchema);
