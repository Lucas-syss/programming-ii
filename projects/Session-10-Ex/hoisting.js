// console.log(hoistedVar); // Output: undefined
// const hoistedVar = "I'm hoisted!";

// notHoistedFunc(); // Error: notHoistedFunc is not a function
// var notHoistedFunc = () => console.log("I won't work");

 // Output: "I work!"
fn();
const fn = function hoistedFunc() { console.log("I work!"); }