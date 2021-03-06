var express = require("express");
var router=express.Router({mergeParams:true})
var Campground=require("../models/campground")
var Comment=require("../models/comment")

// =====================================================

//COMMENT ROUTES

//======================================================

// 没有登录的用户不能添加新评论
router.get('/new',isLoggedIn,function(req, res) {
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
router.post("/",isLoggedIn,function(req,res){
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

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect('/login');
}

module.exports=router;