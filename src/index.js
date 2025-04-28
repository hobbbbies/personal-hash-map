import HashMap from "./hashmap";

const test = new HashMap();

test.set('apple', 'red');
test.set("banana", "yellow");
test.set("banana", "brown");
console.log(`Size of hashmap: ${test.length()}`);
console.log(test.keys());
console.log(test.values());


