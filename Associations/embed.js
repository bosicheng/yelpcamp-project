var mongoose=require("mongoose");
mongoose.connect('mongodb://localhost:27017/blog_demo', { useNewUrlParser: true });

//POST-title,content
var postSchema=mongoose.Schema({
    title:String,
    content:String,
})

var Post=mongoose.model('Post',postSchema);

//USER-email,name
var userSchema=mongoose.Schema({
    email:String,
    name:String,
    posts:[postSchema]
})
var User=mongoose.model('User',userSchema);


// var newUser=new User({
//     email:'hermione@hogwarts.edu',
//     name:'Hermione Granger',
//     // 这里需要注意的是里面传的不是Post是postSchema并且postSchema定义要在上面
// })


// newUser.posts.push({
//     title:'aaa',
//     content:'bbb',
// })

// newUser.save(function(err,user){
// // 运行完save以后这时blog_demo数据库下出现users collection
//     if(err){
//         console.log(err)
//     }
//     else{
//         console.log(user)
//     }
// })

// var newPost=new Post({
//     title:"Reflection on apples",
//     content:"they are delicious"
// })
// newPost.save(function(err,post){
//     if(err){
//         console.log(err)
//     }
//     else{
//         console.log(post)
//     }
// })

User.findOne({name: 'Hermione Granger'},function(err,user){
    if(err){
        console.log(err);
    }
    else{
        user.posts.push({
            title:"three things I like",
            content:"macbook macbook macbook",
        });
        user.save(function(err,user){
            if(err){
                console.log(err)
            }
            else{
                console.log(user)
            }
        })
    }
})
