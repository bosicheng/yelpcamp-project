var express=require('express');
var app=express();
var bodyParser=require('body-parser')
var mongoose=require('mongoose')

mongoose.connect('mongodb://localhost:27017/yelp_camp', { useNewUrlParser: true });

app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended:true}));

//SCHEMA SETUP
var campgroundSchema=new mongoose.Schema({
    name:String,
    image:String,
    description:String,
})

var Campground=mongoose.model("Campground",campgroundSchema);

// Campground.create({
//         name:"Granite Hill",
//         image:"https://pixabay.com/get/e834b5062cf4033ed1584d05fb1d4e97e07ee3d21cac104491f0c279afe8bdba_340.jpg",
//         description:"This is a huge granite hill!"
//     },function(err,newlyCreated){
//         if(err){
//             console.log(err)
//         }
//         else{
//             console.log('newly created:');
//             console.log(newlyCreated);
//         }
// })


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
            res.render("index",{campgrounds:allCampgrounds})
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
    res.render('new')
})

//SHOW - show the detail of one campground
app.get('/campgrounds/:id',function(req,res){
    //find the campground with provided ID,use req.params.id
    // 然后使用mongoose中方法.findById找到对象，需要ID唯一
    Campground.findById(req.params.id,function(err,foundCampground){
        if(err){
            console.log("err")
        }
        else{
            res.render('show',{campground:foundCampground})
        }
    })
})


app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Yelpcamp has started!")
})
