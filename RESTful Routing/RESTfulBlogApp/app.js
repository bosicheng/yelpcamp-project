var express=require("express");
var app=express();
var bodyParser=require("body-parser");
var mongoose=require("mongoose");
var methodOverride=require('method-override');
var expressSanitizer=require('express-sanitizer');

//APP CONFIG
mongoose.connect('mongodb://localhost:27017/restful_blog_app', { useNewUrlParser: true });
app.set('view engine','ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(expressSanitizer());

//MONGOOSE CONFIG

var blogSchema=new mongoose.Schema({
    title:String,
    image:String,
    body:String,
    // 设置默认样式
    created:{
                type:Date,
                default:Date.now
            }
});

var Blog=mongoose.model("Blog",blogSchema);

//RESTful Routes

app.get('/',function(req,res){
    res.redirect('/blogs');
})

//INDEX
app.get('/blogs',function(req,res){
    Blog.find({},function(err,blogs){
        if(err){
            console.log('ERROR!');
        }
        else{
            res.render('index',{blogs:blogs})
        }
    })
})

//NEW
app.get('/blogs/new',function(req,res){
    res.render('new')
})

//CREATE
app.post('/blogs',function(req,res){
    //create blog
    console.log(req.body);
    // sanitizer会把所有的script标签去掉保留html标签
    req.body.blog.body=req.sanitize(req.body.blog.body);
    console.log(req.body);
    Blog.create(req.body.blog,function(err,newBlog){
        if(err){
            res.render('new')
        }
        else{
            res.redirect('blogs')
        }
    })
    //redirect to the index
})

//SHOW
app.get('/blogs/:id',function(req,res){
    Blog.findById(req.params.id,function(err,foundBlog){
        if(err){
            res.redirect('/blogs');
        }
        else{
            res.render('show',{blog:foundBlog})
        }
    })
})

//EDIT
app.get('/blogs/:id/edit',function(req,res){
    Blog.findById(req.params.id,function(err,foundBlog){
        if(err){
            res.redirect('blogs')
        }
        else{
            res.render('edit',{blog:foundBlog})
        }
    })
})

//UPDATE同时也发生在EDIT GET到的界面里
// 操作是在edit的form表单中写PUT欺骗html是POST但是express会识别并将其改成PUT
//UPDATE
app.put('/blogs/:id',function(req,res){
    req.body.blog.body=req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id,req.body.blog,function(err,updatedBlog){
        if(err){
            res.redirect('/blogs')
        }
        else{
            res.redirect('/blogs/'+req.params.id)
        }
    })
})


//DELETE
app.delete('/blogs/:id',function(req,res){
    //destroy the blog and redirect somewhere
    Blog.findByIdAndRemove(req.params.id,function(err){
        if(err){
            res.redirect('/blogs')
        }
        else{
            res.redirect('/blogs')
        }
    })
})

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Server is listening!");
})
