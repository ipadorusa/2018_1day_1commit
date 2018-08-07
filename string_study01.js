var a = 'kimwoosuk';
if(~a.indexOf("su")) {
    console.log("찾았다");
}
console.log(~a.indexOf("gg"));
console.log(!~a.indexOf("gg"));
if(!~a.indexOf("gg")) {
    console.log('못찾았네')
}
