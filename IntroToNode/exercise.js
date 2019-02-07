function average(arr){
    sum=0;
    for (var i=0;i<arr.length;i++){
        sum+=arr[i]
    }
    console.log(Math.round(sum/arr.length));
}

var scores=[90,98,89,100,100,86,94];
average(scores);