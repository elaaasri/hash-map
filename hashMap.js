class HashMap {
  constructor() {
    this.buckets = [];
    this.buckets.length = 16;
  }
  hash(key) {
    let hashCode = 0;
    for (let i = 0; i < key.length; i++) {
      hashCode = (31 * hashCode + key.charCodeAt(i)) % this.buckets.length;
    }
    // throws error when tryin to access out of bound index:
    if (hashCode < 0 || hashCode >= this.buckets.length) {
      throw Error("Trying to access index out of bound");
    }
    return hashCode;
  }
  set(key, value) {
    const index = this.hash(key);
    if (this.buckets[index]) {
      for (let i = 0; i < this.buckets[index].length; i++) {
        if (this.buckets[index][i][0] === key) {
          this.buckets[index][i][1] = value;
          return;
        }
      }
      this.buckets[index].push([key, value]);
    } else {
      this.buckets[index] = [];
      this.buckets[index].push([key, value]);
    }
  }
}

const hm = new HashMap();
console.log(hm);
console.log(hm.set("tab", "old"));
console.log(hm.set("tab", "new"));
console.log(hm.set("bat", "odd"));
console.log(hm);
