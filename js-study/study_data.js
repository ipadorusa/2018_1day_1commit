/**
 * Primitive - String, Number, Null, Undifined, Boolean, Symbol
 * object - Properties, Arrays, function, Dates, WeekMaps, Maps, Sets, Regex
 */

var obj = {
    a:1,
    b:'b'
}
var obj3 = {
    a: [4,5,6]
}
var obj2 = obj
obj2.a = 'b';
obj3.a = 'new'

console.log('obj2', obj2);
obj3
