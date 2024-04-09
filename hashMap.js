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
          return `${key} value is ${this.buckets[index][i][1]}`;
        }
      }
    }
    return null;
  }
  // checks if the buckets has the key :
  has(key) {
    if (this.get(key) != null) return true;
    return false;
  }
  // removes the entry of the given key :
  remove(key) {
    let index = this.hash(key);
    if (this.buckets[index][0][0] === key && this.buckets[index].length === 1) {
      this.buckets[index] = undefined;
      this.size--;
    } else {
      this.buckets[index].map((bucket, i) => {
        if (bucket[0] === key) {
          this.buckets[index].splice(i, 1);
          this.size--;
        }
      });
    }
  }
  // returns total number of buckets :
  length() {
    return `length: ${this.size}`;
  }
  // removes all entries :
  clear() {
    this.buckets.length = 0;
    this.buckets.length = 16;
    this.size = 0;
  }
  // returns an array containing all keys :
  keys(targetIndex = 0) {
    let allBuckets = this.buckets.filter((bucket) => bucket != null);
    let allKeys = [];
    for (let i = 0; i < allBuckets.length; i++) {
      if (allBuckets[i].length <= 1) {
        allKeys.push(allBuckets[i][0][targetIndex]);
      } else {
        allBuckets[i].map((bucket) => allKeys.push(bucket[targetIndex]));
      }
    }
    return allKeys;
  }
  // returns an array containing all values :
  values() {
    return this.keys(1);
  }
  // returns an array containing each key/value pair:
  entries() {
    let allEntries = [];
    let keys = this.keys();
    let values = this.values();
    for (let i = 0; i < this.size; i++) {
      allEntries.push([keys[i], values[i]]);
    }
    return allEntries;
  }
}
// creates an instance :
const hm = new HashMap();
// sets some pairs :
hm.set("tab", "old");
hm.set("tab", "new"); // overwrites the value with the pair that has same key!
hm.set("bat", "odd"); // collision!, adds the pair to the same array like linked list!
hm.set("kiwi", "fruit");
hm.set("carrot", "veg");
// hash map methods :
console.log(hm.get("kiwi"));
console.log(hm.has("kiwi"));
console.log(hm.remove("kiwi"));
console.log(hm.length());
// console.log(hm.clear());
console.log(hm.keys());
console.log(hm.values());
console.log(hm.entries());
console.log(hm);

//  this.buckets = new Proxy(this.buckets, {
//     set: function (target, index, value) {
//       // throws error when tryin to access out of bound index:
//       if (index < 0 || index >= target.length) {
//         throw Error("Trying to access index out of bound");
//       }
//       target[index] = value;
//       return true;
//     },
//   });
