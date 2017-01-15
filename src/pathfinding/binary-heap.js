export default class BinaryHeap extends Array {
	constructor(comp = (a,b) => a > b) {
  	super();
    this._comp = comp;
  }

  _swap(a, b) {
  	const value = this[a];
    this[a] = this[b];
    this[b] = value;
  }

  _bubbleDown(pos) {
  	const left = 2 * pos + 1;
    const right = left + 1;
    let largest = pos;
    if (left < arr.length && this._comp(arr[left], arr[largest])) {
      largest = left;
    }
    if (right < arr.length && this._comp(arr[right], arr[largest])) {
      largest = right;
    }
    if (largest != pos) {
      this._swap(largest, pos);
      this._bubbleDown(largest);
    }
  }

  _bubbleUp(pos) {
  	if (pos <= 0) {
      return;
    }
    const parent = Math.floor((pos - 1) / 2);
    if (this._comp(arr[pos], arr[parent])) {
      this._swap(pos, parent);
      this._bubbleUp(parent);
    }
  }

  pop() {
  	const value = super.shift();
    const last = super.pop();
    super.unshift(last);
    if (this.length > 0) {
      this._bubbleDown(0);
    }
    return value;
  }

  push(value) {
  	super.push(value);
    this._bubbleUp(this.length - 1);
  }
}
