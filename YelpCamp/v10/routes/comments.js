var express = require("express");
var router=express.Router({mergeParams:true})
var Campground=require("../models/campground")
var Comment=require("../models/comment")
var middleware=require("../middleware")

// =====================================================

//COMMENT ROUTES

//======================================================

// 没有登录的用户不能添加新评论
router.get('/new',middleware.isLoggedIn,function(req, res) {
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
router.post("/",middleware.isLoggedIn,function(req,res){
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
                    // add user name and id to comment
                    comment.author.id=req.user._id;
                    comment.author.username=req.user.username;
                    // console.log("New comment's username will be "+req.user.username);
                    
                    //save comment
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    console.log(comment);
                    res.redirect('/campgrounds/'+campground._id)
                }
            })
        }
    })
    // create new comment
    //connect new comment to campground
    //redirect campground show page
})

router.get("/:comment_id/edit",middleware.checkCommentOwnership,function(req,res){
    Comment.findById(req.params.comment_id,function(err,foundComment){
        if(err){
            res.redirect("/back");
        }else{
            res.render("comments/edit",{campground_id:req.params.id,comment:foundComment});
        }
    });
});

//COMMENT UPDATE
router.put("/:comment_id",function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComment){
        if(err){
            res.redirect("back")
        }
        else{
            res.redirect("/campgrounds/"+req.params.id)
        }
    })
})

// COMMENT DESTROY ROUTE
router.delete("/:comment_id",middleware.checkCommentOwnership,function(req,res){
    // find by id and remove
    Comment.findByIdAndRemove(req.params.comment_id,function(err){
        if(err){
            res.redirect("back")
        }
        else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    })
})




module.exports=router;