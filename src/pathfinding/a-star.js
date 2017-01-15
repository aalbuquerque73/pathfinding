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

export default class AStar {
  constructor(board) {
    this.cameFrom = new Map();

    this.distanceCost = EuclideanDistance;

    this.getCostFromBoard = (point) => board.getCost(point);

    this.worldSize = board.width * board.height;
    this.worldWidth = board.width;
    this.worldHeight = board.height;
  }

  find(start, goal) {
    const closeSet = [];
    const openSet = new BinaryHeap((a, b) => {});

    const startNode = new Node(this.worldWidth, null, start);
    const goalNode = new Node(this.worldWidth, null, goal);

    openSet.push(startNode);
    const visitedNodes = [];
		console.log('starting...');
    while (openSet.length > 0) {
			console.log('openset:', openSet);
      const node = openSet.pop();
			console.log('current:', node);
      if (node.value === goalNode.value) {
				console.log('goal reached!');
        const result = [];
        let path = closeSet[closeSet.push(node) - 1];
        do {
          result.push(path);
        } while (path = path.parent);
        return result.reverse();
      }
      closeSet.push(node);
      this.findNeighbours(node)
        .forEach(neighbour => {
					console.log('neighbour:', neighbour);
          if (!visitedNodes[neighbour.value]) {
            neighbour.g = node.g + this.costEstimate(neighbour, node);
            neighbour.f = node.f + this.costEstimate(neighbour, goalNode);
            openSet.push(neighbour);
            visitedNodes[neighbour.value] = true;
						console.log('node not visited, push it to openSet');
          }
        });
    }
    return [];
  }

  findNeighbours(current) {
		const neighbours = [];

		const N = new Node(this.worldWidth, null, { x: current.x, y: current.y - 1});
		const S = new Node(this.worldWidth, null, { x: current.x, y: current.y + 1});
		const W = new Node(this.worldWidth, null, { x: current.x - 1, y: current.y});
		const E = new Node(this.worldWidth, null, { x: current.x + 1, y: current.y});

		[ N, S, E, W ]
			.forEach(point => {
				if (this.canWalk(point)) {
					neighbours.push(point);
				}
			});

		const NW = new Node(this.worldWidth, null, { x: current.x - 1, y: current.y - 1});
		const NE = new Node(this.worldWidth, null, { x: current.x + 1, y: current.y - 1});
		const SW = new Node(this.worldWidth, null, { x: current.x - 1, y: current.y + 1});
		const SE = new Node(this.worldWidth, null, { x: current.x + 1, y: current.y + 1});

		if (this.canWalk(N)) {
			if (this.canWalk(W) && this.canWalk(NW)) {
				neighbours.push(NW);
			}
			if (this.canWalk(E) && this.canWalk(NE)) {
				neighbours.push(NE);
			}
		}
		if (this.canWalk(S)) {
			if (this.canWalk(W) && this.canWalk(SW)) {
				neighbours.push(SW);
			}
			if (this.canWalk(E) && this.canWalk(SE)) {
				neighbours.push(SE);
			}
		}

		console.log('neighbours found:', neighbours);
    return neighbours;
  }

  costEstimate(current, next) {
    return EuclideanDistance(current, next);
  }

  canWalk(current) {
    const cost = this.getCost(current);
		console.log('cost for', current, 'is', cost);
    return cost < 255;
  }

  getCost(current) {
    const cost = this.getCostFromBoard(current);
    if (cost != null) {
      return cost;
    }
    return 255;
  }
}
