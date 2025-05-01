import Node from "./Node";

export default class LinkedList {
  constructor(key, value) {
    this.head = new Node(key, value);
  }

  getHead() {
    return this.head;
  }

  setHead(node) {
    this.head = node;
  }

  _findNode(key) {
    let temp = this.getHead();
    let index = 0;
    while (temp !== null) {
      if (temp.key === key) {
        return { node: temp, index: index };
      }
      temp = temp.next;
      index++;
    }
    return { node: null, index: -1 };
  }

  append(key, value) {
    if (!this.getHead()) {
      this.setHead(new Node(key, value));
      return;
    }
    let temp = this.getHead();

    while (temp.next != null) {
      temp = temp.next;
    }
    temp.next = new Node(key, value);
  }

  /* Methods up to toString() were created for seperate linked list project, not specifically made or used here  */
  prepend(value) {
    const temp = new Node(null, value, this.getHead());
    this.head = temp;
  }

  size() {
    let temp = this.getHead();
    let size = 0;
    while (temp != null) {
      size++;
      temp = temp.next;
    }
    return size;
  }

  pop() {
    let temp = this.getHead();

    while (temp.next.next != null) {
      temp = temp.next;
    }
    temp.next = null;
  }

  toString() {
    let temp = this.getHead();
    let str = "";
    while (temp !== null) {
      str = str.concat(" ", `( KEY:${temp.key}, VALUE:${temp.value} ) -> `);
      temp = temp.next;
    }
    str = str.concat("null");
    return str;
  }

  contains(key) {
    const result = this._findNode(key);
    return result.node !== null;
  }

  findIndex(key) {
    const result = this._findNode(key);
    return result.index;
  }

  findValue(key) {
    const result = this._findNode(key);
    return result.node ? result.node.value : null;
  }

  // Used if same key is given twice
  updateValue(key, newVal) {
    const result = this._findNode(key);
    if (result.node) {
      result.node.value = newVal;
    }
  }

  // Deletes node in O(1 + m) time, where m is the size of the bucket (usually 1);
  delNode(key) {
    let temp = this.getHead();

    if (temp.key === key) {
      this.head = temp.next;
      return true;
    }

    while (temp.next != null) {
      if (temp.next.key === key) {
        temp.next = temp.next.next;
        return true;
      }
      temp = temp.next;
    }
    return false;
  }

  // Used to return keys, values, or both if user passes an empty string
  readNodesOrKeys(keyOrValue = "") {
    let temp = this.getHead();
    const arr = [];

    if (keyOrValue === "") {
      return this.readAllEntries();
    } else {
      while (temp != null) {
        arr.push(temp[keyOrValue]);
        temp = temp.next;
      }

      return arr;
    }
  }

  // Method if user wants both keys & values
  readAllEntries() {
    let temp = this.getHead();
    const arr = [];
    while (temp != null) {
      const subArr = [];
      subArr.push(temp.key, temp.value);
      arr.push(subArr);
      temp = temp.next;
    }
    return arr;
  }
}
