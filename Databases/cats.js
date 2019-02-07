var mongoose=require('mongoose');

// 这句话是连接mongodb里的cat_app数据库，找得到就use找不到就自动新建一个
// localhos后面的端口不写会出warning不过也无所谓
mongoose.connect('mongodb://localhost:27017/cat_app', { useNewUrlParser: true });

// 这个指令只是告诉mongose想在mondb中加下面格式的对象, a plan for what cat looks like，其实不规定格式留空白也行
var catSchema=new mongoose.Schema({
    name:String,
    age:Number,
    temperment:String,
})

// 这个类Cat可以使用多个方法，比如find,remove,create
// 是把catSchema compile进一个model
var Cat=mongoose.model("Cat",catSchema);

// 变量名无所谓，不会存到mongodb里,这只是JS端的
var george=new Cat({
    name:"Mrs.Norris",
    age:7,
    temperment:"Evil"
})

// save里面可以没有function，但是function是为了判断有没有成功save用的
george.save(function(err,cat){
    if(err){
        console.log('Something went wrong!')
    } else {
        console.log("We just saved a cat:");
        console.log(cat);
    }
})

Cat.create({
    name:"Snow White",
    age:15,
    temperment:"Bland"
},function(err,cat){
    if(err){
        console.log(err)
    }
    else{
        console.log(cat)
    }
})

// 返回全部cat就选{}
Cat.find({},function(err,cats){
    if(err){
        console.log("Oh no error!");
        console.log(err);
    }
    else{
        console.log("lots of cats");
        console.log(cats);
    }
})



