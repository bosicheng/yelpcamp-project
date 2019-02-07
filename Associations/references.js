var mongoose=require("mongoose");
mongoose.connect('mongodb://localhost:27017/blog_demo_2', { useNewUrlParser: true });


// 在node中设置路径时在该路径下要写./ ！！！不可以什么都不写
var Post=require('./models/post');
var User=require('./models/user');

Post.create({
    title:"How to cook the best burger pt.2",
    content:'blahblah',
},function(err,post){
    User.findOne({
        email:"bob@gmail.com"
    },function(err,foundUser){
        if(err){
            console.log(err)
        }
        else{
            foundUser.posts.push(post);
            // 这里不写save指令的话数据库里的bob对象posts属性不会变，必须save
            foundUser.save(function(err,data){
                if(err){
                    console.log(err)
                }
                else{
                    console.log(data)
                }
            })
        }
    })
})


//Find User
//Find all posts for that user
// 这是把user里的posts里的ObjectId直接换成对应的对象
User.findOne({email:'bob@gmail.com'}).populate('posts').exec(function(err,user){
    if(err){
        console.log(err)
    }
    else{
        console.log(user)
    }
})