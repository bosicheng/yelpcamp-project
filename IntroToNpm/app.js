var faker = require('faker');

console.log("================ \n  \nWORKSHOP FAKER!!!!!\n \n================");

for (var i=0;i<10;i++){
    var name=faker.commerce.productName();
    var price=faker.commerce.price();
    console.log(name+' - '+'$'+price);
}