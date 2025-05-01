import HashMap from "./hashmap";

const test = new HashMap();

test.set(test.arr, 'apple', 'red')
test.set(test.arr, 'banana', 'yellow')
test.set(test.arr, 'carrot', 'orange')
test.set(test.arr, "dog", "brown");
test.set(test.arr, "elephant", "gray");
test.set(test.arr, "frog", "green");
test.set(test.arr, "grape", "purple");
test.set(test.arr, "hat", "black");
test.set(test.arr, "ice cream", "white");
test.set(test.arr, "jacket", "blue");
test.set(test.arr, "kite", "pink");
test.set(test.arr, "lion", "golden");
console.log(test.toString());
test.set(test.arr, "moon", "silver");
console.log(test.toString());
