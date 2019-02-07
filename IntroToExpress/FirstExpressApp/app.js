// express变量包含express所有内容
var express = require('express');
// 把运行出的东西存在app中
var app=express();

// req,res分别存的是请求和返回的所有信息
// 请求'/'域名时返回Hi there！
app.get('/',function(req,res){
    res.send("Hi there!");
})

app.get('/bye',function(req,res){
    res.send("Goodbye!");
})

app.get('/dog',function(req,res){
    res.send("Meow!");
})


// route paramaters
app.get('/r/:aaa',function(req,res){
    console.log(req.params);
    res.send('This is a route params');
})

//route parameters
// 带冒号的都是可以随意更改的
app.get('/r/:aaa/params/:bbb',function(req,res){
    console.log(req);
    res.send('This is complex route params');
})
// 会把下面所有覆盖的地址都掩盖，如果写在'*'写在最上面那么其他所有route都不会生效
// 原因是代码从上到下执行，先看到*就直接send了，不会看下面的route
app.get('*',function(req,res){
    res.send('You are a star!')
})

//tell express to listen for requests(start server)
// 由于在C9里运行，process.env.PORT端口是环境变量，代表类似3000的东西
// 这句话是告诉express监听某个端口和IP（已经由C9设置好）
app.listen(process.env.PORT,process.env.IP,function(){
    console.log('server has started!');
});




// route paramaters(params):