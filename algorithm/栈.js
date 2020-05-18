// 栈： 先⼊后出

class Stack {
  constructor() {
    this.items = [];
  }

  push(item) {
    this.items.push(item);
  }

  pop() {
    return this.items.pop();
  }

  size() {
    return this.items.length;
  }

  clear() {
    this.items = [];
  }
}