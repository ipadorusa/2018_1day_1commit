const a = [ 1, 5, 10 ]
a.forEach(function (v, i, arr) {
    console.log(v, i, arr, this)
}, [ 10, 11, 12 ])

const b = a.map(function (v, i, arr) {
    return this[0] + v;
}, [10])

const res = a.reduce(function(a,b,c) {
    console.log(a,b,c)
    return a + b;
},20);

const res2 = a.reduce(function(a,b,c) {
    console.log(a,b,c)
    return a + b;
});
console.log(res, res2);


const numA = [1,2,3,4,5,6,7,8,9,10];
let gNum = 0;
for(let i=0;i<numA.length;i++) {
    gNum += numA[i];
}
console.log(gNum);

const gNum2 = numA.reduce((a, b) => a + b);
console.log(gNum2);


const tag2 = function (strs, arg1, arg2) {
    return {strs: strs, args: [arg1, arg2]};
}
var txt1 = 'kim';
var txt2 = 'woosuk';
const re2 = tag2 `어떻게 나올지 ${txt1} 궁금합니다 ${txt2}`;
console.log(re2);

const setDecimalSeperators = function (strs, ...args) {
    return args.reduce(function (p, c, i) {
      return p + strs[i] + (c + '').replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, '$&,')
    }, '') + strs[strs.length - 1]
}
const res4 = setDecimalSeperators `이 사과는 하나에 ${2000}원이고, 총 ${1234567}개를 구입하시면 총 ${2000 * 1234567}원 이에요.`
console.log(res4);
