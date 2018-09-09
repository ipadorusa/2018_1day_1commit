/**
 * dom control
 */
console.group('before');
//var lis = document.getElementsByTagName('li');
var lis = document.querySelectorAll('li');
for(var i = 0; i <lis.length; i++) {
	console.log(lis[i])
}
console.groupEnd();
console.group('start');
lis[1].parentNode.removeChild(lis[1]);
for(var i = 0; i <lis.length; i++) {
	console.log(lis[i])
}
console.groupEnd();
console.log('b',lis)