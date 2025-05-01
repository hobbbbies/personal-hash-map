import LinkedList from "./LL";

export default class Hashmap {
  constructor() {
    this._loadFactor = 0.75;
    this._capacity = 16;
    this._arr = new Array(this._capacity);
    this.counter = 0;
  }

  get arr() {
    return this._arr;
  }

  set arr(newArr) {
    this._arr = newArr;
  }

  get capacity() {
    return this._capacity;
  }

  set capacity(val) {
    this._capacity = val;
  }

  get loadFactor() {
    return this._loadFactor;
  }

  set loadFactor(val) {
    this._loadFactor = val;
  }

  // add up each ascii value of key, plus a scaled prime number to account for character order
  _hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode;
  }

  //Finds correct bucket
  _findBucket(key) {
    const hashCode = this._hash(key);
    const bucket = hashCode % this.capacity;

    // Out of bounds error to simulate stricter languages
    if (bucket < 0 || bucket >= this.capacity) {
      throw new Error("Trying to access index out of bounds");
    }

    return bucket;
  }

  // Takes key, finds what bucket its in, then returns the node of the bucket that it belongs to
  _getNodeFromBucket(key) {
    const bucket = this._findBucket(key);
    const result = this.arr[bucket]._findNode(key);
    return result.node;
  }

  // Assings a key value pair to its designated bucket
  // "array" paramter enables it to be used for this.arr, or newArr in the context of the resize() operation
  set(array, key, value) {
    const bucket = this._findBucket(key);

    // Creates new linked list if bucket does not have one yet
    if (!(array[bucket] instanceof LinkedList)) {
      array[bucket] = new LinkedList(key, value);
      this.counter++;

      // Checks if key already exists in bucket
    } else if (array[bucket].contains(key)) {
      array[bucket].updateValue(key, value);
    } else {
      array[bucket].append(key, value);
      this.counter++;
    }

    // Checks after every new pair if a larger array is needed
    if (this.counter > this.capacity * this.loadFactor) {
      this._resize();
    }
  }

  get(key) {
    const node = this._getNodeFromBucket(key);
    return node ? node.value : null;
  }

  has(key) {
    if (!!this.get(key)) {
      return true;
    }
    return false;
  }

  remove(key) {
    const bucket = this._findBucket(key);
    if (bucket) {
      this.counter--;
    }
    return this.arr[bucket].delNode(key);
  }

  clear() {
    this.arr = new Array(this.capacity);
    this.counter = 0;
  }

  length() {
    let size = 0;
    this.arr.forEach((bucket) => {
      if (bucket instanceof LinkedList) {
        size += bucket.size();
      }
    });
    return size;
  }

  // Combines funcitonality of keys and values functions for DRY code
  _getKeysOrValues(keyOrValue) {
    let kvList = [];
    let index = 0;
    this.arr.forEach((bucket) => {
      if (bucket instanceof LinkedList) {
        let bucketKeys = bucket.readNodesOrKeys(keyOrValue);
        kvList.push(...bucketKeys);
      }
    });
    return kvList;
  }

  keys() {
    return this._getKeysOrValues("key");
  }

  values() {
    return this._getKeysOrValues("value");
  }

  entries() {
    return this._getKeysOrValues("");
  }

  // Resizes array to double the original capacity once load capacity is reached
  _resize() {
    const newArr = new Array(this.capacity * 2);
    this.capacity *= 2;
    this.counter = 0;

    this.arr.forEach((bucket) => {
      if (bucket instanceof LinkedList) {

        // put all key value strings into an array for reading 
        const entries = bucket.readAllEntries();
        for (let i in entries) {
          this.set(newArr, entries[i][0], entries[i][1]);
        }
      }
    });
    this.arr = newArr;
  }

  // Uses to string from LL 
  toString() {
    let str = ""
    this.arr.forEach((bucket, index) => {          
      str = str.concat(index + bucket, "\n");
    });
    return str;
  }
}
