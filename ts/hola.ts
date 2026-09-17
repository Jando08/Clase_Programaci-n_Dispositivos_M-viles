// TypeScript infers 'string'
let username = "alice";

// TypeScript infers 'number'
let score = 100;

// TypeScript infers 'boolean[]'
let flags = [true, false, true];

// TypeScript infers return type as 'number'
function add(a: number, b: number) {
  return a + b;
}

// Log the values to see them in the output
console.log(username);
console.log(score);
console.log(flags);
console.log(add(5, 3));


// Object Type Inference Example

// TypeScript infers the shape of the object
const user = {
  name: "Alice",
  age: 30,
  isAdmin: true
};

// TypeScript knows these properties exist
console.log(user.name);   // OK
// console.log(user.email); // Error: Property 'email' does not exist


let u = 456.7;
// u = "string"; // Error: Type 'string' is not assignable to type 'boolean'.

//u.runANonExistentMethod(); // Error: Property 'runANonExistentMethod' does not exist on type 'boolean'.

console.log(Math.round(u)); // Error: Argument of type 'boolean' is not assignable to parameter of type 'number'.



let w: unknown = 1; 
w = "string"; // no error

w = { 
  runANonExistentMethod: () => {
    console.log("I think therefore I am");
  } 
} as { runANonExistentMethod: () => void }

// How can we avoid the error for the code commented out below when we don't know the type? 
// w.runANonExistentMethod(); // Error: Object is of type 'unknown'. 

if(typeof w === 'object' && w !== null) {
  (w as { runANonExistentMethod: Function }).runANonExistentMethod(); 
} 
// Although we have to cast multiple times we can do a check in the if to secure our type and have a safer casting