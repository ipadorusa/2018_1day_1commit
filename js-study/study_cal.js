/**
 * 입력된 계산 식의 덧셈, 뺄샘을 수행하는 프로그램
 */
var expression = "500 + 5"
var cursor = 0;
var lastCursorPosition = 0;
var tokens = [];

while(cursor < expression.length) {
  if (expression[cursor] == '+' || expression[cursor] == '-') {
    tokens.push(expression.slice(lastCursorPosition, cursor));
    tokens.push(expression[cursor]);
    
    lastCursorPosition = cursor + 1;
  }
  
  cursor = cursor + 1;
}

tokens.push(expression.slice(lastCursorPosition, cursor));

var index = 0;
var sum = 0;
var operator = '+';

while(index < tokens.length) {
  if (tokens[index] == '+' || tokens[index] == '-') {
    if (operator != '') { 
      if (operator == '+') {
        sum = sum + Number(tokens[index-1]);
      } else {
        sum = sum - Number(tokens[index-1]);
      }
    }

    operator = tokens[index];
  }

  index = index + 1;  
}

if (operator == '+') {
  sum = sum + Number(tokens[index - 1]);
} else {
  sum = sum - Number(tokens[index - 1]);
}

console.log(sum);
