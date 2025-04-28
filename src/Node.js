export default class Node {
  constructor(key = null, value = null, next = null) {
    this._key = key;
    this._value = value;
    this._next = next;
  }
  get key() {
    return this._key;
  }

  set key(val) {
    this._key = val;
  }

  get value() {
    return this._value;
  }

  set value(val) {
    this._value = val;
  }

  get next() {
    return this._next;
  }

  set next(val) {
    this._next = val;
  }
}
