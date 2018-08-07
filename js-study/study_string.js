var testValue = "This is the Cookbook's test string";
var subValue = "Cookbook";
var iValue = testValue.indexOf(subValue);

console.log(iValue !== -1);


var testValue2 = "This apple is my apple";
var iValue2 = testValue2.indexOf("apple", 10);
console.log(iValue2);


var testValue3 = "This apple is my apple";
var iValue3 = testValue2.lastIndexOf("apple", 17);
console.log(iValue3);


var sentence = "This is one sentence. This is a sentence with a list of items:cherries, oranges, apples, bananas.";
var start = sentence.indexOf(":");
var end = sentence.indexOf(".", start+1);

var list = sentence.substring(start+1, end); 
console.log(list.split(","))
var regExp = /(?:(?<=\().+?(?=\))|(?<=\:).+?(?=\.))/g;
var ggg = sentence.match(regExp);
console.log(ggg);
console.log(typeof ggg);
console.log(typeof sentence);


var kimTxt = 'kimwoosuk';
if(~kimTxt.indexOf("su")) {
    console.log("찾았다");
}
console.log(~kimTxt.indexOf("gg"));
console.log(!~kimTxt.indexOf("gg"));
if(!~kimTxt.indexOf("gg")) {
    console.log('못찾았네')
}
