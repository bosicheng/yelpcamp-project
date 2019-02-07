var express=require("express");
var app=express();

// 这里要加__dirname+  视频里是错的,这里最后的横线留到link里去打！
app.use(express.static(__dirname + '/public'));

// 这句话是为了不用每个调用文件都写.ejs
app.set('view engine','ejs');
app.get('/',function(req,res){
    
    // 如果需要在res.send里面写html是非常费力，可以用res.render传html
    // 但动态页面很少需要静态html，因为可以传入动态ejs（JS嵌入文件）
    res.render('home');
    // res.send("<h1>Welcome to the homepage</h1><h2>Blah Blah</h2>")
});

app.get('/fallinlovewith/:thing',function(req,res){
    // 把参数传进ejs用花括号加key:value传参
    var thing=req.params.thing;
    res.render('love',{thingVar:thing});
});


app.get("/posts", function(req, res){
    var posts = [
        {title: "Post 1", author: "Susy"},
        {title: "My adorable pet bunny", author: "Charlie"},
        {title: "Can you believe this pomsky?", author: "Colt"}
    ];
    
    res.render("posts", {posts: posts});
})

app.listen(process.env.PORT,process.env.IP,function(){
    console.log('server is listening!')
})