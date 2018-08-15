const sum = function(...x) {
    let Num = arguments;
    console.log(Num);
}

sum((1),(2),(3))

const arrayNum = [1,2,3,4,5];
console.log(Math.max(arrayNum))
console.log(Math.max.apply(null,arrayNum));


const sum2 = function(...x) {
    return x.reduce(function(p,c){
        return p + c;
    });
}
console.log(sum2(5,6,7,1));

var str = "Lorem ipsum dolor si";
console.log(...str);



let originalArr = [2, 3];
const preArr = [-2, -1];
const sufArr = [6, 7];
originalArr.unshift(1);
originalArr.push(4);
console.log(originalArr);


const convertFiles = function(filename) {
    const fullnameArr = filename.split('.');
    const fileName = fullnameArr[0];
    const fileExt = fullnameArr[1] && fullnameArr[1] === 'png' ? 'jpg' : 'gif' ;

    console.log(fileName,fileExt);
}

console.log(convertFiles("abde.png"));