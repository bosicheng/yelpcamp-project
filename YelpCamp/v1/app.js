var express=require('express');
var app=express();
var bodyParser=require('body-parser')

app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',function(req,res){
    res.render("landing");
})

var campgrounds=[
        {name:'aaa',image:'https://farm4.staticflickr.com/3241/2984981452_e9008b9280.jpg'},
        {name:'bbb',image:'https://farm7.staticflickr.com/6089/6094103869_d53a990c83.jpg'},
        {name:'ccc',image:'https://farm8.staticflickr.com/7284/8744029089_2d4a4d0fd7.jpg'},
        {name:'aaa',image:'https://farm4.staticflickr.com/3241/2984981452_e9008b9280.jpg'},
        {name:'bbb',image:'https://farm7.staticflickr.com/6089/6094103869_d53a990c83.jpg'},
        {name:'ccc',image:'https://farm8.staticflickr.com/7284/8744029089_2d4a4d0fd7.jpg'},
        {name:'aaa',image:'https://farm4.staticflickr.com/3241/2984981452_e9008b9280.jpg'},
        {name:'bbb',image:'https://farm7.staticflickr.com/6089/6094103869_d53a990c83.jpg'},
        {name:'ccc',image:'https://farm8.staticflickr.com/7284/8744029089_2d4a4d0fd7.jpg'},
    ];

app.get('/campgrounds',function(req,res){
    res.render("campgrounds",{campgrounds:campgrounds})
})

app.get('/campgrounds/new',function(req,res){
    res.render('new')
})

// 这里虽然get和post的url是同一个，但是他们是不同的用法所以是不同的route不会相互影响
//如果对get的/campgrounds页面进行修改，post请求去修改campgrounds也应该同样的url，这是convention
app.post("/campgrounds",function(req,res){
    //get data from form and add to campground
    var name=req.body.name;
    var image=req.body.image;
    campgrounds.push({name:name,image:image});
    //redirect to campground page
    res.redirect('/campgrounds')
})

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Yelpcamp has started!")
})
