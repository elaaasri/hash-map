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
    const index = this.hash(key);
    if (this.buckets[index]) {
      for (let i = 0; i < this.buckets[index].length; i++) {
        if (this.buckets[index][i][0] === key) {
          if (this.buckets[index].length <= 1) {
            this.buckets.splice(index, 1); // bucket size = 1.
          } else {
            this.buckets[index].splice(i, 1); // bucket size > 1.
          }
          this.size--;
          return;
        }
      }
    }
    return false;
  }
}

const hm = new HashMap();
hm.set("tab", "old");
hm.set("tab", "new");
hm.set("bat", "odd");
hm.set("kiwi", "fruit");
hm.set("carrot", "veg");
console.log(hm.get("kiwi"));
console.log(hm.has("kiwi"));
console.log(hm.remove("kiwi"));
console.log(hm);
