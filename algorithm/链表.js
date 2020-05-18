class Node {
  constructor(element) {
    this.element = element;
    this.next = null;
  }
}

class LinkedList {
  current = null;
  root = null;
  length = 0;

  append(element) {
    if (!this.root) {
      this.root = element;
    } else {
      this.current = this.root;
      while(this.current.next) {
        this.current = this.current.next;
      }
      this.current = element;
    }
    this.length++;
  }

  removeAt(position) {
    if (position > -1 && position < this.length) {
      let index = 0;
      let previous;
      if (position === 0) {
        this.root = this.root.next;
      } else {
        while(index < position) {
          this.previous = this.current;
          this.current = this.current.next;
          index++;
        }
        previous.next = this.current.next;
      }
      this.length--;
    }
  }

  insert(position, element) {
    const node = new Node(element);
    let previous, current;
    let index = 0;
    if (position > -1 && position < this.length) {
      if (position === 0) {
        this.previous = this.root;
        this.root = node;
        this.root.next = this.previous;
      } else {
        current = this.root;
        while(index < position) {
          previous = current;
          current = current.next;
          index++;
        }
        node.next = current;
        previous.next = node;
      }
      this.length++;
    }
  }

  indexOf(element) {
    let index = 0;
    this.current = this.root;
    while(index < this.length) {
      if (this.current.element === element) {
        return index;
      }
      this.current = this.current.next;
      index++;
    }
    return -1;
  }

  remove(elemnt) {
    const index = this.indexOf(elemnt);
    this.removeAt(index);
  }

  getRoot() {
    return this.root;
  }
}