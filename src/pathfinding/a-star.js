import BinaryHeap from './binary-heap';
import Node from './node';

const abs = Math.abs;
const max = Math.max;
const min = Math.min;
const pow = Math.pow;
const sqrt = Math.sqrt;

const sqrt2 = sqrt(2);

function ManhattanDistance(Point, Goal) {
  // linear movement - no diagonals - just cardinal directions (NSEW)
	return abs(Point.x - Goal.x) + abs(Point.y - Goal.y);
}

function DiagonalDistance(Point, Goal) {
  // diagonal movement - assumes diag dist is 1, same as cardinals
	return max(abs(Point.x - Goal.x), abs(Point.y - Goal.y));
}

function EuclideanDistance(Point, Goal) {
  // diagonals are considered a little farther than cardinal directions
	// diagonal movement using Euclide (AC = sqrt(AB^2 + BC^2))
	// where AB = x2 - x1 and BC = y2 - y1 and AC will be [x3, y3]
	return sqrt(pow(Point.x - Goal.x, 2) + pow(Point.y - Goal.y, 2));
}

function OctileDistance() {
  return max(current.x, current.y) + (sqrt2 - 1) * min(current.x, current.y);
}

function Neighbours(x, y) {
	var	N = y - 1,
	S = y + 1,
	E = x + 1,
	W = x - 1,
	myN = N > -1 && this.canWalk(x, N),
	myS = S < this.worldHeight && this.canWalk(x, S),
	myE = E < this.worldWidth && this.canWalk(E, y),
	myW = W > -1 && this.canWalk(W, y),
	result = [];
	if(myN)
    result.push({x:x, y:N});
	if(myE)
    result.push({x:E, y:y});
	if(myS)
    result.push({x:x, y:S});
	if(myW)
    result.push({x:W, y:y});
	this.findNeighbours(myN, myS, myE, myW, N, S, E, W, result);
	return result;
}

// returns every available North East, South East,
// South West or North West cell - no squeezing through
// "cracks" between two diagonals
function DiagonalNeighbours(myN, myS, myE, myW, N, S, E, W, result) {
	if(myN) {
		if(myE && this.canWalk(E, N))
		  result.push({x:E, y:N});
		if(myW && this.canWalk(W, N))
		  result.push({x:W, y:N});
	}
	if(myS) {
		if(myE && this.canWalk(E, S))
		  result.push({x:E, y:S});
		if(myW && this.canWalk(W, S))
		  result.push({x:W, y:S});
	}
}

// returns every available North East, South East,
// South West or North West cell including the times that
// you would be squeezing through a "crack"
function DiagonalNeighboursFree(myN, myS, myE, myW, N, S, E, W, result) {
	myN = N > -1;
	myS = S < this.worldHeight;
	myE = E < this.worldWidth;
	myW = W > -1;
	if(myE) {
		if(myN && this.this.canWalk(E, N))
		  result.push({x:E, y:N});
		if(myS && this.this.canWalk(E, S))
		  result.push({x:E, y:S});
	}
	if(myW) {
		if(myN && this.this.canWalk(W, N))
      result.push({x:W, y:N});
		if(myS && this.this.canWalk(W, S))
      result.push({x:W, y:S});
	}
}

export default class AStar {
  constructor(board) {
    this.cameFrom = new Map();

    this.distanceCost = EuclideanDistance;

    this.get = (x, y) => board.get(x, y);
    this.worldSize = board.width * board.height;
    this.worldWidth = board.width;
    this.worldHeight = board.height;
  }

  find(start, goal) {
    const closeSet = [];
    const openSet = new BinaryHeap((a, b) => {});

    const startNode = new Node(this.worldSize, null, start);
    const goalNode = new Node(this.worldSize, null, goal);

    openSet.push(startNode);
    const visitedNodes = [];
		console.log('starting...');
    while (openSet.length > 0) {
			console.log('openset:', openSet);
      const node = openSet.pop();
      if (node.value === goalNode.value) {
        const result = [];
        let path = closeSet[closeSet.push(node) - 1];
        do {
          result.push(path);
        } while (path = path.parent);
        return result.reverse();
      }
      closeSet.push(node);
      this.findNeighbours()
        .forEach(neighbour => {
          const current = new Node(node, neighbour);
          if (!visitedNodes[current.value]) {
            current.g = node.g + this.costEstimate(current, node);
            current.f = node.f + this.costEstimate(current);
            openSet.push(current);
            visitedNodes[current.value] = true;
          }
        });
    }
    return [];
  }

  findNeighbours() {
      return [];
  }

  costEstimate(current) {
    return max(current.x, current.y) + (sqrt(2) - 1) * min(current.x, current.y);
  }

  canWalk(current) {
    const cost = this.getCost(current);
    return cost < 255;
  }

  getCost(current) {
    const cell = this.get(current);
    if (cell) {
      return cell.cost;
    }
    return 255;
  }
}
