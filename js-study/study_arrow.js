const increaseSalary = (a,b) => a*(b / 100) + a;
console.log(increaseSalary(1000,8))

const b = a => a*a;
console.log(b(10));

const d = function(x) {
    return {
        x:x
    }
}
const f = function(a) {
    return function(b) {
        return a + b;
    }
}
/**
 * const d = (x) {
 *  return {
 *      x:x;
 *  }
 * }
 * 
 * const d = x => {x:x}; /// err
 * 
 * const d = x => ({x:x})
 * const d = x => ({x}); x:x shorthand
 * 
 * 
 * const f = a => b => a + b;
 */

 const obj = {
     grades: [80,90,100],
     getTotal: function() {
         this.total = 0;
         this.grades.forEach(function(v){
            this.total += v;
         });
     }
 }

 /* const obj = {
    grades: [80,90,100],
    getTotal: function() {
        this.total = 0;
        this.grades.forEach(function(v){
           this.total += v;
        },this);
    }
} */
/* const obj = {
    grades: [80,90,100],
    getTotal: function() {
        this.total = 0;
        this.grades.forEach((v) => {
           this.total += v;
        });
    }
} */ 

 console.log(obj.getTotal());
 
 