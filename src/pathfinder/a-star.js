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
		this.getCostFromBoard = (point) => board.getCost(point);

		this.world = {
			width: board.world.width,
			height: board.world.height,
			size: board.world.width * board.world.height
		};
	}

	find(start, goal) {
		const openSet = new BinaryHeap((a, b) => a.f < b.f);

		const startNode = new Node(this.world, start);
		const goalNode = new Node(this.world, goal);

		openSet.push(startNode);
		const visitedNodes = [];
		console.log('starting...');
		while (openSet.length > 0) {
			const node = openSet.pop();
			if (node.value === goalNode.value) {
				console.log('goal reached!');
				const result = [];
				let path = node;
				do {
					result.push(path);
				} while (path = path.parent);

				return result.reverse();
			}
			this.findNeighbours(node)
				.forEach(neighbour => {
					const g = node.g + this.costEstimate(neighbour, node);
					if (!visitedNodes[neighbour.value]) {
						neighbour.g = g;
						neighbour.h = node.h + this.costEstimate(neighbour, goalNode, true);
						neighbour.parent = node;
						openSet.push(neighbour);
						visitedNodes[neighbour.value] = neighbour;
					} else if (g < neighbour.g) {
						neighbour.g = g;
						neighbour.parent = node;
					}
				});
		}
		console.log('no path to goal...');
		return [ ];
	}

	findNeighbours(current) {
		const neighbours = [];

		const N = new Node(this.world, { x: current.x, y: current.y - 1});
		const S = new Node(this.world, { x: current.x, y: current.y + 1});
		const W = new Node(this.world, { x: current.x - 1, y: current.y});
		const E = new Node(this.world, { x: current.x + 1, y: current.y});

		const NW = new Node(this.world, { x: current.x - 1, y: current.y - 1});
		const NE = new Node(this.world, { x: current.x + 1, y: current.y - 1});
		const SW = new Node(this.world, { x: current.x - 1, y: current.y + 1});
		const SE = new Node(this.world, { x: current.x + 1, y: current.y + 1});

		[ N, S, E, W, NW, NE, SW, SE ]
			.forEach(point => {
				if (this.canWalk(point)) {
					neighbours.push(point);
				}
			});

		return neighbours;
	}

	costEstimate(current, next, skipCost) {
		if (skipCost) {
			return EuclideanDistance(current, next);
		}
		const cost = this.getCostFromBoard(next);
		return cost * EuclideanDistance(current, next);
	}

	canWalk(current) {
		const cost = this.getCost(current);
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
