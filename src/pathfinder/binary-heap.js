function swap(data, a, b) {
	const value = data[a];
	data[a] = data[b];
	data[b] = value;
}

function bubbleDown(data, pos, comp = (a,b) => a > b) {
	const left = 2 * pos + 1;
	const right = left + 1;
	let largest = pos;
	if (left < data.length && comp(data[left], data[largest])) {
		largest = left;
	}
	if (right < data.length && comp(data[right], data[largest])) {
		largest = right;
	}
	if (largest != pos) {
		swap(data, largest, pos);
		bubbleDown(data, largest, comp);
	}
}

function bubbleUp(data, pos, comp = (a,b) => a > b) {
	if (pos <= 0) {
		return;
	}
	const parent = Math.floor((pos - 1) / 2);
	if (comp(data[pos], data[parent])) {
		swap(data, pos, parent);
		bubbleUp(data, parent, comp);
	}
}

export default class BinaryHeap {
	constructor(comp = (a,b) => a > b) {
		this.data = [];
    this._comp = comp;
  }

  pop() {
  	const value = this.data.shift();
    const last = this.data.pop();
    if (this.data.length > 0) {
    	this.data.unshift(last);
      bubbleDown(this.data, 0, this._comp);
    }
    return value;
  }

  push(value) {
  	this.data.push(value);
    bubbleUp(this.data, this.data.length - 1, this._comp);
  }

	map(...args) {
		return this.data.map(...args);
	}

	get length() {
		return this.data.length;
	}
}
