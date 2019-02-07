var mongoose=require('mongoose')

var commentSchema=mongoose.Schema({
    text:String,
    // why the author's an object not a string
    // because we want it to disappear when a user is logged in (automatically know who the user is)
    author:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        username:String
    }
});

module.exports=mongoose.model("Comment",commentSchema)