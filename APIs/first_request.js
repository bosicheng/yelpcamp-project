// 使用npm request包超简单发送http请求,这个也可以用来向API请求json

var request =require('request');
//make request，这玩意都是发布者写好的
request('https://query.yahooapis.com/v1/public/yql?q=select%20astronomy.sunset%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22maui%2C%20hi%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys',function(error,response,body){
    if(!error && response.statusCode==200){
        console.log(body);
        // 这里不管用body.query还是body["query"]都会返回undefined
        // 因为实际取回来的是json字符串，不是js语言，需要JSON.parse处理
        // 通过JSON.parse可以把json字符串变成js对象
        // 这里写.query和["query"]都是正确的
        var parsedData=JSON.parse(body);
        console.log(parsedData.query);
        console.log(parsedData.query.results.channel.astronomy.sunset)
    }
})