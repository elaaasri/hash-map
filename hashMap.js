class HashMap {
  constructor() {
    this.buckets = [];
    this.buckets.length = 16;
    this.size = 0;
  }
  // generates hash code :
  hash(key) {
    let hashCode = 0;
    for (let i = 0; i < key.length; i++) {
      hashCode = (31 * hashCode + key.charCodeAt(i)) % this.buckets.length;
    }
    // throws error when tryin to access out of bound index:
    // if (hashCode < 0 || hashCode >= this.buckets.length) {
    //   throw Error("Trying to access index out of bound");
    // }
    return hashCode;
  }
  // sets key/value pairs :
  set(key, value) {
    const index = this.hash(key);
    if (this.buckets[index]) {
      for (let i = 0; i < this.buckets[index].length; i++) {
        if (this.buckets[index][i][0] === key) {
          this.buckets[index][i][1] = value;
          return; // stops execution
        }
      }
      this.buckets[index].push([key, value]);
    } else {
      this.buckets[index] = [];
      this.buckets[index].push([key, value]);
    }
    this.size++;
    this.growBuckets();
  }
  // grows buckets length when it's capacity reaches 75% :
  growBuckets() {
    let totalCapacity = this.buckets.length;
    let loadFactor = 75;
    let currentBucketNumber = (this.size / totalCapacity) * 100;
    if (currentBucketNumber >= loadFactor) {
      this.buckets.length *= 2;
    }
  }
  // returns the value of it's key :
  get(key) {
    const index = this.hash(key);
    if (this.buckets[index]) {
      for (let i = 0; i < this.buckets[index].length; i++) {
        if (this.buckets[index][i][0] === key) {
          return this.buckets[index][i][1];
        }
      }
    }
    return null;
  }
}

const hm = new HashMap();
console.log(hm);
console.log(hm.set("tab", "old"));
console.log(hm.set("tab", "new"));
console.log(hm.set("bat", "odd"));
console.log(hm.set("a", "odd"));
// console.log(hm.set("b", "odd"));
// console.log(hm.set("b", "odd"));
// console.log(hm.set("d", "odd"));
// console.log(hm.set("e", "odd"));
// console.log(hm.set("f", "odd"));
// console.log(hm.set("g", "odd"));
// console.log(hm.set("h", "odd"));
// console.log(hm.set("i", "odd"));
// console.log(hm.set("j", "odd"));
// console.log(hm.set("k", "odd"));
console.log(hm.get("bat"));
console.log(hm);
