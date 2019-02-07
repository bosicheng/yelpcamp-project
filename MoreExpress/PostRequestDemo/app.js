var express = require('express');
var app=express();
var bodyParser=require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine','ejs');

// 每次刷新都会回到初始状态，但是以后会把它存在database里
var friends=['aaa','bbb','ccc','ddd','eee'];


app.get('/',function (req,res){
    res.render('home')
})

app.get('/friends',function(req,res){
    // var friends=['aaa','bbb','ccc','ddd','eee'];     要在friends中push，把它改为全局变量
    res.render('friends',{friends:friends})
})

// 每次add data to something就用post route
app.post('/addfriend',function(req,res){
    // 输出req.body需要npm安装body-parser然后在上面require,use
    var newFriend=req.body.newfriend;
    friends.push(newFriend);
    console.log(req.body.newfriend);
    res.send('You have reached the post route!!')
})


app.listen(process.env.PORT,process.env.IP,function(){
    console.log('server has started!!!');
})
