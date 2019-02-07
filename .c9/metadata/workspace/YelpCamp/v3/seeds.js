{"filter":false,"title":"seeds.js","tooltip":"/YelpCamp/v3/seeds.js","undoManager":{"mark":50,"position":50,"stack":[[{"start":{"row":0,"column":0},"end":{"row":63,"column":24},"action":"insert","lines":["var mongoose = require(\"mongoose\");","var Campground = require(\"./models/campground\");","var Comment   = require(\"./models/comment\");"," ","var data = [","    {","        name: \"Cloud's Rest\", ","        image: \"https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg\",","        description: \"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum\"","    },","    {","        name: \"Desert Mesa\", ","        image: \"https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg\",","        description: \"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum\"","    },","    {","        name: \"Canyon Floor\", ","        image: \"https://farm1.staticflickr.com/189/493046463_841a18169e.jpg\",","        description: \"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum\"","    }","]"," ","function seedDB(){","   //Remove all campgrounds","   Campground.remove({}, function(err){","        if(err){","            console.log(err);","        }","        console.log(\"removed campgrounds!\");","        Comment.remove({}, function(err) {","            if(err){","                console.log(err);","            }","            console.log(\"removed comments!\");","             //add a few campgrounds","            data.forEach(function(seed){","                Campground.create(seed, function(err, campground){","                    if(err){","                        console.log(err)","                    } else {","                        console.log(\"added a campground\");","                        //create a comment","                        Comment.create(","                            {","                                text: \"This place is great, but I wish there was internet\",","                                author: \"Homer\"","                            }, function(err, comment){","                                if(err){","                                    console.log(err);","                                } else {","                                    campground.comments.push(comment);","                                    campground.save();","                                    console.log(\"Created new comment\");","                                }","                            });","                    }","                });","            });","        });","    }); ","    //add a few comments","}"," ","module.exports = seedDB;"],"id":1}],[{"start":{"row":34,"column":36},"end":{"row":35,"column":0},"action":"insert","lines":["",""],"id":5},{"start":{"row":35,"column":0},"end":{"row":35,"column":13},"action":"insert","lines":["             "]},{"start":{"row":35,"column":13},"end":{"row":35,"column":14},"action":"insert","lines":["/"]},{"start":{"row":35,"column":14},"end":{"row":35,"column":15},"action":"insert","lines":["/"]},{"start":{"row":35,"column":15},"end":{"row":35,"column":16},"action":"insert","lines":["a"]},{"start":{"row":35,"column":16},"end":{"row":35,"column":17},"action":"insert","lines":["d"]},{"start":{"row":35,"column":17},"end":{"row":35,"column":18},"action":"insert","lines":["d"]}],[{"start":{"row":35,"column":18},"end":{"row":35,"column":19},"action":"insert","lines":[" "],"id":6},{"start":{"row":35,"column":19},"end":{"row":35,"column":20},"action":"insert","lines":["i"]},{"start":{"row":35,"column":20},"end":{"row":35,"column":21},"action":"insert","lines":["n"]}],[{"start":{"row":35,"column":21},"end":{"row":35,"column":22},"action":"insert","lines":[" "],"id":7},{"start":{"row":35,"column":22},"end":{"row":35,"column":23},"action":"insert","lines":["c"]},{"start":{"row":35,"column":23},"end":{"row":35,"column":24},"action":"insert","lines":["a"]},{"start":{"row":35,"column":24},"end":{"row":35,"column":25},"action":"insert","lines":["l"]},{"start":{"row":35,"column":25},"end":{"row":35,"column":26},"action":"insert","lines":["l"]},{"start":{"row":35,"column":26},"end":{"row":35,"column":27},"action":"insert","lines":["b"]},{"start":{"row":35,"column":27},"end":{"row":35,"column":28},"action":"insert","lines":["a"]},{"start":{"row":35,"column":28},"end":{"row":35,"column":29},"action":"insert","lines":["c"]}],[{"start":{"row":35,"column":29},"end":{"row":35,"column":30},"action":"insert","lines":["k"],"id":8}],[{"start":{"row":35,"column":30},"end":{"row":35,"column":31},"action":"insert","lines":[" "],"id":9}],[{"start":{"row":35,"column":30},"end":{"row":35,"column":31},"action":"remove","lines":[" "],"id":10}],[{"start":{"row":35,"column":30},"end":{"row":35,"column":31},"action":"insert","lines":[","],"id":11}],[{"start":{"row":35,"column":31},"end":{"row":35,"column":32},"action":"insert","lines":[" "],"id":12},{"start":{"row":35,"column":32},"end":{"row":35,"column":33},"action":"insert","lines":["g"]},{"start":{"row":35,"column":33},"end":{"row":35,"column":34},"action":"insert","lines":["a"]}],[{"start":{"row":35,"column":33},"end":{"row":35,"column":34},"action":"remove","lines":["a"],"id":13}],[{"start":{"row":35,"column":33},"end":{"row":35,"column":34},"action":"insert","lines":["u"],"id":14},{"start":{"row":35,"column":34},"end":{"row":35,"column":35},"action":"insert","lines":["a"]},{"start":{"row":35,"column":35},"end":{"row":35,"column":36},"action":"insert","lines":["r"]},{"start":{"row":35,"column":36},"end":{"row":35,"column":37},"action":"insert","lines":["a"]},{"start":{"row":35,"column":37},"end":{"row":35,"column":38},"action":"insert","lines":["n"]},{"start":{"row":35,"column":38},"end":{"row":35,"column":39},"action":"insert","lines":["t"]},{"start":{"row":35,"column":39},"end":{"row":35,"column":40},"action":"insert","lines":["e"]},{"start":{"row":35,"column":40},"end":{"row":35,"column":41},"action":"insert","lines":["e"]}],[{"start":{"row":35,"column":41},"end":{"row":35,"column":42},"action":"insert","lines":[" "],"id":15},{"start":{"row":35,"column":42},"end":{"row":35,"column":43},"action":"insert","lines":["t"]},{"start":{"row":35,"column":43},"end":{"row":35,"column":44},"action":"insert","lines":["o"]}],[{"start":{"row":35,"column":44},"end":{"row":35,"column":45},"action":"insert","lines":[" "],"id":16},{"start":{"row":35,"column":45},"end":{"row":35,"column":46},"action":"insert","lines":["h"]},{"start":{"row":35,"column":46},"end":{"row":35,"column":47},"action":"insert","lines":["a"]},{"start":{"row":35,"column":47},"end":{"row":35,"column":48},"action":"insert","lines":["p"]},{"start":{"row":35,"column":48},"end":{"row":35,"column":49},"action":"insert","lines":["p"]},{"start":{"row":35,"column":49},"end":{"row":35,"column":50},"action":"insert","lines":["e"]},{"start":{"row":35,"column":50},"end":{"row":35,"column":51},"action":"insert","lines":["n"]}],[{"start":{"row":35,"column":51},"end":{"row":35,"column":52},"action":"insert","lines":[" "],"id":17},{"start":{"row":35,"column":52},"end":{"row":35,"column":53},"action":"insert","lines":["a"]},{"start":{"row":35,"column":53},"end":{"row":35,"column":54},"action":"insert","lines":["f"]},{"start":{"row":35,"column":54},"end":{"row":35,"column":55},"action":"insert","lines":["t"]},{"start":{"row":35,"column":55},"end":{"row":35,"column":56},"action":"insert","lines":["e"]},{"start":{"row":35,"column":56},"end":{"row":35,"column":57},"action":"insert","lines":["r"]}],[{"start":{"row":35,"column":57},"end":{"row":35,"column":58},"action":"insert","lines":[" "],"id":18},{"start":{"row":35,"column":58},"end":{"row":35,"column":59},"action":"insert","lines":["r"]},{"start":{"row":35,"column":59},"end":{"row":35,"column":60},"action":"insert","lines":["e"]}],[{"start":{"row":35,"column":60},"end":{"row":35,"column":61},"action":"insert","lines":["m"],"id":19},{"start":{"row":35,"column":61},"end":{"row":35,"column":62},"action":"insert","lines":["o"]},{"start":{"row":35,"column":62},"end":{"row":35,"column":63},"action":"insert","lines":["v"]},{"start":{"row":35,"column":63},"end":{"row":35,"column":64},"action":"insert","lines":["e"]}],[{"start":{"row":3,"column":1},"end":{"row":4,"column":0},"action":"insert","lines":["",""],"id":20},{"start":{"row":4,"column":0},"end":{"row":4,"column":1},"action":"insert","lines":[" "]}],[{"start":{"row":4,"column":0},"end":{"row":4,"column":1},"action":"remove","lines":[" "],"id":21}],[{"start":{"row":4,"column":0},"end":{"row":4,"column":1},"action":"insert","lines":["/"],"id":22},{"start":{"row":4,"column":1},"end":{"row":4,"column":2},"action":"insert","lines":["/"]},{"start":{"row":4,"column":2},"end":{"row":4,"column":3},"action":"insert","lines":["s"]},{"start":{"row":4,"column":3},"end":{"row":4,"column":4},"action":"insert","lines":["e"]},{"start":{"row":4,"column":4},"end":{"row":4,"column":5},"action":"insert","lines":["e"]}],[{"start":{"row":4,"column":5},"end":{"row":4,"column":6},"action":"insert","lines":["d"],"id":23}],[{"start":{"row":4,"column":6},"end":{"row":4,"column":7},"action":"insert","lines":[" "],"id":24},{"start":{"row":4,"column":7},"end":{"row":4,"column":8},"action":"insert","lines":["d"]},{"start":{"row":4,"column":8},"end":{"row":4,"column":9},"action":"insert","lines":["a"]},{"start":{"row":4,"column":9},"end":{"row":4,"column":10},"action":"insert","lines":["t"]},{"start":{"row":4,"column":10},"end":{"row":4,"column":11},"action":"insert","lines":["a"]},{"start":{"row":4,"column":11},"end":{"row":4,"column":12},"action":"insert","lines":["，"]}],[{"start":{"row":4,"column":12},"end":{"row":4,"column":14},"action":"insert","lines":["初始"],"id":31}],[{"start":{"row":4,"column":14},"end":{"row":4,"column":15},"action":"insert","lines":["化"],"id":35}],[{"start":{"row":4,"column":15},"end":{"row":4,"column":16},"action":"insert","lines":["的"],"id":38}],[{"start":{"row":4,"column":16},"end":{"row":4,"column":18},"action":"insert","lines":["三个"],"id":44}],[{"start":{"row":4,"column":18},"end":{"row":4,"column":19},"action":"insert","lines":["c"],"id":45},{"start":{"row":4,"column":19},"end":{"row":4,"column":20},"action":"insert","lines":["a"]},{"start":{"row":4,"column":20},"end":{"row":4,"column":21},"action":"insert","lines":["m"]},{"start":{"row":4,"column":21},"end":{"row":4,"column":22},"action":"insert","lines":["p"]},{"start":{"row":4,"column":22},"end":{"row":4,"column":23},"action":"insert","lines":["g"]},{"start":{"row":4,"column":23},"end":{"row":4,"column":24},"action":"insert","lines":["r"]},{"start":{"row":4,"column":24},"end":{"row":4,"column":25},"action":"insert","lines":["o"]},{"start":{"row":4,"column":25},"end":{"row":4,"column":26},"action":"insert","lines":["u"]},{"start":{"row":4,"column":26},"end":{"row":4,"column":27},"action":"insert","lines":["n"]},{"start":{"row":4,"column":27},"end":{"row":4,"column":28},"action":"insert","lines":["d"]}],[{"start":{"row":4,"column":12},"end":{"row":4,"column":14},"action":"insert","lines":["每次"],"id":51}],[{"start":{"row":4,"column":13},"end":{"row":4,"column":14},"action":"remove","lines":["次"],"id":52},{"start":{"row":4,"column":12},"end":{"row":4,"column":13},"action":"remove","lines":["每"]}],[{"start":{"row":4,"column":27},"end":{"row":4,"column":28},"action":"remove","lines":["d"],"id":53},{"start":{"row":4,"column":26},"end":{"row":4,"column":27},"action":"remove","lines":["n"]},{"start":{"row":4,"column":25},"end":{"row":4,"column":26},"action":"remove","lines":["u"]},{"start":{"row":4,"column":24},"end":{"row":4,"column":25},"action":"remove","lines":["o"]},{"start":{"row":4,"column":23},"end":{"row":4,"column":24},"action":"remove","lines":["r"]},{"start":{"row":4,"column":22},"end":{"row":4,"column":23},"action":"remove","lines":["g"]},{"start":{"row":4,"column":21},"end":{"row":4,"column":22},"action":"remove","lines":["p"]},{"start":{"row":4,"column":20},"end":{"row":4,"column":21},"action":"remove","lines":["m"]},{"start":{"row":4,"column":19},"end":{"row":4,"column":20},"action":"remove","lines":["a"]},{"start":{"row":4,"column":18},"end":{"row":4,"column":19},"action":"remove","lines":["c"]},{"start":{"row":4,"column":17},"end":{"row":4,"column":18},"action":"remove","lines":["个"]},{"start":{"row":4,"column":16},"end":{"row":4,"column":17},"action":"remove","lines":["三"]}],[{"start":{"row":4,"column":15},"end":{"row":4,"column":16},"action":"remove","lines":["的"],"id":54},{"start":{"row":4,"column":14},"end":{"row":4,"column":15},"action":"remove","lines":["化"]}],[{"start":{"row":4,"column":14},"end":{"row":4,"column":15},"action":"insert","lines":["化"],"id":58}],[{"start":{"row":4,"column":15},"end":{"row":4,"column":16},"action":"insert","lines":["陀"],"id":65}],[{"start":{"row":4,"column":15},"end":{"row":4,"column":16},"action":"remove","lines":["陀"],"id":66}],[{"start":{"row":4,"column":15},"end":{"row":4,"column":17},"action":"insert","lines":["页面"],"id":73}],[{"start":{"row":36,"column":64},"end":{"row":37,"column":0},"action":"insert","lines":["",""],"id":74},{"start":{"row":37,"column":0},"end":{"row":37,"column":13},"action":"insert","lines":["             "]}],[{"start":{"row":37,"column":13},"end":{"row":37,"column":15},"action":"insert","lines":["如果"],"id":80}],[{"start":{"row":37,"column":15},"end":{"row":37,"column":17},"action":"insert","lines":["下面"],"id":90}],[{"start":{"row":37,"column":17},"end":{"row":37,"column":18},"action":"insert","lines":["的"],"id":93}],[{"start":{"row":37,"column":18},"end":{"row":37,"column":20},"action":"insert","lines":["部分"],"id":99}],[{"start":{"row":37,"column":20},"end":{"row":37,"column":22},"action":"insert","lines":["放在"],"id":107}],[{"start":{"row":37,"column":22},"end":{"row":37,"column":23},"action":"insert","lines":["了"],"id":110}],[{"start":{"row":37,"column":23},"end":{"row":37,"column":25},"action":"insert","lines":["括号"],"id":117}],[{"start":{"row":37,"column":25},"end":{"row":37,"column":27},"action":"insert","lines":["外面"],"id":125}],[{"start":{"row":37,"column":27},"end":{"row":37,"column":31},"action":"insert","lines":["就不一定"],"id":137}],[{"start":{"row":37,"column":31},"end":{"row":37,"column":33},"action":"insert","lines":["运行"],"id":145}],[{"start":{"row":37,"column":33},"end":{"row":37,"column":34},"action":"insert","lines":["，"],"id":146}],[{"start":{"row":37,"column":34},"end":{"row":37,"column":36},"action":"insert","lines":["放在"],"id":154}],[{"start":{"row":37,"column":36},"end":{"row":37,"column":38},"action":"insert","lines":["里面"],"id":161}],[{"start":{"row":37,"column":38},"end":{"row":37,"column":39},"action":"insert","lines":["是"],"id":165}],[{"start":{"row":37,"column":39},"end":{"row":37,"column":40},"action":"insert","lines":["c"],"id":166},{"start":{"row":37,"column":40},"end":{"row":37,"column":41},"action":"insert","lines":["a"]},{"start":{"row":37,"column":41},"end":{"row":37,"column":42},"action":"insert","lines":["l"]},{"start":{"row":37,"column":42},"end":{"row":37,"column":43},"action":"insert","lines":["l"]},{"start":{"row":37,"column":43},"end":{"row":37,"column":44},"action":"insert","lines":["b"]},{"start":{"row":37,"column":44},"end":{"row":37,"column":45},"action":"insert","lines":["a"]},{"start":{"row":37,"column":45},"end":{"row":37,"column":46},"action":"insert","lines":["c"]},{"start":{"row":37,"column":46},"end":{"row":37,"column":47},"action":"insert","lines":["k"]}],[{"start":{"row":37,"column":12},"end":{"row":37,"column":15},"action":"insert","lines":["// "],"id":167}]]},"ace":{"folds":[],"scrolltop":654,"scrollleft":0,"selection":{"start":{"row":51,"column":53},"end":{"row":51,"column":53},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":{"row":39,"state":"start","mode":"ace/mode/javascript"}},"timestamp":1540946955987,"hash":"dafa3324805b2ed1312562f006f17e704975e182"}