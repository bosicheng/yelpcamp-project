var express = require("express");
var router=express.Router()
var Campground=require("../models/campground")
var Comment=require("../models/comment")
var passport=require('passport');
var User=require("../models/user")

router.get('/',function(req,res){
    res.render("landing");
})

//=====================

//AUTHENTICATION ROUTES

//=====================

router.get('/register',function(req,res){
    res.render('register')
})


router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            // console.log(err);
            // err 是一个object, obj.message是error的原因
            req.flash("error",err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success","Welcome to YelpCamp "+user.username);
           res.redirect("/campgrounds"); 
        });
    });
});

//show login form
router.get('/login',function(req,res){
    res.render('login')
});

//middleware
//app.post('/login',middleware,callback)
router.post('/login',passport.authenticate('local',
    {
        successRedirect: '/campgrounds',
        failureRedirect: '/login'
    }),function(req,res){
    
})

//logout route
router.get('/logout',function(req,res){
    // 这个logout是已经内置安装好的
    req.logout();
    req.flash("success","Logged you out!")
    res.redirect('/campgrounds')
})


module.exports=router;