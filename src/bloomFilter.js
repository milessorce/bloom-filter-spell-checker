const hash = require('murmurhash').v3;
const data = require('./data/wordList.json');

class BloomFilter {
  static DEFAULT_ERROR_RATE = 0.00001;

  // Determine optimal number of bits in filter
  static getFilterSize (stringCount, errorRate) {
    return Math.ceil((stringCount * Math.log(errorRate)) / Math.log(1 / (Math.pow(2, Math.log(2))))); 
  }

  // Determine optimal number of hash functions to use
  static getHashFunctionCount (bitsInFilter, stringCount) {
    return Math.ceil((bitsInFilter / stringCount) * Math.log(2));
  }

  constructor(strings, errorRate = BloomFilter.DEFAULT_ERROR_RATE) {
    this.buffer = new Int32Array(BloomFilter.getFilterSize(strings.length, errorRate));
    this.hashFunctionCount = BloomFilter.getHashFunctionCount(this.size, strings.length);
    this.seeds = Array(this.hashFunctionCount).fill(null).map(el => Math.random() * this.size);
    strings.forEach(str => this.add(str));
  }

  get size () {
    return this.buffer.length;
  }

  has (str) {
    return this.getIndicesForString(str).every(index => this.buffer[ index ] === 1);
  }

  add (str) {
    this.getIndicesForString(str).forEach(index => {
      this.buffer[ index ] = 1;
    });
  }

  getIndicesForString (str) {
    return this.seeds.map(seed => hash(str, seed) % this.buffer.length);
  }
}

export const bloomFilter = new BloomFilter(data);
