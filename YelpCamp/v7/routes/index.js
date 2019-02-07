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
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
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
    res.redirect('/campgrounds')
})


function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect('/login');
}

module.exports=router;