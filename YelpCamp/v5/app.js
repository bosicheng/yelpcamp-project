var express=require('express');
var app=express();
var bodyParser=require('body-parser')
var mongoose=require('mongoose')
var Campground=require("./models/campground");
var seedDB=require('./seeds')
var Comment=require("./models/comment")

seedDB();
mongoose.connect('mongodb://localhost:27017/yelp_camp_v3', { useNewUrlParser: true });
app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended:true}));

// 这里使用public文件夹下问价可以直接static或者__dirname+文件夹目录
// 这里注意，__dirname是工程文件目录/home/ubuntu/workspace/YelpCamp/v5
// __dirname方法更可靠因为工程文件目录更改时也能生效
app.use(express.static(__dirname+'/public'));
console.log(__dirname);

app.get('/',function(req,res){
    res.render("landing");
})

// INDEX - show all campgrounds
app.get('/campgrounds',function(req,res){
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

app.get('/campgrounds/:id/comments/new',function(req, res) {
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

app.post("/campgrounds/:id/comments",function(req,res){
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

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Yelpcamp has started!")
})
