var express=require("express");
var app=express();
var mongoose=require('mongoose');
var passport=require("passport");
var bodyParser=require('body-parser');
var localStrategy=require('passport-local');
var passportLocalMongoose=require("passport-local-mongoose");
var User=require("./models/user");
var expressSession=require("express-session");

mongoose.connect("mongodb://localhost/auth_demo_app",{ useNewUrlParser: true });

app.use(expressSession({
    // 这里的secret是用来编码和解码进程的
    // 因为在进程中我们不会把数据存储为普通的英语
    secret:"aaa",
    resave:false,
    saveUninitialized:false
}))

app.use(passport.initialize());
app.use(passport.session());

// 这两行代码是负责从进程中读取数据并进行编码和解码
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new localStrategy(User.authenticate()));

app.set('view engine','ejs')

// 只要用form表单传数据都需要用到这行代码
app.use(bodyParser.urlencoded({extended:true}));

//ROUTES

app.get('/',function(req,res){
    res.render('home')
})

// 使用middleware操作阻止直接进入secret页，需要判断是否loggedin
app.get('/secret',isLoggedIn,function(req,res){
    res.render('secret')
})

//Authentication ROUTES
//show sign up form
app.get('/register',function(req,res){
    res.render('register')
})

app.post('/register',function(req,res){
    // 这里的逻辑是：form表单提交了req.body.username
    // 然后    .register方法新建user对象把username和传过来的username hash成对，再单独传password
    // 建立账户密码以后可以去数据库中查看，可以发现密码被编码成很长的一串
    User.register(new User({username:req.body.username}),req.body.password,function(err,user){
        if(err){
            console.log(err)
            return res.render('register')
        }
        passport.authenticate("local")(req, res, function(){
           res.redirect("/secret");
        });
    })
})

//LOGIN ROUTE
app.get('/login',function(req,res){
    res.render('login')
})

//login logic
// 但是这里不能直接post，是需要检测账号密码是否正确
//middleware: run before the final route callback,在route的开始和结束中间
app.post('/login',passport.authenticate('local',{
    successRedirect:'/secret',
    failureRedirect:'/login'
}),function(req,res){
    
})


app.get('/logout',function(req,res){
    // 下面指令的意义是passport会清除user所有在进程中的数据
    req.logout();
    res.redirect('/login')
})

// 这里的next指的就是最后一个route，也就是final callback
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        // 继续下一步
        return next();
    }
    res.redirect('/login')
}



app.listen(process.env.PORT,process.env.IP,function(){
    console.log('Server Started!')
})