var express = require('express');
var app = express();

app.get('/speak/pig',function(req,res){
    res.send("The pig says 'Oink'");
})

app.get('/speak/cow',function(req,res){
    res.send("The cow says 'Mow'");
})

app.get('/speak/dog',function(req,res){
    res.send("The dog says 'Woof Woof'");
})

// 坑：res.send()只能用一次！！！然后get函数就结束了
app.get('/repeat/:sound/:num',function(req,res){
    var str=req.params.sound+' ';
    var times=Number(req.params.num);
    var result='';
    for (var i=0;i<times;i++){
        result+=str
    }
    res.send(result);
})

app.get('*',function(req,res){
    res.send("This is an error!");
})

app.listen(process.env.PORT,process.env.IP,function(){
    console.log('server is listening!');
})