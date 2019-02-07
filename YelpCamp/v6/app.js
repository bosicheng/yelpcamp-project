var express=require('express');
var app=express();
var bodyParser=require('body-parser')
var mongoose=require('mongoose')
var Campground=require("./models/campground");
var seedDB=require('./seeds')
var Comment=require("./models/comment")
var passport=require('passport');
var localStrategy=require("passport-local");
var User=require("./models/user")
var expressSession=require("express-session");

mongoose.connect('mongodb://localhost:27017/yelp_camp_v6', { useNewUrlParser: true });
app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended:true}));

// 这里使用public文件夹下问价可以直接static或者__dirname+文件夹目录
// 这里注意，__dirname是工程文件目录/home/ubuntu/workspace/YelpCamp/v5
// __dirname方法更可靠因为工程文件目录更改时也能生效
app.use(express.static(__dirname+'/public'));
console.log(__dirname);
seedDB();

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
   next();
});


//ROUTE

app.get('/',function(req,res){
    res.render("landing");
})

// INDEX - show all campgrounds
app.get('/campgrounds',function(req,res){
    // req.user是此时此刻user的全部信息，如果没有任何用户登录则是undefined
    console.log(req.user);
    // 首先把数据从数据库中取出
    Campground.find({},function(err,allCampgrounds){
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds/index",{campgrounds:allCampgrounds})
        }
    })
})


// 这里虽然get和post的url是同一个，但是他们是不同的用法所以是不同的route不会相互影响
//如果对get的/campgrounds页面进行修改，post请求去修改campgrounds也应该同样的url，这是convention
//CREATE - add new campground to database
app.post("/campgrounds",function(req,res){
    //get data from form and add to campground
    var name=req.body.name;
    var image=req.body.image;
    var desc=req.body.description;
    var newCampground={name:name,image:image,description:desc};
    //Create a new campground and save to database
    Campground.create(newCampground,function(err,newlyCreated){
        if(err){
            console.log(err)
        }
        else{
            console.log(newlyCreated)
        }
    })
    //redirect to campground page
    res.redirect('/campgrounds')
})

//NEW - show form to create new campground
app.get('/campgrounds/new',function(req,res){
    res.render('campgrounds/new')
})

//SHOW - show the detail of one campground
app.get('/campgrounds/:id',function(req,res){
    //find the campground with provided ID,use req.params.id
    // 然后使用mongoose中方法.findById找到对象，需要ID唯一
    // populate用法是campground被comment所填充，那么同时返回comments字段，在show.ejs中可以直接使用
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err){
            console.log("err")
        }
        else{
            res.render('campgrounds/show',{campground:foundCampground})
        }
    })
})

//这里有一个问题，在构造新comment时不能再按照/comments/new，因为每个comment都存在于一个campground中
//我们希望实现的功能是类似于/campgrounds/:id/comment/new


// =====================================================

//COMMENT ROUTES

//======================================================

// 没有登录的用户不能添加新评论
app.get('/campgrounds/:id/comments/new',isLoggedIn,function(req, res) {
    //find campground by id
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err)
        }
        else{
            res.render('comments/new',{campground:campground})
        }
    })
})

// 这里也加了isLoggedIn的原因是这时候用postman不进入new页面也能加评论，这里也block掉
app.post("/campgrounds/:id/comments",isLoggedIn,function(req,res){
    //look up campground by id: req.params.id
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
            res.redirect('/campgrounds')
        }
        else{
            Comment.create(req.body.comment,function(err,comment){
                if(err){
                    console.log(err)
                }
                else{
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect('/campgrounds/'+campground._id)
                }
            })
        }
    })
    // create new comment
    //connect new comment to campground
    //redirect campground show page
})


//=====================

//AUTHENTICATION ROUTES

//=====================

app.get('/register',function(req,res){
    res.render('register')
})


app.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
           res.redirect("/campgrounds"); 
        });
    });
});

//show login form
app.get('/login',function(req,res){
    res.render('login')
});

//middleware
//app.post('/login',middleware,callback)
app.post('/login',passport.authenticate('local',
    {
        successRedirect: '/campgrounds',
        failureRedirect: '/login'
    }),function(req,res){
    
})

//logout route
app.get('/logout',function(req,res){
    // 这个logout是已经内置安装好的
    req.logout();
    res.redirect('/campgrounds')
})


function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect('/login');
}


app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Yelpcamp has started!")
})
