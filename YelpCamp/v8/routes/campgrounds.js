var express = require("express");
var router=express.Router()
var Campground=require("../models/campground")
// INDEX - show all campgrounds
router.get('/',function(req,res){
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
router.post("/",function(req,res){
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
router.get('/new',function(req,res){
    res.render('campgrounds/new')
})

//SHOW - show the detail of one campground
router.get('/:id',function(req,res){
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

module.exports=router;

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect('/login');
}