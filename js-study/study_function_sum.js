function sum() {
    var sum = 0;
    for (let i=0;i<arguments.length;i++) {        
        if(arguments[i]) {            
            sum += arguments[i];
        }
    }
    return sum;
}

console.log(sum(12,15));