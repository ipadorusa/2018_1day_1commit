const f = function(x,y,z) {
    x = x ? x : 4;
    y = y || 5;
    if(!z) {
        z = 6;
    }
    console.log(x,y,z);
}
f(undefined,0,"0");

function check(a) {
    return a ? 'truthy' : 'falsy';
}
console.log(check(undefined));

const dd = function(x = 4, y= 5, z= 10) {
    console.log(x,y,z)
}
console.log(dd(1,null,10));
