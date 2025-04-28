import LinkedList from "./LL";

export default class Hashmap {
  constructor() {
    this.loadFactor = 0.75;
    this.capacity = 16;
    this.arr = [];
  }

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
    if (bucket < 0 || bucket >= this.capacity) {
      throw new Error("Trying to access index out of bounds");
    }

    return bucket;
  }

  _getKeyFromBucket(key) {
    const bucket = this._findBucket(key);
    const result = this.arr[bucket]._findNode(key);
    return result.node;
  }

  set(key, value) {
    const bucket = this._findBucket(key);

    // If index is undefined
    if (!(this.arr[bucket] instanceof LinkedList)) {
      this.arr[bucket] = new LinkedList(key, value);
    } else if (this.arr[bucket].contains(key)) {
      this.arr[bucket].updateValue(key, value);
    } else {
      this.arr[bucket].append(key, value);
    }
  }

  //This function might be redundant
  get(key) {
    const node = this._getKeyFromBucket(key);
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
    return this.arr[bucket].delNode(key);
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

  clear() {
    this.arr.forEach((bucket) => {
      
    });
  }

  getKeysOrValues(keyOrValue) {
    let arr = [];
    this.arr.forEach((bucket) => {
      if (bucket instanceof LinkedList) {
        let bucketKeys = bucket.readAllNodes(keyOrValue);
        arr.push(...bucketKeys);
      }
    });
    return arr;
  }
  

  keys() {
    return this.getKeysOrValues("key");
  }

  values() {
    return this.getKeysOrValues("value");
  }

  entries() {
    
  }
}
