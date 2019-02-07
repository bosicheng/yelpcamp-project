// all the middleware goes here
var Campground=require("../models/campground");
var Comment=require("../models/comment")
var middlewareObj={
    
}

middlewareObj.checkCampgroundOwnership=function(req,res,next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id,function(err,foundCampground){
            if(err){
                req.flash("error","Campground not found");
                res.redirect("back");
            }
            else{
                 // does the user own the campground?
                // 这里不要使用  if(foundCampground.author.id==req.iser._id)来判断是不是当前用户！！！
                //原因是req.iser._id是String，但是foundCampground.author.id是一个mongoose object，即使print出来他们也都是一样的，但是实际形式不一样
                //这是一个非常tricky的问题
                //mongoose提供了equals方法可以判断是否相等
                if(foundCampground.author.id.equals(req.user._id)){
                    next();
                }else{
                    req.flash("error","You don't have permission to do that");
                    res.redirect("back");
                }
        }
    });
    }else{
        req.flash("error","You need to be logged in to do that");
        res.redirect("back")
    }
}

middlewareObj.checkCommentOwnership=function(req,res,next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id,function(err,foundComment){
            if(err){
                res.redirect("back");
            }
            else{
                 // does the user own the campground?
                // 这里不要使用  if(foundCampground.author.id==req.iser._id)来判断是不是当前用户！！！
                //原因是req.iser._id是String，但是foundCampground.author.id是一个mongoose object，即使print出来他们也都是一样的，但是实际形式不一样
                //这是一个非常tricky的问题
                //mongoose提供了equals方法可以判断是否相等
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                }else{
                    req.flash("error","You don't have permission to do that")
                    res.redirect("back");
                }
        }
    });
    }else{
        req.flash("error","You need to be logged in to do that")
        res.redirect("back")
    }
}

middlewareObj.isLoggedIn=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    // 把Please Login First!传送到middleware的login route然后再到login.ejs界面
    req.flash("error","Please Login First!");
    res.redirect('/login');
}
 
 module.exports = middlewareObj