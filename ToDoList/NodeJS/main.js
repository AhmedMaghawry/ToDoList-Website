/* Hello, World! program in node.js */
var person = {
  firstName : "Omar",
  Age : "10"
};
function Add(a,b){
  return a+b;
};
var logFunction = function(){
  console.log("Hello, World!");
};
console.log("Hello, World!");
console.log(person.Age);
console.log(Add(3,5));
logFunction();
setTimeout(logFunction,2000);
