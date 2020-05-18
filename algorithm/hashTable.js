class HashTable {
  items = {};

  keyToHash(key) {
    let hash = 0;
    for (let i = 0;i < key.length; i++) {
      hash += key.charCodeAt(i);
    }
    return hash % 37;
  }

  put(key, value) {
    key = this.keyToHash(key);
    this.items[key] = value;
  }

  get(key) {
    return this.items[this.keyToHash(key)];
  }

  remove(key) {
    delete (this.items[this.keyToHash(key)]);
  }
}