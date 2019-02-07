var express=require('express');
var app=express();
var bodyParser=require('body-parser')
var mongoose=require('mongoose')
var Campground=require("./models/campground");
var seedDB=require('./seeds')
var Comment=require("./models/comment")
var passport=require('passport');
var localStrategy=require("passport-local");
var methodOverride=require("method-override");
var User=require("./models/user")
var expressSession=require("express-session");
var flash=require("connect-flash");

var commentRoutes=require("./routes/comments");
var campgroundRoutes=require("./routes/campgrounds");
var indexRoutes=require("./routes/index")

mongoose.connect('mongodb://localhost:27017/yelp_camp_v6', { useNewUrlParser: true });
app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended:true}));

// 这里使用public文件夹下问价可以直接static或者__dirname+文件夹目录
// 这里注意，__dirname是工程文件目录/home/ubuntu/workspace/YelpCamp/v5
// __dirname方法更可靠因为工程文件目录更改时也能生效
app.use(express.static(__dirname+'/public'));
app.use(methodOverride("_method"));
app.use(flash());
console.log(__dirname);
// seedDB();//seed the database

//PASSPORT CONFIGURATION
app.use(expressSession({
    secret:"encode the password",
    resave:false,
    saveUninitialized:false
}))
app.use(passport.initialize());
app.use(passport.session());
// User.authenticate()是包含在passportLocalMongoose中的
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// 这里通过写一个所有route都会跑的middleware，就不用再给每一个route传currentUser的参数了
app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   
//   在全局设置message object，因为这个flash message如果只传给login.ejs那么signup界面就会出Bug, message undefined
   res.locals.error=req.flash("error");
   res.locals.success=req.flash("success");
   next();
});

// 这里写 / 等于没写
app.use("/",indexRoutes);
// 这里加上/campgrounds可以让使router里面不用加/campgrounds
app.use("/campgrounds",campgroundRoutes);
// 这里如果用了"/campgrounds/:id/comments"，在登录用户以后写评论没法写，因为findbyid时req.params.id没有传过去
// 这里需要在comments里面mergeParams设置为true
app.use("/campgrounds/:id/comments",commentRoutes);

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Yelpcamp has started!")
})
