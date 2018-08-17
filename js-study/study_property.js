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
    return {
        filename,
        fileExt
    }
    console.log(fileName,fileExt);
}

console.log(convertFiles("abde.png"));


const aaaa = {
    a: 0,
    b: 3,
    c: 'c',
    d: 'ff',
    1: 6
}
const key1 = [];
for(const value of Object.values(aaaa)) {
    key1.push(value)
}
console.log(key1)

/**
 * for in, for of 의 차이
 * for in 은 key값에 만 접근 가능
 * 예) const aa = {
 *  a:0,
 *  b:1,
 *  c:3,
 *  d:5
 * }
 * const keyArr = [];
 * for(let key in aa) {
 *  key1.push(key);
 * }
 * key1 // a,b,c,d
 * for in 반복문 : 객체의 모든 열거 가능한 속성에 대해 반복
 * for of 반복문 : [Symbol.iterator] 속성을 가지는 컬렉션 전용
 * 
 */